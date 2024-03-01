function handleFormSubmit(event) {

    event.preventDefault();
    const noteObj = {
      title: event.target.title.value,
      desc: event.target.desc.value
    };
    axios
      .post(
        "https://crudcrud.com/api/f96c336a956f4ac9991bd4fb02a02179/bookNote",
        noteObj
      )
      .then((response) =>{
        console.log(response)
        displayUserOnScreen(response.data)
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
}
window.addEventListener("DOMContentLoaded",()=>{
axios
    .get("https://crudcrud.com/api/f96c336a956f4ac9991bd4fb02a02179/bookNote")
    .then((response) =>{
    console.log(response)
    for(let i=0;i<response.data.length;i++){
        displayUserOnScreen(response.data[i])
    }
    })
    .catch((error) => console.log(error));
})
  
function displayUserOnScreen(note) {
    const parentNode = document.querySelector("ul");
    parentNode.innerHTML += `<li id=${note._id} class="listNote">
        <span><h1 style="margin-bottom: 0;">${note.title}</h1></span>
        ${note.desc}<br>
        <button onclick="deleteNoteBook('${note._id}')">Delete</button>
        </li>`;

    totalNote()
    showing()
    

}

function showing() {
    const filter = document.getElementById('filter');
    filter.addEventListener('keyup', function(event) {
        const textEntered = event.target.value.toLowerCase();
        const notes = document.getElementsByClassName('listNote');
        let count=0
        for (let i = 0; i < notes.length; i++) {
            const currentTitle = notes[i].querySelector('h1').textContent.toLowerCase();
            
            if (currentTitle.includes(textEntered)) {
                notes[i].style.display = 'flex';
                count++
            } else {
                notes[i].style.display = 'none';
            }
        }
        const showing = document.getElementById("showing")
        showing.innerText=`Showing : ${count}`
    });
    
}


function totalNote(){
    const total = document.getElementById("total")
    axios
        .get("https://crudcrud.com/api/f96c336a956f4ac9991bd4fb02a02179/bookNote")
            .then((response) =>{
                total.innerText=`Total : ${response.data.length}`
            })
            .catch((error) => console.log(error));
}

function deleteNoteBook(id) {
    
    axios
        .delete("https://crudcrud.com/api/f96c336a956f4ac9991bd4fb02a02179/bookNote/" + id)
        .then((res) => removeNoteBookFromScreen(id))
        .catch((err) => console.log(err));
}
  
function removeNoteBookFromScreen(id) {
    totalNote();
    const childNodeDele = document.getElementById(id);
    const filter = document.getElementById('filter');
    const textEntered = filter.value.toLowerCase();
    const notes = document.getElementsByClassName('listNote');
    let count = 0;

    if (childNodeDele) {
        childNodeDele.parentNode.removeChild(childNodeDele);
    }

    for (let i = 0; i < notes.length; i++) {
        const currentTitle = notes[i].querySelector('h1').textContent.toLowerCase();
        
        if (currentTitle.includes(textEntered)) {
            count++;
        }
    }

    const showingElement = document.getElementById("showing");
    showingElement.innerText = `Showing : ${count}`;
}
