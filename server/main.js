const { GetObjectCommand, PutObjectCommand, S3Client, S3ServiceException } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { readFile } = require("fs/promises");
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
}

const main = async ({ bucketName, key, filePath }) => {
    const client = new S3Client(config);
    let url = '';
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: await readFile(filePath),
    });

    try {
        //record video
        exec('rpicam-vid --framerate 120 --width 1920 --height 1080 -o video.mp4 -t 3s --level 4.2 --denoise cdn_off -n', (error) => {
            if (error) {
            return res.status(500).json({ error: 'Failed to upload video' });
            }
            console.log('Video recorded');
        });

        //upload video to bucket
        const response = await client.send(putObjectCommand);
        console.log(`file uploaded: ${response}`);

        //generate url
        const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
        });
        url = await getSignedUrl(client, getObjectCommand, { expiresIn: 3600 });

        //delete video
        exec('rm video.mp4', (error) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to delete video' });
        }
        console.log('Video deleted');
    });

    } catch (caught) {
        if (caught instanceof S3ServiceException) {
            throw caught;
        }
    }
    return url;
};

app.use(cors());

app.get('/', (res) => {
    const url = main({ bucketName: "rpi-surveillance", key: "video.mp4", filePath: "video.mp4" });
    res.json({ url });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});