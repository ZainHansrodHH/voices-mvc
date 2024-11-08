//JS file for handing our logic of the application

window.addEventListener('DOMContentLoaded', (event) => {

    wordCounter();
    resetForm();
    showFileName();
    errorHandling();
    stateOptionControl();
    formResponse();
    fileBtnTab();
});

/* 
    Function Name - wordCounter

    Purpose - Used for the logic which handles the word counter at the bottom of the script box
*/
function wordCounter() {

    //Script text area element
    var scriptBox = document.getElementById('form--script');

    //Word count span element
    var wordCount = document.querySelector('.form--word-count-number');

    //Event listener for each time there is an input in the script box 
    scriptBox.addEventListener("input", () => {
        let wordCountEl = document.querySelector('.form--word-count-word');
        let text = scriptBox.value.trim();

        let words = text ? text.split(/\s+/).filter(word => word.length > 0) : [];

        wordCount.textContent = words.length;

        //Set it to either word or words depending on how many are in at one time
        words.length === 1 ? wordCountEl.textContent = 'Word' : wordCountEl.textContent = 'Words';
    });
}

/* 
    Function Name - showFileName

    Purpose - Used for showing the name of the file which was uploaded by the user
*/

function showFileName() {
    let fileElement = document.querySelector("#form--file");
    let fileName = document.querySelector(".form--file-name");

    fileElement.addEventListener('change', () => {
        fileName.textContent = fileElement.files[0].name;
    });
}

/* 
    Function Name - resetForm

    Purpose - Used for handling the reset button logic for elements that do not get reset such as the error messages, word counter etc.
*/

function resetForm() {
    let resetBtn = document.querySelector('.btn-reset');

    resetBtn.addEventListener('click', () => {
        //Clear the word counter when the form is reset
        document.querySelector('.form--word-count span').textContent = '0';

        //Clear the file name when the form resets
        document.querySelector('.form--file-name').textContent = '';

        //Remove any errors that are currently showing
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form--input-error').forEach(el => el.classList.remove('form--input-error'));

    });
}

/* 
    Function Name - errorHandling

    Purpose - Function that handles what happens when the form is submitted as well as error handling and checking
*/

function errorHandling() {
    let form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //Check to see if an error was detected
        let isFormValid = true;

        //Project Name
        let projectName = document.querySelector('#form--input-title');
        let projectNameError = document.querySelector('.error-message--input-title');

        projectName.classList.remove('form--input-error');
        projectNameError.textContent = '';

        if (!projectName.value) {
            projectNameError.textContent = 'Please enter a name for the project';
            projectName.classList.add('form--input-error');
            isFormValid = false;
        }

        //Country & State
        let country = document.querySelector('#form--country');
        let state = document.querySelector('#form--state');

        let countryErrorMessage = document.querySelector('.error-message--country');
        let stateErrorMessage = document.querySelector('.error-message--state');

        country.classList.remove('form--input-error');
        state.classList.remove('form--input-error');

        countryErrorMessage.textContent = '';
        stateErrorMessage.textContent = '';

        if (country.selectedIndex === 0) {
            countryErrorMessage.textContent = 'Please select an option';
            country.classList.add('form--input-error');
            isFormValid = false;
        }

        if (state.selectedIndex === 0) {
            stateErrorMessage.textContent = 'Please select an option';
            state.classList.add('form--input-error');
            isFormValid = false;
        }

        //Check if the honeypot was hit

        let honeypot = document.querySelector('#namehoneypot');

        if (honeypot.value) {
            alert('Not human :)');
            isFormValid = false;
        }

        //If form is valid, we can submit it

        if (isFormValid) {
            form.submit();
        }

    });
}

/* 
    Function Name - stateOptionControl

    Purpose - Function controlling the State dropdown depending on which country is selected and dynamically populating the values based on that
*/

function stateOptionControl() {

    let country = document.querySelector('#form--country');
    let state = document.querySelector('#form--state');

    //Watch for changes on the country input in order to enable the state selector and populate the correct values
    country.addEventListener('change', () => {
        let selectedCountry = country.value;

        //Remove any existing options that are present 
        state.innerHTML = '<option value="" disabled selected>Select your state or province</option>';

        let stateValues = stateProvinceData[selectedCountry];

        //Populate the state dropdown with the correct values
        state.innerHTML += stateValues.map(state => `<option value="${state}">${state}</option>`);

        state.disabled = false;

    });

}


/* 
    Function Name - formResponse

    Purpose - Handles the params which are passed if the mail was successful or not and displays a message for the user based on that 
*/

function formResponse() {

    //If the URL param is true show a positive message and remove the param. If false, show negative message and remove the param
    let queryUrl = window.location.search;
    let urlResponse = queryUrl.split('=');

    if (urlResponse[1] == 'true') {
        alert('Thank you so much for submitting, we will be in touch soon!');
        window.history.replaceState(null, '', window.location.pathname);
    } else if (urlResponse[1] == 'false') {
        alert('There was an issue submitting your form, please try again');
        window.history.replaceState(null, '', window.location.pathname);
    }
}


/* 
    Function Name - fileBtnTab

    Purpose - Ensures that the file upload label btn is tabbable and does not default to skipping 
*/

function fileBtnTab() {
    document.querySelector('.form--file-btn').addEventListener('focus', (e) => {
        e.preventDefault();
    });
}

//Object containing the states and provinces in Canada & the USA
let stateProvinceData = {
    Canada: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon"
    ],
    USA: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ]
};