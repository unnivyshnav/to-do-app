// promise counter function
let completed = 0,
  incomplete = 0;
let count = 0;
function counter(elem) {
  let promise = new Promise((res, rej) => {
    if (elem.checked) {
      count++;
      completed++;
    } else {
      count--;
      completed--;
    }
    res(count);
  });

  promise.then((value) => {
    if (value == 5) {
      $(".popup").css("visibility", "visible");
    }
  });

  incomplete = 200 - completed;

  $(".stat").css("visibility", "visible");

  document.getElementById("status").innerHTML = `<td>${completed}</td>
                            <td>${incomplete}</td>`;
}

// --------

// popup message

$("#popbtn").on("click", () => {
  $(".popup").css("visibility", "hidden");
});

// ------

$(document).ready(() => {
  // ajax get and populate list on todo button

  $(".todo").on("click", () => {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos",
      success: (data) => {
        var list = document.getElementById("list");
        var row = "";
        for (var i = 0; i < data.length; i++) {
          if (data[i].completed == true) {
            row = `<input class="cboxComp" type="checkbox" checked disabled > 
            &emsp;<span class="datalistComp">
              <s style="color: rgb(214, 106, 106)" >
                <small style="color: grey">${data[i].title}
                </small>
              </s>
            </span><br><hr>`;
            completed++;
          } else {
            row = `<input class="cbox" type="checkbox" onchange="counter(this)" > 
            &emsp;<span class="datalist">
                <span style="color: green">${data[i].title}
                </span>
            </span><br><hr>`;
          }

          list.innerHTML += row;
        }
      },
    });
    $("#list").css("visibility", "visible");
  });

  //-------

  // logout button

  $(".logout").on("click", () => {
    window.location.href = "./index.html";
  });

  // -----

  // strike throught function

  function strike() {
    var chbox = Array.from(document.querySelectorAll(".cbox"));
    var dataTitle = Array.from(document.querySelectorAll(".datalist"));

    for (var i = 0; i < chbox.length; i++) {
      if (chbox[i].checked) {
        dataTitle[i].innerHTML = `
                <span class = "strike"><small style = "color: grey" >${dataTitle[i].textContent}
                </small></span>
                `;
      } else {
        dataTitle[
          i
        ].innerHTML = `<span style="color: green">${dataTitle[i].textContent}</span>`;
      }
    }
  }

  // -----

  // strike through event call

  $("#list").on("click", strike);
});

// style = "color: rgb(161, 228, 161)";
