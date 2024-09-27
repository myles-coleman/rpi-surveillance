const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {

  // record and upload video to s3 bucket
  exec('bash video.sh', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to upload video' });
    }

    // generate URL
    const command = "aws s3 presign s3://rpi-surveillance/video.mp4 --expires-in 3600";
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to generate URL' });
      }
      res.json({ url: stdout.trim() });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});