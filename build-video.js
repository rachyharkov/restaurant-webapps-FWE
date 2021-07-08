const path = require('path');
const FFmpeg = require('fluent-ffmpeg');
 
 
const gifa = new FFmpeg({ source: path.resolve(__dirname, 'src/public/images/no-connection.gif') });
const gifb = new FFmpeg({ source: path.resolve(__dirname, 'src/public/images/not-found.gif') });
const gifc = new FFmpeg({ source: path.resolve(__dirname, 'src/public/images/search.gif') });
const gifd = new FFmpeg({ source: path.resolve(__dirname, 'src/public/images/toasteruwu.gif') });
 
gifa.clone().withVideoCodec('libx264').withFps(25).toFormat('mp4').saveToFile(path.resolve(__dirname, 'src/public/images/no-connection.mp4'));
gifa.clone().withFps(25).toFormat('webm').saveToFile(path.resolve(__dirname, 'src/public/images/no-connection.webm'));
gifb.clone().withVideoCodec('libx264').withFps(25).toFormat('mp4').saveToFile(path.resolve(__dirname, 'src/public/images/not-found.mp4'));
gifb.clone().withFps(25).toFormat('webm').saveToFile(path.resolve(__dirname, 'src/public/images/not-found.webm'));
gifc.clone().withVideoCodec('libx264').withFps(25).toFormat('mp4').saveToFile(path.resolve(__dirname, 'src/public/images/search.mp4'));
gifc.clone().withFps(25).toFormat('webm').saveToFile(path.resolve(__dirname, 'src/public/images/search.webm'));
gifd.clone().withVideoCodec('libx264').withFps(25).toFormat('mp4').saveToFile(path.resolve(__dirname, 'src/public/images/toasteruwu.mp4'));
gifd.clone().withFps(25).toFormat('webm').saveToFile(path.resolve(__dirname, 'src/public/images/toasteruwu.webm'));
