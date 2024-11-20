const { GetObjectCommand, PutObjectCommand, S3Client, S3ServiceException } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { readFile } = require("fs/promises");
const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = 3000;

const credentials = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const config = {
	region: process.env.AWS_REGION,
	credentials,
};

const s3Client = new S3Client(config);

// Generate signed URL for S3 object
async function generateSignedUrl(bucketName, key) {
	try {
		const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
		return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
	} catch (error) {
		console.error(`Error generating signed URL: ${error.message}`);
		throw new Error("Failed to generate signed URL");
	}
}

// Record and upload video to S3
async function recordAndUploadVideo(bucketName, key, filePath) {
	await new Promise((resolve, reject) => {
		exec(
			"rpicam-vid --framerate 60 --width 1280 --height 720 -o video.mp4 -t 5s",
			(error) => {
				if (error) {
					return reject(new Error("Failed to record video"));
				}
				console.log("Video recorded");
				resolve();
			}
		);
	});

	const videoData = await readFile(filePath);
	await s3Client.send(
		new PutObjectCommand({ Bucket: bucketName, Key: key, Body: videoData })
	);

	await new Promise((resolve, reject) => {
		exec("rm video.mp4", (error, stderr) => {
			if (error) {
				console.error(`Error deleting video: ${stderr}`);
				return reject(new Error("Failed to delete video"));
			}
			console.log("Video deleted");
			resolve();
		});
	});

	return await generateSignedUrl(bucketName, key);
}

// live stream
app.get('/stream', async (req, res) => {
    try {
        const client = new S3Client(config);
        const command = new GetObjectCommand({
            Bucket: "rpi-stream",
            Key: "video/index-high.m3u8",
        });
        const streamUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
        res.json({ streamUrl });
    } catch (error) {
        console.error('Error generating stream URL:', error);
        res.status(500).json({ error: 'Could not generate stream URL' });
    }
});

// recorded video
app.get("/record", async (req, res) => {
	try {
		const bucketName = "rpi-surveillance";
		const key = "video.mp4";
		const filePath = "video.mp4";

		const url = await recordAndUploadVideo(bucketName, key, filePath);
		res.json({ url });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.use(cors());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
