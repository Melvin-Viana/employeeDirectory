// Elements
const container = document.querySelector('.container');

// TODO: Fetch 12 Random users from the api
async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
fetchData('https://randomuser.me/api/?results=12&nat=us').then(e=>{e.results.forEach(e=>generateEmployeeInfo(e))});
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
    div.append(name);
    div.append(email);
    container.append(div);
    // Show modal when clicked
    // div.addEventListener('click',showModal(userData))
}

/*TODO: The directory includes the following:
    Employee Image
    First and Last Name
    Email
    City*/
//** Employees can be filtered by name or username

/*TODO: Modal window displays the following details:

    Employee image
    Name
    Email
    Cell Number
    Detailed Address, including street name and number, city, state and post code */
//TODO: Birthdate => Modal
// ** Functionality has been added to switch back and forth between employees when the detail modal window is open.


//TODO: Directory has been styled so that all the major elements are in place and roughly matches the mockups

