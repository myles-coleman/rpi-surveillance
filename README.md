# rpi-surveillance

A Raspberry Pi-based surveillance system that records video and stores it in an AWS S3 bucket. It uses Kubernetes to manage the applications, Terraform to set up the AWS resources, and Ansible to configure the Raspberry Pi. You can view the recorded footage on a simple web interface built with Svelte.

---

## Project Overview

The goal of this project is to set up a lightweight surveillance system using a Raspberry Pi. The system will:
- Record video using the Raspberry Pi camera.
- Upload the recorded footage to AWS S3.
- Provide a web interface to trigger video recording and view the uploaded footage.
