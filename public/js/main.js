//Keys which need to block
let count = 0;
const keys = ["Enter", "Shift", "Control", "Alt", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "NumLock", "CapsLock", "Tab",
  "Delete", "Insert", "PrintScreen", "Meta", "Escape", "AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "MediaTrackPrevious", "MediaPlayPause", "MediaTrackNext", "Home", "End", "PageUp", "PageDown"]

loadText() //Load data from server

window.onload = () => {
  const inputarea = document.getElementById("inputtext");
  const readArea = document.getElementById("readArea");
  inputarea.focus();

  inputarea.addEventListener("keyup", (event) => {

    if (!keys.includes(event.key)) {
      //Keyboard sound
      const keySound = new Audio("keyboard.mp3");
      keySound.playbackRate = 1.2;
      keySound.play();

      //html changes
      let text = ``;
      if (event.key != "Backspace") {
        text = readArea.innerHTML.toString().substring(0, (count) * 28);

        if (inputarea.value.toString()[count] != readArea.innerText.toString()[count]) {
          text += `<span  class="Wchar">${readArea.innerText.toString()[count]}</span>`;
        } else {
          text += `<span  class="Rchar">${readArea.innerText.toString()[count]}</span>`;
        }

        text += readArea.innerText.toString().substring(count + 1, readArea.innerText.length);

        readArea.innerHTML = text;

        if (count >= readArea.innerText.length) {
          event.preventDefault()
        } else if (count == 0) {
          timer();
        }
        count++;
      } else {
        if (count > 0) {
          text = readArea.innerHTML.substring(0, 28 * (count - 1));
          text += readArea.innerText[count - 1];
          text += readArea.innerHTML.substring(28 * (count), readArea.innerHTML.length);
          readArea.innerHTML = text;
          count--;
        }
      }
      document.getElementById("completeP").innerText = "Complete:" + ((inputarea.value.length / readArea.innerText.length) * 100).toFixed(0) + "%"
    }
  });

};

//Timer
function timer() {
  const timer = document.getElementById("timer");
  const interval = setInterval(() => {
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
      clearInterval(interval);  //Stop the colck
      const TaskComplete = new Audio("taskComplete.mp3");
      TaskComplete.play();
      document.getElementById("statusWindow").style.display = "block";
      document.getElementById("Restart").focus();
      document.getElementById("overlay").style.display = "block";
      computeStatus()//to show status
    }
  }, 1000);
};

//Data Loading From the Server 
function loadText() {
  fetch('http://localhost:3000/text')
    .then(response => response.json())
    .then(data => {
      document.getElementById('readArea').innerText = data.readtext;
    })
}

//Statics
function computeStatus() {
  const inputarea = document.getElementById("inputtext");
  const readArea = document.getElementById("readArea");
  const totalWords = readArea.innerText.split(" ").length;
  const totalWordsWritten = readArea.innerText.split(" ").length;
  console.log("Speed:",totalWords/totalWordsWritten)
}