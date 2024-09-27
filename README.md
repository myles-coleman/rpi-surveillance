# Raspberry Pi Surveillance System

A Raspberry Pi-based surveillance system that records video and stores it in an AWS S3 bucket. It uses Kubernetes to manage the applications, Terraform to set up the AWS resources, and Ansible to configure the Raspberry Pi. You can view the recorded footage on a simple web interface built with Svelte.

---

## Directory Structure

- **client/**: Svelte web interface
- **server/**: Express.js server on Raspberry Pi
- **infrastructure/**: Terraform and Ansible scripts
