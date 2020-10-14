var score = [0, 0, 0, 0];
var key = ["v", "a", "r", "k"];
let vark = [];
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  //   let q1 = document.forms["quizForm"]["a1"].value;
  //   console.log(q1);
  var quizitem = document.forms["quizForm"];

  for (let s of quizitem) {
    if (s.value.includes("a") && s.checked) {
      score[0]++;
    }
    if (s.value.includes("b") && s.checked) {
      score[1]++;
    }
    if (s.value.includes("c") && s.checked) {
      score[2]++;
    }
    if (s.value.includes("d") && s.checked) {
      score[3]++;
    }
  }

  const score2 = [...score];
  const key2 = [...key];

  for (let i = 0; i < score2.length; i++) {
    for (let j = 0; j < score2.length; j++) {
      if (score2[j] < score2[j + 1]) {
        var temp = score2[j];
        var temp2 = key2[j];
        score2[j] = score2[j + 1];
        key2[j] = key2[j + 1];
        score2[j + 1] = temp;
        key2[j + 1] = temp2;
      }
    }
  }
  var sum = score2.reduce(function (a, b) {
    return a + b;
  }, 0);

  let step;
  if (sum > 32) step = 4;
  else if (sum > 27) step = 3;
  else if (sum > 21) step = 2;
  else step = 1;

  if (score2[0] - score2[1] > step) {
    vark.push(key2[0]);
  } else if (score2[1] - score2[2] > step) {
    vark.push(key2[0]);
    vark.push(key2[1]);
  } else if (score2[2] - score2[3] > step) {
    vark.push(key2[0]);
    vark.push(key2[1]);
    vark.push(key2[2]);
  } else {
    vark.push(key2[0]);
    vark.push(key2[1]);
    vark.push(key2[2]);
    vark.push(key2[3]);
  }
  var results = document.getElementById("result");
  // results.innerHTML = `a:${score[0]}, b:${score[1]}, c:${score[2]} ,d:${score[3]} vark:${vark}`;
  results.innerHTML = "<h5>You are :</h5>";
  // $("#main").load("visual.html ");
  // $("#main").loadmore
  document.getElementById("main").innerHTML = "";
  var defArr = [];
  jQuery.ajaxSetup({ async: false }); //if order matters
  vark.forEach((s, i) => {
    if (s === "v") {
      defArr.push($.get("visual.html", "", (data) => $("#main").append(data)));
      results.innerHTML += "<li> Visual Preferance</li>";
    }
    if (s === "a") {
      defArr.push($.get("aural.html", "", (data) => $("#main").append(data)));
      results.innerHTML += "<li> Aural Preferance</li>";
    }
    if (s === "r") {
      defArr.push($.get("read.html", "", (data) => $("#main").append(data)));
      results.innerHTML += "<li> Read/Write Preferance</li>";
    }
    if (s === "k") {
      defArr.push(
        $.get("kinesthetic.html", "", (data) => $("#main").append(data))
      );
      results.innerHTML += "<li> Kinesthetic Preferance</li>";
    }
  });
  console.log(defArr.length);
  if (defArr.length > 1) {
    defArr.push($.get("multi.html", "", (data) => $("#main").append(data)));
    results.innerHTML += "<li> Multimodal Preferance</li>";
  }

  jQuery.ajaxSetup({ async: true });

  vark = [];
  score = [0, 0, 0, 0];
});

let soal = document.getElementById("soal");
soal.innerHTML = quiz.map((s, i) => {
  return `
    <div id="soal-item${
      i + 1
    }" class="collection-item   lighten-5 z-depth-1 black-text">
      <h8>${i + 1 + ") " + s["soal"]}</h8>
      <p>
        <label >
          <input name= "quiz${i + 1}" type="checkbox" value= "a${i + 1}" />
          <span>a. ${s["a"]}</span>
        </label>
      </p>
      <p>
        <label>
          <input name= "quiz${i + 1}" type="checkbox" value= "b${i + 1}"/>
          <span>b. ${s["b"]}</span>
        </label>
      </p>
      <p>
        <label>
          <input name= "quiz${i + 1}" type="checkbox" value= "c${i + 1}"/>
          <span>b. ${s["c"]}</span>
        </label>
      </p>
      <p>
        <label>
          <input name= "quiz${i + 1}" type="checkbox" value= "d${i + 1}"/>
          <span>b. ${s["d"]}</span>
        </label>
      </p>
    </div>
    `;
});

function allTrue(nodeList) {
  let go = true;
  for (var i = 0; i < nodeList.length; i++) {
    go = go && nodeList[i];
  }
  return go;
}
let check = [];
quiz.forEach((element, index) => {
  check[index] = false;
});

let checked;
quiz.map((s, i) => {
  document
    .getElementById(`soal-item${i + 1}`)
    .addEventListener("change", (e) => {
      checked = false;
      for (let j = 0; j < 4; j++) {
        checked =
          checked || document.getElementsByName(`quiz${i + 1}`)[j].checked;
        check[i] = checked;
      }
      document.getElementById("submit").disabled = !allTrue(check);
    });
});
