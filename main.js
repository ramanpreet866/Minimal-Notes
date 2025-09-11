let getUsrData = [];
let addBtnNewUsr = document.querySelector(".addBtnNewUsr");
let slab = document.querySelector(".slab");
let inputForm = document.querySelector(".inputForm");
let titleInp = document.querySelector(".title");
let noteInp = document.querySelector(".noteSection");
let saveBtn = document.querySelector(".saveBtn");
let newBtnExsUsr = document.querySelector(".newBtnExsUsr");
let dataPanel = document.querySelector(".data");
let data = document.querySelector(".data");
let newUsrPage = document.querySelector(".new-user");
let editingIndex = -1; 

window.addEventListener("load", () => {
  if (localStorage.getItem("usrData").length >= 1) {
    getUsrData = JSON.parse(localStorage.getItem("usrData"));
    newUsrPage.style.display = "none";
    data.style.display = "flex";
    console.log(getUsrData);
    let i = 0;

    while (getUsrData.length > i) {
      let newDisplayBox = document.createElement("div");
      let newTitleBar = document.createElement("div");
      let newTitleHeading = document.createElement("h3");
      let newNoteView = document.createElement("div");
      let newNoteHeading = document.createElement("h3");
      let newFooterSection = document.createElement("div");
      let newRemoveBtn = document.createElement("h4");
      let newLine = document.createElement("div");
      let newEditBtn = document.createElement("h4");

      newDisplayBox.setAttribute("class", "displayBox");
      newTitleBar.setAttribute("class", "titleBar");
      newTitleHeading.innerText = `${getUsrData[i].title}`;
      newNoteView.setAttribute("class", "noteView");
      newNoteHeading.innerText = `${getUsrData[i].note}`;
      newFooterSection.setAttribute("class", "footerSection");
      newRemoveBtn.setAttribute("class", "removeBtn");
      newRemoveBtn.innerText = "Remove";
      newLine.setAttribute("class", "line");
      newEditBtn.setAttribute("class", "editBtn");
      newEditBtn.innerText = "Edit";

      newTitleBar.appendChild(newTitleHeading);
      newNoteView.appendChild(newNoteHeading);
      newFooterSection.appendChild(newRemoveBtn);
      newFooterSection.appendChild(newLine);
      newFooterSection.appendChild(newEditBtn);
      newDisplayBox.appendChild(newTitleBar);
      newDisplayBox.appendChild(newNoteView);
      newDisplayBox.appendChild(newFooterSection);

      dataPanel.insertBefore(newDisplayBox, dataPanel.firstChild);

      (function(index) {
        newRemoveBtn.addEventListener("click", (e) => {
          let confirm = window.confirm("Do you really want to delete this note?");
          if (confirm) {
            data.removeChild(e.target.parentElement.parentElement);
            getUsrData.splice(index, 1);
            localStorage.setItem("usrData", JSON.stringify(getUsrData));
            // location.reload(); 
          }
        });

        newEditBtn.addEventListener("click", () => {
          inputForm.style.display = "flex";
          inputForm.style.zIndex = "1000";
          slab.style.display = "flex";
          slab.style.zIndex = "999";

          titleInp.value = newTitleHeading.innerText;
          noteInp.value = newNoteHeading.innerText;
          
          editingIndex = index;
        });
      })(i);

      i++;
    }
  } else {
    console.log("welcome new user");
  }
});

addBtnNewUsr.addEventListener("click", () => {
  slab.style.display = "block";
  inputForm.style.display = "flex";
  titleInp.value = '';
  noteInp.value = '';
  editingIndex = -1;
});

slab.addEventListener("click", () => {
  inputForm.style.display = "none";
  slab.style.display = "none";
  // Reset editing state
  editingIndex = -1;
});

newBtnExsUsr.addEventListener("click", () => {
  inputForm.style.display = "flex";
  inputForm.style.zIndex = "1000";
  slab.style.display = "flex";
  slab.style.zIndex = "999";
  // Reset input fields and editing state for a new note
  titleInp.value = '';
  noteInp.value = '';
  editingIndex = -1;
});

saveBtn.addEventListener("click", () => {
  if (titleInp.value === '' || noteInp.value === '') {
    alert("please enter valid input");
  } else {
    inputForm.style.display = "none";
    slab.style.display = "none";

    if (editingIndex !== -1) {
      // If editing an existing note
      getUsrData[editingIndex].title = titleInp.value;
      getUsrData[editingIndex].note = noteInp.value;
    } else {
      // If creating a new note
      let newObj = {
        title: titleInp.value,
        note: noteInp.value
      };
      getUsrData.push(newObj);
    }

    localStorage.setItem("usrData", JSON.stringify(getUsrData));
    titleInp.value = '';
    noteInp.value = '';
    editingIndex = -1; 
    location.reload(); 
  }

});

