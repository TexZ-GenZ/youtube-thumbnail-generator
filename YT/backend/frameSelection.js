// frameSelection.js

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

ffmpeg.setFfmpegPath('C:\\ffmpeg\\ffmpeg.exe');
ffmpeg.setFfprobePath('C:\\ffmpeg\\ffprobe.exe');

async function analyzeFrameBrightnessContrast(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(err);
      }

      let brightness = 0;
      let contrast = 0;

      try {
        const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
        brightness = videoStream.avg_frame_rate;
        contrast = Math.abs(videoStream.avg_frame_rate - videoStream.bit_rate);

        resolve({ brightness, contrast });
      } catch (error) {
        console.error("Error calculating brightness/contrast:", error);
        reject(error);
      }
    });
  });
}

async function sendVideoAndGetBestFrames(videoPath) {
  const formData = new FormData();
  formData.append('video', fs.createReadStream(videoPath));

  try {
    const response = await axios.post('http://localhost:5000/process_video', formData, {
      headers: formData.getHeaders(),
    });
    console.log('Received timestamps:', response.data.best_frame_timestamps);
    return response.data.best_frame_timestamps;
  } catch (error) {
    console.error('Error sending video to backend:', error);
    throw error;
  }
}

async function selectDiverseFrames(videoPath, timestamps) {
  const frames = [];

  for (let i = 0; i < timestamps.length; i++) {
    const timestamp = timestamps[i];
    const outputImagePath = path.join(__dirname, 'uploads', `frame-${Date.now()}-${i}.jpg`);

    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .seekInput(timestamp)
        .frames(1)
        .output(outputImagePath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    const { brightness, contrast } = await analyzeFrameBrightnessContrast(outputImagePath);
    frames.push({ path: outputImagePath, brightness, contrast });
  }

  return frames;
}

// Main function to process video batch file, get best frames, and analyze them
async function processVideo(videoPath) {
  try {
    const bestTimestamps = await sendVideoAndGetBestFrames(videoPath);
    const analyzedFrames = await selectDiverseFrames(videoPath, bestTimestamps);
    return analyzedFrames;
  } catch (error) {
    console.error('Error processing video:', error);
  }
}

module.exports = { processVideo, selectDiverseFrames };
