'use strict';
const container = document.querySelector('.directory-container'),
    modal = document.querySelector('#modal-container'),
    modalImage = document.querySelector('.modal-image'),
    modalName = document.querySelector('.name'),
    modalEmail = document.querySelector('.email'),
    modalPhone = document.querySelector('.phone'),
    modalAddress = document.querySelector('.address'),
    modalBirthday = document.querySelector('.birthday'),
    modalCity = document.querySelector('.location'),
    close = document.querySelector('.close');

// TODO: Fetch 12 Random users from the api
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
// Fetch users and display error on console if error occurs
fetchData('https://randomuser.me/api/?results=12&nat=us').then(async e => {
    await e.results.forEach((item, index) => generateEmployeeInfo(item, index))
}).catch(e => console.log(e));

//TODO: New random employee information displays each time the page refreshes
const generateEmployeeInfo = (userData) => {
    // Create elements
    const div = createElement('div', "", "employee-container"),
        img = createElement("img", "", "employee-picture"),
        name = createElement('p', `${userData.name.first} ${userData.name.last}`, "employee-name"),
        email = createElement('p', userData.email, 'employee-email'),
        city = createElement('p', userData.location.city, 'employee-city'),
        dataContainer = createElement('div', '', 'user-data');

    img.setAttribute('src', userData.picture.large);

    // Append all elements
    div.append(img);
    dataContainer.append(name);
    dataContainer.append(email);
    dataContainer.append(city);
    div.append(dataContainer);
    container.append(div);
    // Show modal when clicked
    div.addEventListener('click', () => showModal(userData))
}

const createElement = (tag, innerHTML, className) => {
    const elem = document.createElement(tag);
    elem.innerHTML = innerHTML;
    elem.classList.add(className);
    return elem;
}
//** Employees can be filtered by name or username

//Display Modal with selected userData
const showModal = userData => {
    const {
        email,
        phone,
        location: {
            city,
            state,
            street
        },
        dob: {
            date
        },
        picture: {
            large
        },
        name: {
            first,
            last
        }
    } = userData;
    // modal.style.animation('fadeIn 1s');
    modalImage.setAttribute('src', userData.picture.large);
    modal.style.display = "inline";
    modal.style.animation = "fadeIn .7s";
    modalName.innerHTML = `${first} ${last}`;
    modalEmail.innerHTML = email;
    modalPhone.innerHTML = phone;
    modalCity.innerHTML = city + ", " + state;
    modalAddress.innerHTML = street;
    modalBirthday.innerHTML = date;
    modal.style.animation = "fadeIn .7s";
}
// ** Functionality has been added to switch back and forth between employees when the detail modal window is open.


// Close
close.addEventListener('click', () => {
    modal.style.animation = "fadeOut .7s";
    setTimeout(() => modal.style.display = "none", 600);
});