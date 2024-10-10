const { GetObjectCommand, PutObjectCommand, S3Client, S3ServiceException } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { readFile } = require("fs/promises");
const { exec } = require('child_process');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = 3000;

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const config = {
    region: process.env.AWS_REGION,
    credentials,
};

const main = async ({ bucketName, key, filePath }) => {
    const client = new S3Client(config);
    let url = '';

    try {
        //record video
        await new Promise((resolve, reject) => {
            exec('rpicam-vid --framerate 120 --width 1920 --height 1080 -o video.mp4 -t 3s --level 4.2 --denoise cdn_off -n', (error, stderr) => {
                if (error) {
                    console.error(`Error recording video: ${stderr}`);
                    return reject(new Error('Failed to record video'));
                }
                console.log('Video recorded');
                resolve();
            });
        });

        //upload video to bucket
        const videoData = await readFile(filePath);
        const putObjectCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: videoData,
        });
        const response = await client.send(putObjectCommand);
        console.log(`File uploaded: ${response}`);

        //generate signed URL
        const getObjectCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        url = await getSignedUrl(client, getObjectCommand, { expiresIn: 3600 });

        //delete video
        await new Promise((resolve, reject) => {
            exec('rm video.mp4', (error, stderr) => {
                if (error) {
                    console.error(`Error deleting video: ${stderr}`);
                    return reject(new Error('Failed to delete video'));
                }
                console.log('Video deleted');
                resolve();
            });
        });

    } catch (caught) {
        if (caught instanceof S3ServiceException) {
            console.error(`S3 Error: ${caught.message}`);
            throw caught;
        } else {
            console.error(`Error: ${caught.message}`);
            throw new Error('An unexpected error occurred');
        }
    }
    return url;
};

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const url = await main({
            bucketName: "rpi-surveillance",
            key: "video.mp4",
            filePath: "video.mp4"
        });
        res.json({ url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});