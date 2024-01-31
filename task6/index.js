// Write the code as shown in the video below:
const mainHeading=document.querySelector("#main-heading")//for id put "#" befor the id name
mainHeading.style.textAlign="center"

const fruits=document.querySelector(".fruits")//for class put"."befor the id name
fruits.style.backgroundColor="gray"
fruits.style.padding="30px"
fruits.style.margin="30px"
fruits.style.width="50%"
fruits.style.boderRadius="5px"
fruits.style.listStyleType="none"

const basketHeading=document.querySelector("h2")//using tag name
basketHeading.style.margineleft="30px"

const fruitItem=document.querySelector(".fruit")//querySelector can select only the first one
fruitItem.style.color="brown"

const fruitItems=document.querySelector(".fruit:last-child")//last
fruitItems.style.color="red"

const fruitItemss=document.querySelector(".fruit:nth-child(2)")//nth element
fruitItemss.style.color="green"


const basketHeadings=document.querySelector("#basket-heading")//for id put # befor the id name
basketHeadings.style.color="brown"


//Write answer to the questions asked below:
const fruitItemsss=document.querySelectorAll(".fruit")
for(let i=0;i<fruitItemsss.length;i++){
  fruitItemsss[i].style.borderRadius="5px"  
}

const fruitItemssss=document.querySelectorAll(".fruit")
for(let i=0;i<fruitItemsss.length;i++){
  fruitItemssss[i].style.padding="10px"
  fruitItemssss[i].style.margin="10px" 
}


const evenFruitItems=document.querySelectorAll(".fruit:nth-child(even)")
for(let i=0;i<evenFruitItems.length;i++){
  evenFruitItems[i].style.backgroundColor="brown"
  evenFruitItems[i].style.color="white"
}