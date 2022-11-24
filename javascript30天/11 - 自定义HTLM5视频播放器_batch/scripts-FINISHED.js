/** @format */
// video标签的属性
// src ：视频的属性
// poster：视频封面，没有播放时显示的图片
// preload：预加载
// autoplay：自动播放
// loop：循环播放
// controls：浏览器自带的控制条
// width：视频宽度
// height：视频高度

const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

console.dir(video);
function togglePlay() {
  // paused 暂停或播放(值为Boolean)
  console.log(video.paused);
  // 播放与暂停
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// 控制播放按钮
function updateButton() {
  // paused 暂停或播放(值为Boolean)
  console.log(video.paused);
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.innerHTML = icon;
}
// 快进后退
function skip() {
  // 利用自定义属性
  video.currentTime += parseInt(this.dataset.skip);
  console.log(video.currentTime, this.dataset);
}

// 控制音量与播放速度
function handleRangeUpdate() {
  // 通过名字来区分音量(volume)与速度(playbackRate)
  video[this.name] = this.value;
}

// 进度条显示
function handleProgress() {
  // duration 视频总长度
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  //
}
// 鼠标控制进度条
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // 时间更新

skipButtons.forEach(element => {
  element.addEventListener('click', skip);
});
ranges.forEach(element => {
  element.addEventListener('change', handleRangeUpdate);
});
ranges.forEach(element => {
  element.addEventListener('mousemove', handleRangeUpdate);
});
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
