const saveButtonHandler = () => {
    console.log("save button pressed!");

    // save all the input values into a variable so we can pass them to the factory function
    const userEntryDate = document.querySelector("#journalDate").value;
    const userEntry = document.querySelector("#journalEntry").value;
    const userConcept = document.querySelector("#concepts").value;
    const mood = document.querySelector("#mood");
    userMood = mood.options[mood.selectedIndex].value;
    const entry = newJournalEntry(userConcept, userEntry, userEntryDate, userMood);
    console.log(entry);
    
    // this function will clear out the dom so that we can 
    // append the new section of journal entries 
    while (mainArticleContainer.firstChild) {
        mainArticleContainer.removeChild(mainArticleContainer.firstChild);
    }

    // save the 'entry' to the api, THEN call to GET the entries, THEN append to the DOM
    API.saveJournalEntry(entry).then(API.getJournalEntries).then(functionThatRendersData);

}


const filterMoodHandler = () => {
    // this function will produce all the entries w/ the selected mood from the radio buttons
    console.log(event.value);
    switch(event.value) {
        case "happy": 
    }
}