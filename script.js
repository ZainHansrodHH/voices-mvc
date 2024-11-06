//JS file for handing our logic of the application

window.addEventListener('DOMContentLoaded', (event) => {

    wordCounter();
    resetForm();
    showFileName();
    errorHandling();
    stateOptionControl();

});

//Script word counter logic
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

//Function for showing the file name when a file is uploaded 

function showFileName() {
    let fileElement = document.querySelector("#form--file");
    let fileName = document.querySelector(".form--file-name");

    fileElement.addEventListener('change', () => {
        console.log('change');
        fileName.textContent = fileElement.files[0].name;
    });
}

//Function for handling the reset button logic for the word counter and file name

function resetForm() {
    let resetBtn = document.querySelector('.btn-reset');

    resetBtn.addEventListener('click', () => {
        //Clear the word counter when the form is reset
        document.querySelector('.form--word-count span').textContent = '0';

        //Clear the file name when the form resets
        document.querySelector('.form--file-name').textContent = '';

    });
}

//Form error handling

function errorHandling() {
    let form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //Project Name
        let projectName = document.querySelector('#form--input-title');
        let projectNameError = document.querySelector('.error-message--input-title');

        projectName.classList.remove('form--input-error');
        projectNameError.textContent = '';

        if (!projectName.value) {
            projectNameError.textContent = 'Please enter a name for the project';
            projectName.classList.add('form--input-error');
        }

        //Country & State
        let country = document.querySelector('#form--country');
        let state = document.querySelector('#form--state');

        let countryErrorMessage = document.querySelector('.error-message--country');
        let stateErrorMessage = document.querySelector('.error-message--state');

        countryErrorMessage.textContent = '';
        stateErrorMessage.textContent = '';

        if (country.selectedIndex == 0) {
            countryErrorMessage.textContent = 'Please select an option';
        }

        if (state.selectedIndex == 0) {
            stateErrorMessage.textContent = 'Please select an option';
        }

    });
}

//Function controlling the State dropdown depending on which country is selected

function stateOptionControl() {

    let country = document.querySelector('#form--country');
    let state = document.querySelector('#form--state');

    //Watch for changes on the country input in order to enable the state selector and populate the correct values
    country.addEventListener('change', () => {
        let selectedCountry = country.value;

        console.log(selectedCountry);

        //Remove any existing options that are present 
        state.innerHTML = '<option value="" disabled selected>Select your state or province</option>';

        let stateValues = stateProvinceData[selectedCountry];

        //Populate the state dropdown with the correct values
        state.innerHTML += stateValues.map(state => `<option value="${state}">${state}</option>`);

        state.disabled = false;

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