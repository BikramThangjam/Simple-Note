
//if user adds a note, add it to local storage



let notesEle = document.getElementById("divNotes");
const addNoteBtn = document.getElementById("addNoteBtn");
const popupBox = document.querySelector(".popup-box"),
// popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
popupTitle = popupBox.querySelector("#popup-titleInput"),
popupDesc = popupBox.querySelector("#popup-textarea"),
updateBtn = popupBox.querySelector(".update-btn");
let isUpdate = false;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
     m = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

let selectedId;

showNotes(); //As the page loads, it shows all the notes.



closeIcon.addEventListener("click", () => {
    isUpdate = false;
    popupTitle.value = "";
    popupDesc.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
    //console.log("close Icon clicked")
});

//function to show elements from Local Storage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesArrOfObj = [];
    }else{
        notesArrOfObj = JSON.parse(notes);
    }
    
    if(notesArrOfObj.length !== 0 ){
        let divTag = "";
        notesArrOfObj.forEach((element, index)=> {
            //console.log("element: ",element);
            currentTitle = element.title;
            currentDesc = element.description;
             divTag += `
                <div class="noteCard card d-flex flex-column" style="width: 18rem;">
                    <div class="card-body position-relative">
                        <h5 class="card-title text-dark cut-title">${currentTitle}</h5>
                        <p class="card-text text-dark cut-text">${element.description}</p>
                        <div class="d-flex gap-3 position-absolute bottom-0">
                        <button class="btn btn-success  " id="${index}" onclick="deleteNote(${index})">Delete Note</button>
                        <button class="btn btn-success  " id="${index}" onclick='updateNote(${index}, "${currentTitle}", "${currentDesc}")'>Update Note</button>
                        </div>
                        
                    </div>
                    <hr class="text-dark mb-0"/>
                    <div class="d-flex justify-content-start p-2">           
                        <span class="fs-6 fw-light fst-italic text-secondary text-nowrap ">${element.day} ${element.month} ${element.date}, ${element.year}</span>                             
                    </div>
                </div>                
            `;
            //notesEle.insertAdjacentHTML("afterbegin", divTag);
        });

        notesEle.innerHTML = divTag

    }else {
        notesEle.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes. `;
    }
}

//function to delete note

function deleteNote(index){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    console.log('Deleting ', index);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesArrOfObj = [];
    }else{
        notesArrOfObj = JSON.parse(notes); //converting data from string to JS object, Local Storage only contains string text. 
    }

    notesArrOfObj.splice(index, 1); //splice(start index, no. of element to remove)
    localStorage.setItem("notes", JSON.stringify(notesArrOfObj)); //Updating local storage
    showNotes();
}

function updateNote(noteId, title, desc) {

    popupTitle.focus();

    //Auto fill the selected note
    popupTitle.value = title;
    popupDesc.value = desc;
    // popupTitle.innerText = "Update a Note";
    // updateBtn.innerText = "Update Note";
    popupBox.classList.add("show");  
    
    
    updateBtn.addEventListener("click", ()=>{
    
        const d = new Date();
        let day = weekday[d.getDay()];
        let month = m[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();
    
        //inserting the edited values in this object
        let currentObj = {
            title: popupTitle.value,
            description: popupDesc.value,
            day: day,
            month: month,
            date: date,
            year: year
        }
    
        let notes = localStorage.getItem("notes");
        if(notes == null){
            notesArrOfObj = [];
        }else{
            notesArrOfObj = JSON.parse(notes); //converting data from string to JS object, Local Storage only contains string text. 
        }
    
        //Updating the notes of selected ID with current object
        notesArrOfObj[noteId] = currentObj;
    
        //Saving the edited notes to local storage
        localStorage.setItem("notes", JSON.stringify(notesArrOfObj));
        popupBox.classList.remove("show"); 

        document.location.reload(); // To reload the current document
        showNotes();

    });
    
}


addNoteBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    //To add the notes created time
    const d = new Date();
    let day = weekday[d.getDay()];
    let month = m[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    let addDescription = document.getElementById("addDescription");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesArrOfObj = [];
    }else{
        notesArrOfObj = JSON.parse(notes);
    }

    let title = addTitle.value;
    let description= addDescription.value;

    if(title || description){
        let currentObj = {
            title: title,
            description: description,
            day: day,
            month: month,
            date: date,
            year: year
        }

        notesArrOfObj.push(currentObj);

        localStorage.setItem("notes", JSON.stringify(notesArrOfObj));
        addDescription.value = "";
        addTitle.value ="";
        // console.log(currentObj);
        // console.log(notesArrOfObj);
        showNotes();
    }
    
})

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputvalue = search.value.toLowerCase();
    //console.log("Input event fired: ", inputvalue);
    let noteCards = document.getElementsByClassName("noteCard");
   
    Array.from(noteCards).forEach(function(element){
        //console.log(element);
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt);
        //console.log(cardTxt);  
        if(cardTxt.includes(inputvalue)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})




//