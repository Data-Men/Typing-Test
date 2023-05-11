
let count = 0;
let time=0;
window.onload = () => {
  const inputarea = document.getElementById("inputtext");
  const readText = document.getElementById("readArea");

  // readText.innerText=
  inputarea.addEventListener("keyup", (event) => {
    const keySound = new Audio("keyboard.mp3");
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
      text =
        text +
        readArea.innerText
          .toString()
          .substring(index, readArea.innerText.length);
      readArea.innerHTML = text;

      if (count==readArea.innerText.length) {
        console.log(Date.now());
      }else if (count==0 && !['Ctrl','Shift','Alt'].includes(event.key)) {
        // time=Date.now();

        timer();
      }

      count++;

    }
  });
};


//Timer
function  timer() {
  const timer= document.getElementById("timer");
  const x=setInterval(()=>{
let text=timer.innerText;
console.log(text);
timer.innerText=Number(text)-1
if (Number(text)-1< 0) {
  clearInterval(x);
  document.getElementById("timer").innerHTML = "EXPIRED";
}
   },1000)
}