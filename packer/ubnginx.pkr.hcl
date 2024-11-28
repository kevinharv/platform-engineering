# Specify the required Packer version
packer {
  required_version = ">= 1.7.0"

  # Declare the Proxmox plugin as a dependency
  required_plugins {
    proxmox = {
      version = ">= 1.2.1"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

# Define the build source
source "proxmox-iso" "ubuntu" {
  proxmox_url  = "https://192.168.1.10:8006/api2/json"
  insecure_skip_tls_verify = true
  username     = "root@pam"
  password     = var.proxmox_password
  node         = "prox1"
  vm_name      = "ubuntu-nginx-template"
  iso_url      = "http://releases.ubuntu.com/22.04/ubuntu-22.04.5-live-server-amd64.iso"
  iso_checksum = "sha256:9bc6028870aef3f74f4e16b900008179e78b130e6b0b9a140635434a46aa98b0"
  iso_storage_pool = "local"

  vm_id = "500"
  unmount_iso = true
  qemu_agent = true

  disks {
    disk_size = "20G"
    format = "raw"
    storage_pool = "local-lvm"
    storage_pool_type = "lvm"
    type = "virtio"
  }


  ssh_username = "root"
  cpu_type = "host"
  memory = 2048

  network_adapters {
    model  = "virtio"
    bridge = "vmbr0"
    firewall = "false"
  }

  boot_command = [
    "<esc><wait>",
    "e<wait>",
    "<down><down><down><end>",
    "<bs><bs><bs><bs><wait>",
    "autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ ---<wait>",
    "<f10><wait>"
  ]
  boot = "c"
  boot_wait = "5s"

  http_directory = "http" 
}

# Define the build step
build {
  sources = ["source.proxmox-iso.ubuntu"]

  provisioner "shell" {
    inline = [
      "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Waiting for cloud-init...'; sleep 1; done",
      "sudo rm /etc/ssh/ssh_host_*",
      "sudo truncate -s 0 /etc/machine-id",
      "sudo apt -y autoremove --purge",
      "sudo apt -y clean",
      "sudo apt -y autoclean",
      "sudo cloud-init clean",
      "sudo rm -f /etc/cloud/cloud.cfg.d/subiquity-disable-cloudinit-networking.cfg",
      "sudo rm -f /etc/netplan/00-installer-config.yaml",
      "sudo sync",
      "sudo apt-get update",
      "sudo apt-get install -y nginx",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx"
    ]
  }

  provisioner "file" {
    source = "files/99-pve.cfg"
    destination = "/tmp/99-pve.cfg"
  }

  provisioner "shell" {
    inline = [ "sudo cp /tmp/99-pve.cfg /etc/cloud/cloud.cfg.d/99-pve.cfg" ]
  }
}

# Define variables
variable "proxmox_password" {
  type      = string
  sensitive = true
}
