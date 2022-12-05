console.log("Welcome to Magic Notes App!");
//if user adds a note, add it to local storage

showNotes(); //As the page loads, it shows all the notes.


let addNoteBtn = document.getElementById("addNoteBtn");

addNoteBtn.addEventListener("click", (e)=>{
   
    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addText.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value ="";
    // console.log(myObj);
    // console.log(notesObj);
    showNotes();
})


//function to show elements from Local Storage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach((element, index)=> {
        //console.log("element: ",element);
        html += `
            <div class="noteCard card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index + 1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
            </div>                
        `;
        addTitle.value = "";
    });

    let notesEle = document.getElementById("notes");
    if(notesObj.length != 0 ){
        notesEle.innerHTML = html;
    }else{
        notesEle.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes. `;
    }
}

//function to delete note

function deleteNote(index){
    console.log('Deleting ', index);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes); //converting data from string to JS object, Local Storage only contains string text. 
    }

    notesObj.splice(index, 1); //splice(start index, no. of element to remove)
    localStorage.setItem("notes", JSON.stringify(notesObj)); //Updating local storage
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputvalue = search.value.toLowerCase();
    //console.log("Input event fired", inputvalue);
    let noteCards = document.getElementsByClassName("noteCard");
   
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        //console.log(cardTxt);  
        if(cardTxt.includes(inputvalue)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})

//