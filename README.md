# rpi-surveillance

A Raspberry Pi-based surveillance system that records video, uploads it to an AWS S3 bucket, and allows you to view the footage through a simple web interface. This project uses **Svelte** for the front-end and **Express.js** for the back-end, with AWS S3 for video storage.

---

## Project Overview

The goal of this project is to set up a lightweight surveillance system using a Raspberry Pi. The system will:
- Record video using the Raspberry Pi camera.
- Upload the recorded footage to AWS S3.
- Provide a web interface to trigger video recording and view the uploaded footage.
