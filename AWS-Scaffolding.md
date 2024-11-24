# AWS Basic Configuration Steps

*Tracking steps taken in console to re-create in Terraform and Ansible.*

## Basic Networking
- 10.100.0.0/16 contains all AWS
- us-east-2a-public - 10.100.0.0/20
- us-east-2b-public - 10.100.16.0/20
- us-east-2a-private - 10.100.128.0/20
- us-east-2b-private - 10.100.144.0/20

## Planned Steps
1. Create VPC - setup basic IPAM
1. Create firewall rules and security groups for known access patterns
1. Delegate aws.kevharv.com to Route53
1. Create WireGuard VPN EC2, grant public IP, configure DNS
    - Only server with internet accessible SSH
    - Ansible will do most of the configuration

## Executed Steps
1. Create VPC with 10.100.0.0/16 CIDR
    - allow auto-creation of additional resources
    - set name and tags as needed
1. Create security group to allow SSH (TCP 22) from any IPv4/6
1. Create security group to allow WireGuard (UDP 51820) from any IPv4/6
1. Create public hosted zone for `aws.kevharv.com` in Route53
1. Create NS records in Cloudflare for the hosted zone
1. Created EC2 keypair for lab environment
1. Created test EC2 instance to validate configurations