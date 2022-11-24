/** @format */

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
// 获取摄像权限
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, Audio: true })
    .then(localMediaStream => {
      console.log(localMediaStream);

      //  DEPRECIATION :
      //       The following has been depreceated by major browsers as of Chrome and Firefox.
      //       video.src = window.URL.createObjectURL(localMediaStream);
      //       Please refer to these:
      //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => [console.error(`OH NO!!!`, err)]);
}

// 用画布展示视频图像
function paintToCanvas() {
  // 获取宽高
  const width = video.videoWidth;
  const height = video.videoHeight;
  // 设置canvas 宽高
  canvas.width = width;
  canvas.height = height;
  return setInterval(function name() {
    // 画
    ctx.drawImage(video, 0, 0, width, height);
    // 去掉像素
    let pixels = ctx.getImageData(0, 0, width, height);
    // 和他们混在一起
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    pixels = greenScreen(pixels);
    // 把他们放回去
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

// 拍照
function takePhoto() {
  // 清空音频播放时间 在播放音频
  snap.currentTime = 0;
  snap.play();

  // 将数据从画布中取出
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  // 下载事件 download   下载名称 handsome
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  // insertBefore 插入节点(newnode,node )newnode: 要插入的新节点。node: 指定此节点前插入节点。
  strip.insertBefore(link, strip.firstChild);
}

// 一种调色方式
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

// 一种调色方式
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

// 一种调色方式
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
getVideo();

// 监听视频播放
video.addEventListener('canplay', paintToCanvas);
