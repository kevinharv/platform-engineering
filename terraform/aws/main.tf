# Create VPC
# Create VPC Subnets
# Create EC2
# Register Route53 DNS entry for EC2 public IP

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# =============== Variable Decalartion ===============

variable "aws_access_key" {
  type        = string
  description = "AWS IAM Access Key"
  sensitive   = true
}

variable "aws_secret_key" {
  type        = string
  description = "AWS IAM Secret Key"
  sensitive   = true
}

variable "aws_region" {
  type        = string
  description = "AWS Provisioning Region"
  default     = "us-east-2"
}

variable "power_state" {
  type = string
  description = "Compute Resources Power State"
  default = "running"
}

variable "hosted_zone_name" {
  type = string
  description = "AWS Route53 DNS Hosted Zone Name"
  default = "aws.kevharv.com"
}

data "aws_ami" "amzn-linux-2023-ami" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}


# =============== Provider Setup ===============

provider "aws" {
  region     = "us-east-2"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

# =============== Resource Creation ===============

module "lab_vpc" {
  source               = "./modules/vpc"
  vpc_name             = "kmh-lab-vpc"
  cidr_block           = "10.100.0.0/16"
  public_subnet_cidrs  = ["10.100.1.0/24"]
  private_subnet_cidrs = ["10.100.10.0/24"]
  ssh_allowed_ips      = ["0.0.0.0/0"]
}


# Create AWS VPN Host - Public Access WireGuard Server
resource "aws_instance" "awspnvpn1" {
  instance_type = "t2.micro"
  availability_zone = "us-east-2a"
  ami = data.aws_ami.amzn-linux-2023-ami.id
  key_name = "LabKeypair"

  tags = {
    "Name" = "awspnvpn1.aws.kevharv.com"
  }

  associate_public_ip_address = true
  subnet_id = module.lab_vpc.public_subnet_ids[0]
  vpc_security_group_ids = ["${module.lab_vpc.security_group_id}"]
}

resource "aws_ec2_instance_state" "awspnvpn1_state" {
  instance_id = aws_instance.awspnvpn1.id
  state       = var.power_state
}

# R53 DNS Record
data "aws_route53_zone" "aws_kevharv_com" {
  name         = var.hosted_zone_name
  private_zone = false
}

resource "aws_route53_record" "awspnvpn1_dns" {
  zone_id = data.aws_route53_zone.aws_kevharv_com.id
  name = "awspnvpn1"
  type = "A"
  ttl = 300
  records = [ aws_instance.awspnvpn1.public_ip ]

  depends_on = [ aws_instance.awspnvpn1 ]
}

# To-Do - Allow WireGuard access to public subnet (51820/udp)


# =============== Output Definitions ===============

output "ec2_ip" {
  value = aws_instance.awspnvpn1.public_ip
}

output "vpc_id" {
  value = module.lab_vpc.vpc_id
}

output "public_subnet_ids" {
  value = module.lab_vpc.public_subnet_ids
}

output "security_group_id" {
  value = module.lab_vpc.security_group_id
}