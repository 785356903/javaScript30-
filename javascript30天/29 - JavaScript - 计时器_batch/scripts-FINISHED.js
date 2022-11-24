/** @format */

// 定义计数器
let countdown;
// 获取元素
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// 定时器方法
function timer(seconds) {
  clearInterval(countdown);
  // 获取当前时间
  const now = Date.now();
  const then = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // 如果 时间结束 清空定时器 结束
    if (secondsLeft < 0) {
      clearInterval(countdown);
    }
    // 未结束 调用 开始时间方法
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// 展示时间
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds >= 10 ? '' : '0'}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

// 结束时间
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(e) {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => {
  button.addEventListener('click', startTimer);
});
// input
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});

// 获取倒计时时间
// 获取现在时间,结束时间
// 展示倒计时时间 结束时间
// 定义计时器 setInterval 执行
// 判断 当前时间与结束时间是否相等
// 是 清空计时器 否 继续计时器
// 注意 每次开启timer时 清空计时器 否则会有多个计时器(很危险)
