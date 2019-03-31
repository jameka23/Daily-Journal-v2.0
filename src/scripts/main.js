// step 1. call the function to build the form html
buildMainHTML();

// step 2. call api object's method getEntries which will then call a function to 
// render that data to the dom 
API.getJournalEntries().then(functionThatRendersData);

// step 3. will call the event handler for the record button which will save to api + refresh the dom + add to the DOM
const saveButton = document.querySelector("#save--button");
saveButton.addEventListener("click", saveButtonHandler);

// step 4. will call the handler function for each time the radio buttons are pressed

const happyRadioEvent = document.querySelector("#happyMood");
happyRadioEvent.addEventListener("")