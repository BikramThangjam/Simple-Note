
//if user adds a note, add it to local storage

showNotes(); //As the page loads, it shows all the notes.


let addNoteBtn = document.getElementById("addNoteBtn");

addNoteBtn.addEventListener("click", (e)=>{
    //To add the notes created time
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const m = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    const d = new Date();
    let day = weekday[d.getDay()];
    let month = m[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesArrOfObj = [];
    }else{
        notesArrOfObj = JSON.parse(notes);
    }

    let currentObj = {
        title: addTitle.value,
        text: addText.value,
        day: day,
        month: month,
        date: date,
        year: year
    }

    notesArrOfObj.push(currentObj);

    localStorage.setItem("notes", JSON.stringify(notesArrOfObj));
    addText.value = "";
    addTitle.value ="";
    // console.log(currentObj);
    // console.log(notesArrOfObj);
    showNotes();
})


//function to show elements from Local Storage
function showNotes(){

    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesArrOfObj = [];
    }else{
        notesArrOfObj = JSON.parse(notes);
    }

    
    let html = "";
    notesArrOfObj.forEach((element, index)=> {
        //console.log("element: ",element);
        html += `
            <div class="noteCard card d-flex flex-column" style="width: 18rem;">
                <div class="card-body position-relative mb-2">
                    <h5 class="card-title text-dark">${index + 1}. ${element.title}</h5>
                    <p class="card-text text-dark cut-text">${element.text}</p>
                    
                    <button class="btn btn-success position-absolute bottom-0 " id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                    
                    
                </div>
                <hr class="text-dark mb-0"/>
                <div class="d-flex justify-content-start p-2">           
                    <span class="fs-6 fw-light fst-italic text-secondary text-nowrap ">${element.day} ${element.month} ${element.date}, ${element.year}</span>                             
                </div>
            </div>                
        `;
        addTitle.value = "";
    });

    let notesEle = document.getElementById("notes");
    if(notesArrOfObj.length != 0 ){
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
        notesArrOfObj = [];
    }else{
        notesArrOfObj = JSON.parse(notes); //converting data from string to JS object, Local Storage only contains string text. 
    }

    notesArrOfObj.splice(index, 1); //splice(start index, no. of element to remove)
    localStorage.setItem("notes", JSON.stringify(notesArrOfObj)); //Updating local storage
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputvalue = search.value.toLowerCase();
    //console.log("Input event fired: ", inputvalue);
    let noteCards = document.getElementsByClassName("noteCard");
   
    Array.from(noteCards).forEach(function(element){
        //console.log(element);
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt);
        //console.log(cardTxt);  
        if(cardTxt.includes(inputvalue)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})

//