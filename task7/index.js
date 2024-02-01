// //createElement
// const para=document.createElement('p');

// //createTextNode
// const paraText=document.createTextNode("Total Fruit : 4")

// //appendChild
// para.appendChild(paraText)
// console.log(para)

// const divs=document.getElementsByTagName("div")
// const secondDiv=divs[1]
// secondDiv.appendChild(para)

// //insertBefore
// const divsSecond=divs[1]
// const fruits=document.querySelector('.fruits');
// secondDiv.insertBefore(para,fruits); 


// //setAttribute,className,id
// para.className='fruitcount'
// para.id='fruitTotal'
// para.setAttribute('title','fruittotal')
// console.log(para)


// // DOM relations:
// const ul = document.querySelector('.fruits');
// ul.style.backgroundColor = 'pink';

// // Parent
// ul.parentElement.style.backgroundColor = 'pink';
// ul.parentElement.parentElement.style.backgroundColor = 'pink';

// // Children
// ul.children[0].style.backgroundColor = 'white';
// ul.firstElementChild.style.backgroundColor = 'pink';
// ul.lastElementChild.style.backgroundColor = 'pink';

// // Siblings
// ul.nextElementSibling.style.backgroundColor = 'pink';
// ul.previousElementSibling.style.backgroundColor = 'pink';


// Write your code below:
//createElement
const heading=document.createElement('h3');
//createTextNode
const headingText=document.createTextNode( "Buy high quality organic fruits online")
//appendChild
const divheading=document.getElementsByTagName("div")
const headingDiv=divheading[0]
headingDiv.appendChild(heading)
//change style
heading.style.fontStyle="italic"


//createElement
const para=document.createElement('p');
//createTextNode
const paraText=document.createTextNode("Total Fruit : 4")
//appendChild
const divs=document.getElementsByTagName("div")
const secondDiv=divs[1]
secondDiv.appendChild(para)
//setAttribute,className,id
para.className='fruitcount'
para.id='fruits-total'
para.setAttribute('title','fruits-total')

