const urlParams = new URLSearchParams(window.location.search); // creating new object that we can use later to get the paramers from the URL

let arrOfMats = [
  [
    [2, 9, 6, 3, 1, 8, 5, 7, 4],
    [5, 8, 4, 9, 7, 2, 6, 1, 3],
    [7, 1, 3, 6, 4, 5, 2, 8, 9],
    [6, 2, 5, 8, 9, 7, 3, 4, 1],
    [9, 3, 1, 4, 2, 6, 8, 5, 7],
    [4, 7, 8, 5, 3, 1, 9, 2, 6],
    [1, 6, 7, 2, 5, 3, 4, 9, 8],
    [8, 5, 9, 7, 6, 4, 1, 3, 2],
    [3, 4, 2, 1, 8, 9, 7, 6, 5],
  ],
  [
    [1, 5, 4, 8, 7, 3, 2, 9, 6],
    [3, 8, 6, 5, 9, 2, 7, 1, 4],
    [7, 2, 9, 6, 4, 1, 8, 3, 5],
    [8, 6, 3, 7, 2, 5, 1, 4, 9],
    [9, 7, 5, 3, 1, 4, 6, 2, 8],
    [4, 1, 2, 9, 6, 8, 3, 5, 7],
    [6, 3, 1, 4, 5, 7, 9, 8, 2],
    [5, 9, 8, 2, 3, 6, 4, 7, 1],
    [2, 4, 7, 1, 8, 9, 5, 6, 3],
  ],
  [
    [7, 3, 6, 4, 5, 2, 9, 8, 1],
    [1, 9, 8, 6, 3, 7, 4, 5, 2],
    [4, 2, 5, 9, 8, 1, 3, 7, 6],
    [3, 6, 4, 5, 2, 8, 1, 9, 7],
    [9, 5, 2, 7, 1, 4, 6, 3, 8],
    [8, 1, 7, 3, 9, 6, 2, 4, 5],
    [2, 8, 9, 1, 7, 3, 5, 6, 4],
    [6, 7, 3, 2, 4, 5, 8, 1, 9],
    [5, 4, 1, 8, 6, 9, 7, 2, 3],
  ],
];

// making function that will choose randomly matrix to the board fron the array of matirx
let randomMat = Math.floor(Math.random() * arrOfMats.length);

function takeRandomMat(arrOfMats) {
  return arrOfMats[randomMat];
}

tempMat = JSON.parse(JSON.stringify(arrOfMats[randomMat])); // using JSON to pass the varaible by value and not by reference

let table = document.getElementById("mytable");

// Choising Board levels
const Levels = {
  EASY: 20,
  MEDIUM: 40,
  HARD: 60,
};
// The function will put empty string in the table's cell acording to the level the user had chosen
function putBlankCells(matrix, hiddenCells = Levels.EASY) {
  if (
    hiddenCells != Levels.EASY &&
    hiddenCells != Levels.MEDIUM &&
    hiddenCells != Levels.HARD
  ) {
    alert("not a valid level");
  }
  // if the while loop is true and there is empyty string it will loop again and give another random number, if not it will put empty string.
  for (let x = 0; x < hiddenCells; x++) {
    do {
      var RandomNum = Math.floor(Math.random() * 9);
      var RandomNum1 = Math.floor(Math.random() * 9);
    } while (matrix[RandomNum][RandomNum1] == "");

    matrix[RandomNum][RandomNum1] = "";
  }
}
// putting  the values of the matrix and creating inputs in the table cells
function getMatValues(table, matrix) {
  // if there is no table in the HTML file we don't want the function to run
  if (!table) {
    return;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let cell = table.rows[i].cells[j];
      let input = document.createElement("input");
      input.type = "number";
      input.style.border = "0";
      input.oninput = function () {
        // adding function that will slice the input value that will be only one
        if (this.value.length > 1) {
          this.value = this.value.slice(0, 1);
        }
      };

      if (matrix[i][j] == "") {
        cell.appendChild(input); // apending inputs
      } else {
        cell.innerHTML = matrix[i][j]; // putting numbers
      }
      // giving borders to make square in the table
      table.rows[2].style.borderBottom = "2px black solid";
      table.rows[5].style.borderBottom = "2px black solid";
      table.rows[i].cells[2].style.borderRight = "2px black solid";
      table.rows[i].cells[5].style.borderRight = "2px black solid";
    }
  }
}

// the function will run after the user cilck of the finish buttom
function checkResults(table) {
  // adding empty matrix that will be all the values of the board with users addings values
  let mat = [[], [], [], [], [], [], [], [], []];
  let counter = 0;
  for (let x = 0; x < arrOfMats[randomMat].length; x++) {
    for (let y = 0; y < arrOfMats[randomMat][x].length; y++) {
      if (
        table.rows[x].cells[y].innerHTML ==
        '<input type="number" style="border: 0px;">'
      ) {
        mat[x][y] = Number(table.rows[x].cells[y].firstChild.value);
      } else {
        mat[x][y] = Number(table.rows[x].cells[y].innerHTML);
      }
      // if the new mat with the users values is equal to the original mat the counter is getting bigger by 1
      if (mat[x][y] == tempMat[x][y]) {
        counter++;
      }
    }
  }
  // if the counters reaches 81, it mean that the board is equal to the original matrix
  if (counter == 81) {
    playAudio();
    document.getElementById("user-alert").innerHTML = "Good Job!!! 😎";
  } else {
    playAudio2();
    document.getElementById("user-alert").innerHTML = "Try Again! 😒";
  }
}

// getting all the inputs in the board
const inputs = document.getElementsByTagName("input");
// making function that clears all the inputs when the user push clear button
function clearFields() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

// function that makes font sizes smaller that user will be able to write notes.
// we want to use add notes and remove notes on the same button so we use toggle between classes

function toggleNotes(event) {
  const btn = event.target;

  if (!btn.classList.contains("selected")) {
    btn.classList.add("selected");
    addNotes(inputs);
  } else {
    btn.classList.remove("selected");
    removeNotes(inputs);
  }
}

// add notes get class that we style in the css file

function addNotes(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length === 0) {
      inputs[i].classList.add("note");
      inputs[i].oninput = function () {
        if (this.value.length > 9) {
          this.value = this.value.slice(0, 9);
        }
      };
    }
  }
}
// remove notes remove the class
function removeNotes(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("note");
    inputs[i].oninput = function () {
      if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
      }
    };
  }
}

// fucntion for the welcome and register page that checks the validation of the inputs

function showError(i_Id, i_innerHTML) {
  document.getElementById(i_Id).innerHTML = i_innerHTML;
  document.getElementById(i_Id).setAttribute("class", "alert alert-danger");
  document.getElementById(i_Id).style.margin = "5px 0px 0px 0px";
  document.getElementById(i_Id).style.padding = "5px";
}

function showValid(i_Id, i_innerHTML) {
  document.getElementById(i_Id).innerHTML = i_innerHTML;
  document.getElementById(i_Id).setAttribute("class", "alert alert-success");
  document.getElementById(i_Id).style.marginTop = "10px";
}
