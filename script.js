const selectMenu = document.querySelectorAll("select");
const timeBox = document.querySelector(".time");
const alarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
const imgClock = document.querySelector("img");

let alarmTime,
  alarmState = "noset";
const ringtone = new Audio("./files/ringtone.mp3");

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}" >${i}</option>`;

  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}" >${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeBox.innerHTML = `${h} : ${m} : ${s}`;

  if (alarmTime == `${h} : ${m}`) {
    ringtone.play();
    ringtone.loop = true;
    imgClock.classList.add("ring");
  }
}, 1000);

alarmBtn.addEventListener("click", () => {
  alarmTime = `${selectMenu[0].value} : ${selectMenu[1].value}`;

  if (alarmTime.includes("hour") || alarmTime.includes("minutes")) {
    return alert("select correct value for time");
  }
  checkState(alarmState);
});

const checkState = (state) => {
  if (state == "noset") {
    content.classList.add("disable");
    alarmBtn.innerText = "clear Alarm";
    alarmBtn.style.background = "#F44336";
    alarmState = "set";
  } else {
    content.classList.remove("disable");
    alarmBtn.innerText = "set alarm";
    alarmBtn.style.background = "#4a98f7";
    alarmTime = "";
    ringtone.pause();
    alarmState = "noset";
    imgClock.classList.remove("ring");
  }
};
