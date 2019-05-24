// TODO: Fetch 12 Random users from the api
const getUserJSON =fetch('https://randomuser.me/api/?results=12&nat=us').then(res=>res.json());
const getRandomUsers = ()=> getUserJSON.then(e=>e.results);

//TODO: New random employee information displays each time the page refreshes

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

