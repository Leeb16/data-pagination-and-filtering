/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Lee Bryan
*/

const itemsPerPage = 9;
const studentList = document.querySelector('ul.student-list');
const linkList = document.querySelector('ul.link-list');

/* @param {list} will store the data from the data.js file.
   @param {page} will display the current page.
*/

/*
Creates the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage (list,page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage
   const endIndex = (page * itemsPerPage)
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {

      if (i >= startIndex && i < endIndex) {

         let studentItem =  
            `<li class="student-item cf">
               <div class="student-details">
                <img class="avatar" src=${list[i].picture.large} alt="${list[i].name.first} ${list[i].name.last} Profile Picture">
                <h3>${list[i].name.first} ${list[i].name.last}</h3></h3>
                <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
            `;
            studentList.insertAdjacentHTML('beforeend',studentItem);
      }
   }
   return
}

/*
Creates the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination (list) {
   linkList.innerHTML = '';

   if (list.length >0) {
      const numberofButtons = Math.ceil(list.length/itemsPerPage);

      for (let i = 1; i <= numberofButtons; i++) {
         linkList.insertAdjacentHTML('beforeend',`
         <li>
            <button type="button">${i}</button>
         </li>
       `)
      }
      const activeButton = linkList.firstElementChild.firstElementChild;
      activeButton.className = 'active';
   }
   
   linkList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
         const clickedButton = document.querySelector('.active')
         clickedButton.className = '';
         event.target.className = 'active';
         showPage(list,event.target.textContent);  //text content contains the page number you want
      }
   });
}

/* This function creates a search bar and manages the keyup and click events*/

function addSearchBar() {
   const header = document.querySelector('.header');

   const searchName = 
         `<label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
         </label>
          `;

   header.insertAdjacentHTML('beforeend', searchName);

   const searchStudent = document.querySelector('.student-search input');
   const submit = document.querySelector('.student-search button');

   submit.addEventListener('click', (e) => {
      e.preventDefault();
      searchFunc(data);
   });

   searchStudent.addEventListener('keyup', () => {
      searchFunc(data);
   });
}

// This function searches for the input in the search bar 


function searchFunc(list) {
   const input = document.querySelector('.student-search input').value.toLowerCase();
   const showStudents = [];
   for (let i = 0; i < list.length; i++) {
      const name = Object.values(list[i]).join('').toLowerCase();

      if  (input !== 0 && name.includes(input)) {
         showStudents.push(list[i]);
         studentList.textContent = '';
         showPage(showStudents, 1);
         addPagination(showStudents);
      }

      if(showStudents.length === 0) {
         studentList.textContent = 'No results';
         addPagination(showStudents);
      }
   }
}

// Call functions

showPage(data,1);
addPagination(data);
addSearchBar();