// Write your code below:
function handleFormSubmit(event) {
    event.preventDefault(); 
  
    const amount= event.target.amount.value;
    const descpiption= event.target.descpiption.value;
    const category= event.target.category.value;
  
    let userObj={
      amount:amount,
      descpiption:descpiption,
      category:category
    }
    console.log(userObj)
    
  localStorage.setItem(userObj.descpiption,JSON.stringify(userObj))
  
  const parentElem=document.getElementsByTagName("ul")[0]
  const childElem=document.createElement('li')
  const textNode = document.createTextNode(`${userObj.amount} - ${userObj.descpiption} - ${userObj.category}`);
  //childElem.textContent=userObj.name+" - "+userObj.email+" - "+userObj.phone
  childElem.appendChild(textNode)
  parentElem.appendChild(childElem)

  const deleteBtn=document.createElement("input")
  deleteBtn.type="button"
  deleteBtn.value="Delete"
  deleteBtn.onclick=()=>{
    localStorage.removeItem(userObj.descpiption)
    parentElem.removeChild(childElem)
  }
  childElem.appendChild(deleteBtn)

  
  const editBtn=document.createElement("button")
  editBtn.textContent="Edit" 
  editBtn.onclick=()=>{
    document.getElementById("amount").value = userObj.amount;
    document.getElementById("descpiption").value = userObj.descpiption;
    document.getElementById("category").value = userObj.category;
  
    localStorage.removeItem(userObj.descpiption)
    parentElem.removeChild(childElem)
    }
  childElem.appendChild(editBtn)
 
};