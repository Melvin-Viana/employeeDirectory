'use strict';
const directoryContainer = document.querySelector('.directory-container'),
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
//* Fetch 12 Random users from the api
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
let employeeIndex = 0;
//* New random employee information displays each time the page refreshes
const generateEmployeeInfo = (userData, employeeIndex) => {
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
    directoryContainer.append(div);
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
            street,
            postcode
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
    // Convert UTC date to Date
    let birthDate = new Date(date);
    //* Format Address and Date
    modalImage.setAttribute('src', large);
    modalContainer.style.display = "inline";
    modalContainer.style.animation = "fadeIn .5s";
    modalName.innerHTML = `${first} ${last}`;
    modalEmail.innerHTML = email;
    modalPhone.innerHTML = phone;
    modalCity.innerHTML = city;
    modalAddress.innerHTML = `${street}, ${states_hash[state]} ${postcode} `;
    modalBirthday.innerHTML = `Birthday: ${getDate(birthDate)}`;
    employeeIndex = index;
    // Hide arrows if prev/next user not available
    (employeeIndex == 0) ? leftContainer.style.display = "none": leftContainer.style.display = "block";
    (employeeIndex == 11) ? rightContainer.style.display = "none": rightContainer.style.display = "block";
}

// Fetch users and display error on console if error occurs
fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(async e => {
        await e.results.forEach((item, index) => {
            generateEmployeeInfo(item, index);
            userResults.push(item);
        })
    }).catch(e => console.log(e))
    .finally(() => {
        // Close
        close.addEventListener('click', () => {
            modalContainer.style.animation = "fadeOut .5s";
            setTimeout(() => modalContainer.style.display = "none", 400);
        });
        // * Functionality has been added to switch back and forth between employees when the detail modal window is open.
        // Left arrow previous user
        leftContainer.addEventListener('click', () => {
            if (employeeIndex == 0) {
                return false;
            }
            employeeIndex--;
            modalSwitch();
        });
        // Right arrow next user
        rightContainer.addEventListener('click', () => {
            if (employeeIndex == 11) {
                return false;
            }
            employeeIndex++;
            modalSwitch();
        });
        //* Employees can be filtered by name or username
        const aTozFilter = document.querySelector('.fName-az'),
            zToaFilter = document.querySelector('.fName-za');
        aTozFilter.addEventListener('click', () => filterCallback('name', 'first', false));
        zToaFilter.addEventListener('click', () => filterCallback('name', 'first', true));
    });

// ===================================================================================
// State object to convert to abbreviation
const states_hash = {
    "wyoming": "WY",
    "wisconsin": "WI",
    "west virginia": "WV",
    "washington": "WA",
    "virginia": "VA",
    "virgin islands": "VI",
    "vermont": "VT",
    "utah": "UT",
    "texas": "TX",
    "tennessee": "TN",
    "south dakota": "SD",
    "south carolina": "SC",
    "rhode island": "RI",
    "puerto rico": "PR",
    "pennsylvania": "PA",
    "palau": "PW",
    "oregon": "OR",
    "oklahoma": "OK",
    "ohio": "OH",
    "northern mariana islands": "MP",
    "north dakota": "ND",
    "north carolina": "NC",
    "new york": "NY",
    "new mexico": "NM",
    "new jersey": "NJ",
    "new hampshire": "NH",
    "nevada": "NV",
    "nebraska": "NE",
    "montana": "MT",
    "missouri": "MO",
    "mississippi": "MS",
    "minnesota": "MN",
    "michigan": "MI",
    "massachusetts": "MA",
    "maryland": "MD",
    "marshall islands": "MH",
    "maine": "ME",
    "louisiana": "LA",
    "kentucky": "KY",
    "kansas": "KS",
    "iowa": "IA",
    "indiana": "IN",
    "illinois": "IL",
    "idaho": "ID",
    "hawaii": "HI",
    "guam": "GU",
    "georgia": "GA",
    "florida": "FL",
    "federated states of micronesia": "FM",
    "district of columbia": "DC",
    "delaware": "DE",
    "connecticut": "CT",
    "colorado": "CO",
    "california": "CA",
    "arkansas": "AR",
    "arizona": "AZ",
    "american samoa": "AS",
    "alaska": "AK",
    "alabama": "AL"
}
const getDate = (date) => {
    return getMonthName(date.getMonth()) + " " + date.getDate();
}
const getMonthName = (month) => {
    const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return arr[month];
}
// Sort Function
const sortBy = (prop, nestedProp) => (prop1, prop2) => (prop1[prop][nestedProp] > prop2[prop][nestedProp]) ? 1 : -1;
// Callback function for filter click event
const filterCallback = (prop1, nestedProp, reverse) => {
    directoryContainer.innerHTML = "";
    (reverse) ? userResults.reverse(sortBy(prop1, nestedProp)): userResults.sort(sortBy(prop1, nestedProp));
    userResults.forEach((item, index) => generateEmployeeInfo(item, index));
}
const modalSwitch = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = "none",
        modal.style.animation = "fadeIn .5s";
    modal.style.display = "flex",
        showModal(userResults[employeeIndex], employeeIndex);
    setTimeout(() => {
        modal.style.animation = ""
    }, 500);
}