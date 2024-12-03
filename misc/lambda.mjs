import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: "us-west-2" });

// converts stream to string for endpoint
async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf-8");
}

// function to generate playlist full of signed URLs
export const handler = async () => {
    try {
        const bucketName = "rpi-stream";
        const playlistKey = "video/index-high_1.m3u8";
        const getPlaylistCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: playlistKey,
        });
        const playlistResponse = await s3Client.send(getPlaylistCommand);
        const playlistBody = await streamToString(playlistResponse.Body);

        console.log("Original Playlist Content:", playlistBody);

        const lines = playlistBody.split("\n");
        const updatedLines = await Promise.all(
            lines.map(async (line) => {
                if (line.endsWith(".ts")) {
                    const tsCommand = new GetObjectCommand({
                        Bucket: bucketName,
                        Key: `video/${line}`,
                    });
                    const signedUrl = await getSignedUrl(s3Client, tsCommand, { expiresIn: 3600 });
                    return signedUrl;
                }
                return line;
            })
        );

        const updatedPlaylist = updatedLines.join("\n");

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/vnd.apple.mpegurl" },
            body: updatedPlaylist,
        };
    } catch (error) {
        console.error("Error generating signed playlist:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate signed playlist." }),
        };
    }
};