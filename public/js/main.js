let count = 0;
const keySound = new Audio("keyboard.mp3");

window.onload = () => {
  const inputarea = document.getElementById("inputtext");
  const readText = document.getElementById("readArea");
  inputarea.focus();
  loadText()
  inputarea.addEventListener("keyup", (event) => {
    keySound.playbackRate = 1.2;
    keySound.play();
    if (event.key != "Enter") {
      const readArea = document.getElementById("readArea");
      let text = ``;
      let index;
      for (index = 0; (index < inputarea.value.toString().length && inputarea.value.toString().length <= readArea.innerText.length); index++) {
        if (
          inputarea.value.toString()[index] !=
          readArea.innerText.toString()[index]
        ) {
          text =
            text +
            `<span  style="background-color: brown;">${readArea.innerText.toString()[index]
            }</span>`;
        } else {
          text =
            text +
            `<span  style="color: green;">${readArea.innerText.toString()[index]
            }</span>`;
        }
      }
      text +=
        readArea.innerText
          .toString()
          .substring(index, readArea.innerText.length);
      readArea.innerHTML = text;
      console.log(count);
      if (count >= readArea.innerText.length) {
        event.preventDefault()
      } else if (count == 0) {
        timer();
      }

      count++;
    }
  });
};

//Timer
function timer() {
  const timer = document.getElementById("timer");
  const x = setInterval(() => {
    let str = "Time ";
    const text = timer.innerText.substring(5, 10);
    const min = Number(text.substring(0, text.indexOf(":")));
    const second = Number(text.substring(text.indexOf(":") + 1, 5));
    if (min > 0) {
      if (second == 0) {
        str +=
          ((min - 1).toString().length != 2 ? "0" : "") +
          (min - 1).toString() +
          ":";
        str += "59";
      } else if (second > 0) {
        str = str + (min.toString().length != 2 ? "0" : "") + min + ":";
        str +=
          ((second - 1).toString().length != 2 ? "0" : "") +
          (second - 1).toString();
      }
    } else {
      str +=
        "00:" +
        ((second - 1).toString().length != 2 ? "0" : "") +
        (second - 1).toString();
    }
    timer.innerText = str;
    const inputarea = document.getElementById("inputtext");
    const readText = document.getElementById("readArea");
    if (second <= 10 && min == 0) timer.style.color = "Red";

    if ((second == 1 && min == 0) || (inputarea.value.length >= readText.innerText.length)) {
      clearInterval(x);
      const TaskComplete = new Audio("taskComplete.mp3");
      TaskComplete.play();
      document.getElementById("statsWindow").style.display = "block";
      document.getElementById("Restart").focus();
      document.getElementById("overlay").style.display = "block";
    }
  }, 1000);
};

function loadText() {
  fetch('http://localhost:3000/text')
    .then(response => response.json())
    .then(data => {
      document.getElementById('readArea').innerText = data.readtext;
    })
}
