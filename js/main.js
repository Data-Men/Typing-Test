let count = 0;
// const reader=new FileReader();
// reader.onload=()=>{
//   const text=reader.result;
// }
// console.log( reader.readAsText("./../public/paragraph1.txt"));
window.onload = () => {
  const inputarea = document.getElementById("inputtext");
  const readText = document.getElementById("readArea");
  inputarea.focus();
  
  inputarea.addEventListener("keyup", (event) => {
    const keySound = new Audio("/./../public/keyboard.mp3");
    keySound.playbackRate = 1.1;
    keySound.play();
    if (event.key != "Enter") {
      const readArea = document.getElementById("readArea");
      let text = ``;
      let index;
      for (index = 0; index < inputarea.value.toString().length; index++) {
        if (
          inputarea.value.toString()[index] !=
          readArea.innerText.toString()[index]
        ) {
          text =
            text +
            `<span  style="background-color: brown;">${
              readArea.innerText.toString()[index]
            }</span>`;
        } else {
          text =
            text +
            `<span  style="color: green;">${
              readArea.innerText.toString()[index]
            }</span>`;
        }
      }
      text +=
        readArea.innerText
          .toString()
          .substring(index, readArea.innerText.length);
      readArea.innerHTML = text;

      if (count == readArea.innerText.length) {
        console.log(Date.now());
      } else if (count == 0 && !["Ctrl", "Shift", "Alt"].includes(event.key)) {
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
    console.log(timer.innerText);
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
    if (second <= 10 && min == 0) timer.style.color = "Red";

    if (second == 1 && min == 0) {
      clearInterval(x);
      const TaskComplete = new Audio("./../public/correct-choice.mp3");
      TaskComplete.play();
      document.getElementById("statsWindow").style.display = "block";
      document.getElementById("Restart").focus();
      document.getElementById("overlay").style.display = "block";
    }
  }, 1000);
}
