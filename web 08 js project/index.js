// Write your code below:
function handleFormSubmit(event) {

    event.preventDefault();
    const bookMarks = {
      webTitle: event.target.webTitle.value,
      webLink: event.target.webLink.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/44b3c8f9b77b41e3bc912b79ceb00362/bookMarks",
        bookMarks
      )
      .then((response) =>{
        console.log(response)
        displayUserOnScreen(response.data)
      })
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("webTitle").value = "";
    document.getElementById("webLink").value = "";
  }
  window.addEventListener("DOMContentLoaded",()=>{
    axios
      .get("https://crudcrud.com/api/44b3c8f9b77b41e3bc912b79ceb00362/bookMarks")
      .then((response) =>{
        console.log(response)
        for(let i=0;i<response.data.length;i++){
          displayUserOnScreen(response.data[i])
        }
      })
      .catch((error) => console.log(error));
  })
  
  function displayUserOnScreen(bookMark) {
    const parentNode =document.querySelector("ul");
    parentNode.innerHTML +=`<li id=${bookMark._id}> ${bookMark.webTitle} - <a href="${bookMark.webLink}" target="_blank">${bookMark.webLink}</a>
        <button onclick=deleteBookMarks('${bookMark._id}')>Delete</button>
        <button onclick=editBookMarks('${bookMark.webTitle}','${bookMark.webLink}','${bookMark._id}')>Edit</button>
      </li>`;
  }
  
  function editBookMarks(webTitle, webLink,id) { 
    document.getElementById('webTitle').value = webTitle;
    document.getElementById('webLink').value = webLink; 
  
    deleteBookMarks(id);
  }
  
  function deleteBookMarks(id) {
    axios
      .delete("https://crudcrud.com/api/44b3c8f9b77b41e3bc912b79ceb00362/bookMarks/" + id)
      .then((res) => removeBookmarksFromScreen(id))
      .catch((err) => console.log(err));
  }
  
  function removeBookmarksFromScreen(id) {
    const childNodeDele = document.getElementById(id);
    if (childNodeDele) {
      childNodeDele.parentNode.removeChild(childNodeDele);
    }
  }