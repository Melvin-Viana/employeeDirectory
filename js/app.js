'use strict';
const container = document.querySelector('.directory-container'),
    modalContainer = document.querySelector('#modal-container'),
    modalImage = document.querySelector('.modal-image'),
    modalName = document.querySelector('.name'),
    modalEmail = document.querySelector('.email'),
    modalPhone = document.querySelector('.phone'),
    modalAddress = document.querySelector('.address'),
    modalBirthday = document.querySelector('.birthday'),
    modalCity = document.querySelector('.location'),
    close = document.querySelector('.close'),
    leftContainer = document.querySelector('.left-container'),
    rightContainer = document.querySelector('.right-container');

const userResults = [];
// TODO: Fetch 12 Random users from the api
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

let employeeIndex = 0;
//TODO: New random employee information displays each time the page refreshes
const generateEmployeeInfo = (userData, employeeIndex) => {
    userResults.push(userData);
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
    div.addEventListener('click', () => showModal(userData, employeeIndex))
}

const createElement = (tag, innerHTML, className) => {
    const elem = document.createElement(tag);
    elem.innerHTML = innerHTML;
    elem.classList.add(className);
    return elem;
}
//Display Modal with selected userData
const showModal = (userData, index) => {
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
    modalImage.setAttribute('src', userData.picture.large);
    modalContainer.style.display = "inline";
    modalContainer.style.animation = "fadeIn .5s";
    modalName.innerHTML = `${first} ${last}`;
    modalEmail.innerHTML = email;
    modalPhone.innerHTML = phone;
    modalCity.innerHTML = city + ", " + state;
    modalAddress.innerHTML = street;
    modalBirthday.innerHTML = date;
    employeeIndex = index;
    (employeeIndex == 0) ? leftContainer.style.display = "none": leftContainer.style.display = "block";
    (employeeIndex == 12) ? rightContainer.style.display = "none": rightContainer.style.display = "block";
}

// Fetch users and display error on console if error occurs
fetchData('https://randomuser.me/api/?results=12&nat=us').then(async e => {
    await e.results.forEach((item, index) => generateEmployeeInfo(item, index))
}).catch(e => console.log(e)).finally(() => {
    const modal = document.querySelector('.modal');
    // Close
    close.addEventListener('click', () => {
        modalContainer.style.animation = "fadeOut .5s";
        setTimeout(() => modalContainer.style.display = "none", 400);
    });


// ** Functionality has been added to switch back and forth between employees when the detail modal window is open.

    // Left arrow previous user
    leftContainer.addEventListener('click', () => {
        if (employeeIndex == 0) {
            return false;
        }

        employeeIndex--;
        modal.style.display = "none",
            modal.style.animation = "fadeIn .5s";
        modal.style.display = "flex",
            showModal(userResults[employeeIndex], employeeIndex);
            setTimeout(() => {
                modal.style.animation = ""
            }, 500);
    });
    // Right arrow next user
    rightContainer.addEventListener('click', () => {
        if (employeeIndex == 11) {
            return false;
        }
        employeeIndex++;
        modal.style.display = "none",
        modal.style.animation = "fadeIn .5s";
        modal.style.display = "flex",
            showModal(userResults[employeeIndex], employeeIndex);

        setTimeout(() => {
            modal.style.animation = ""
        }, 500);
    });

});



//** Employees can be filtered by name or username
