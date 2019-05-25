'use strict';
const container = document.querySelector('.directory-container'),
  modal = document.querySelector('#modal-container'),
  modalImage = document.querySelector('.modal-image'),
  modalEmail =document.querySelector('.email'),
  modalPhone=document.querySelector('.phone'),
  modalAddress=document.querySelector('.address'),
  modalBirthday=document.querySelector('.birthday'),
   modalCity=document.querySelector('.location');

// TODO: Fetch 12 Random users from the api
async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
// Fetch users and display error on console if error occurs
fetchData('https://randomuser.me/api/?results=12&nat=us').then(async e=>{await e.results.forEach(e=>generateEmployeeInfo(e))}).catch(e=>console.log(e));

//TODO: New random employee information displays each time the page refreshes
const generateEmployeeInfo = (userData)=>{
    const div = document.createElement('div')
    div.classList.add("employee-container");
    const img = document.createElement('img');
    img.classList.add('employee-picture');
    img.setAttribute('src', userData.picture.large);
    const name = document.createElement('p');
    name.classList.add('employee-name');
    name.innerHTML=`${userData.name.first} ${userData.name.last}`;
    const email = document.createElement('p');
    email.classList.add('employee-email');
    email.innerHTML=userData.email;
    div.append(img);
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('user-data');
    dataContainer.append(name);
    dataContainer.append(email);
    div.append(dataContainer);
    container.append(div);
    // Show modal when clicked
     div.addEventListener('click',()=>showModal(userData))
}

/*TODO: The directory includes the following:
    Employee Image
    First and Last Name
    Email
    City*/
//** Employees can be filtered by name or username

    //Display Modal with selected userData
    const showModal=userData=>{
        const {email,phone,location:{city,state,street},dob:{date},picture:{large}}=userData;
        // modal.style.animation('fadeIn 1s');
        modalImage.setAttribute('src', userData.picture.large);
        modal.style.display="block";
        modal.style.animation="fadeIn .7s";
        modalEmail.innerHTML=email;
        modalPhone.innerHTML=phone;
        modalCity.innerHTML=city+", "+state;
        modalAddress.innerHTML=street;
        modalBirthday.innerHTML=date;
    }
// ** Functionality has been added to switch back and forth between employees when the detail modal window is open.


//TODO: Directory has been styled so that all the major elements are in place and roughly matches the mockups

