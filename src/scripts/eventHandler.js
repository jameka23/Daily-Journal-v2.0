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
    clearElements(mainArticleContainer);

    // save the 'entry' to the api, THEN call to GET the entries, THEN append to the DOM
    API.saveJournalEntry(entry).then(API.getJournalEntries).then(functionThatRendersData);


}


const filterMoodHandler = () => {
    // this function will produce all the entries w/ the selected mood from the radio buttons
    // console.log(event.target.value);
    switch(true) {
        case (event.target.value === "happyMood"):
            clearElements(mainArticleContainer);
            API.getMoodEntries("happy").then(functionThatRendersData);
            break;
        case (event.target.value === "sadMood"):
            console.log("what happened") 
            clearElements(mainArticleContainer);
            API.getMoodEntries("sad").then(functionThatRendersData);
            break;
        case (event.target.value === "angryMood"): 
            clearElements(mainArticleContainer);
            API.getMoodEntries("angry").then(functionThatRendersData);
            break;
        default:
            clearElements(mainArticleContainer);
            API.getMoodEntries("frustrated").then(functionThatRendersData);
            break;
    }
}

const handleDelete = () => {
    // this is the delete handler function
    entryId = event.target.parentNode.id.split("--")[1];
    console.log(entryId);

    API.deleteEntry(entryId).then(API.getJournalEntries).then(functionThatRendersData);
}

const handleEdit = () => {
    // this function will populate the entry in question 
    entryId = event.target.parentNode.id.split("--")[1];
    console.log(entryId);

    const editFormArticle = document.querySelector(`#entry-log--${entryId}`);
    console.log(editFormArticle);
    // get that particular object
    API.getEntry(entryId).then(entryToEdit => {
        clearElements(editFormArticle);
        const editEntry = buildEditFormHtml(entryToEdit);
        editFormArticle.appendChild(editEntry);
    });
    // API.updateEntry(entryId, updatedObj).then(API.getJournalEntries).then(functionThatRendersData);
}

const handleUpdate = () => {
    // this function will update the information in question
    const entryId = event.target.id.split("--")[1];
    // console.log(event.target);
    console.log(entryId);

    const updatedEntry = document.querySelector(`#edit-entry--${entryId}`).value;
    const updatedConcept = document.querySelector(`#edit-concepts--${entryId}`).value;
    const updatedDate = document.querySelector(`#edit-date--${entryId}`).value;
    const updatedMood = document.querySelector(`#edit-mood--${entryId}`);
    const mood = updatedMood.options[updatedMood.selectedIndex].value;

    // console.log(updatedEntry,updatedConcept, updatedDate, mood);

    let updatedJournalEntry = newJournalEntry(updatedConcept,updatedEntry,updatedDate, mood);

    clearElements(mainArticleContainer);
    API.putEntry(entryId, updatedJournalEntry).then(API.getJournalEntries).then(functionThatRendersData);
}

const handleSearch = () => {
    if (event.charCode === 13) {
        // console.log("something was searched");
        const searchTerm = event.target.value.toString().toLowerCase();
        // console.log(searchTerm);
        clearElements(mainArticleContainer);
        // mainArticleContainer.innerHTML = ''
        API.getJournalEntries().then(entryArray => {
            entryArray.forEach(journalObj => {
                const journalArrayValues = Object.values(journalObj);
                // console.log(journalArrayValues);
                const matchSearch = journalArrayValues.filter(value => {
                    // console.log(typeof(value));
                    let lowerCaseValue = value.toString().toLowerCase();
                    return lowerCaseValue.includes(searchTerm);
                })
                // console.log("what is in the array: ",matchSearch);
                if(matchSearch.length > 1){
                    renderSearchData(journalObj);
                }
            })
        })
    }
}