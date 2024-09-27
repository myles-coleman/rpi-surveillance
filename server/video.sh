#!/bin/bash

rpicam-vid --framerate 120 --width 1920 --height 1080 -o video.mp4 -t 3s --level 4.2 --denoise cdn_off -n

aws s3 cp video.mp4 s3://rpi-surveillance/video.mp4

rm video.mp4