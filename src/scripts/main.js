import API from "./data"
import domManager from "./domManager"
import entriesToDom from "./entriesToDom"

// step 1. call the function to build the form html
domManager.buildMainHTML();

// step 2. call api object's method getEntries which will then call a function to 
// render that data to the dom 
API.getJournalEntries().then(entriesToDom.functionThatRendersData);

