'use strict';
const inputText=document.querySelector('.js-input');
const searchBtn=document.querySelector('.js-searchBtn');
const resetBtn=document.querySelector('.js-reset');
const ulList=document.querySelector('.js-list');
let ulListFavorites=document.querySelector('.js-favorites-list');


const favoritesList = []


function renderFavoritesList() {
  ulListFavorites.innerHTML = ""

  for(const favoriteElement of favoritesList) {
    
   ulListFavorites.innerHTML += `<li>
   <p>${favoriteElement.firstElementChild.innerHTML}</p>
   <img src="${printImage(favoriteElement.lastElementChild.src)}"/>
   </li>` 
  }
}

function handleClickFavorite(event) {
  if(!favoritesList.includes(event.currentTarget)) {
    favoritesList.push(event.currentTarget)
    addClassFavorite(event.currentTarget)
  }

  console.log(favoritesList)
  renderFavoritesList()
}

function addListenersList(clickedList) {
  for(const listElement of clickedList) {
    listElement.addEventListener('click', handleClickFavorite)
  }
}

function renderDrinks(data){
  ulList.innerHTML = ""
  
  for(let i=0;i<data.drinks.length; i++){
    ulList.innerHTML+=`<li class="drink listElement">
    <p>${data.drinks[i].strDrink}</p>
    <img src="${printImage(data.drinks[i].strDrinkThumb)}"/>
    </li>`
  }
  const clickedList=document.querySelectorAll(".drink")

  addListenersList(clickedList) 
}

function getDataApi(drinkName){
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkName)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    renderDrinks(data);
  })
}

function printImage(srcImage) {
  if(srcImage && srcImage.length > 0){
    return srcImage
  }else {
    return 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
  }
}

function addClassFavorite(element) {
  element.classList.remove('listElement')
  element.classList.add('favoriteElement')

}

function handleClick(){
  event.preventDefault();
  const value = inputText.value;

  getDataApi(value)
}

searchBtn.addEventListener("click", handleClick);

localStorage.setItem('drinks favorites', JSON.stringify (favoritesList) );
