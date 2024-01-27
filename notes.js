const addBox = document.querySelector(".add-box"),
 popupBox = document.querySelector(".popup-box"),
 popupTitle = popupBox.querySelector("header p")
 closeIcon = popupBox.querySelector("header i"),
 titleTag = popupBox.querySelector("input"),
 descTag = popupBox.querySelector("textarea"),
 addBtn = popupBox.querySelector("button");

 const months = ["January", "february", "March", "april", "May", "June", "July",
                  "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false; 
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add  Notes";
    popupTitle.innerText = "Add a new Notes";
  popupBox.classList.remove("show"); 
});
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
     let litag = `<li class="note">
     <div class="details">
         <p>${note.title}</p>
         <span>${note.description}</span>
     </div>
     <div class="bottom-content">
         <span>${note.date}</span>
         <div class="settings ">
             <i onclick="showMenu(this)" class="bi bi-three-dots"></i>
             <ul class="menu">
             <li  onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class="bi bi-pen"></i>Edit</li>
             <li onclick="deleteNote(${index})"><i class="bi bi-trash"></i>Delete</li>
         </ul>
         </div>
     </div>
 </li>`;
     addBox.insertAdjacentHTML("afterend", litag);
    });
} 
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
        elem.parentElement.classList.remove("show");
        }
    });
 }

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
   notes.splice(noteId, 1);
   localStorage.setItem("notes", JSON.stringify(notes)); 
   showNotes();
}


function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Notes";
    popupTitle.innerText = "Update Notes";
    console.log(noteId, title, desc);

}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }
        else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
       
        localStorage.setItem("notes", JSON.stringify(notes)); 
        closeIcon.click();
        showNotes();
    }
});