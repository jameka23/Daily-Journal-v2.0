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
    // if(event.target.value === "happyMood"){
    //     clearElements(mainArticleContainer);
    //     API.getMoodEntries("happy").then(functionThatRendersData);
    // }else if(event.target.value === "sadMood"){
    //     clearElements(mainArticleContainer);
    //     API.getMoodEntries("sad").then(functionThatRendersData);
    // }else if(event.target.value === "angryMood"){
    //     clearElements(mainArticleContainer);
    //     API.getMoodEntries("angry").then(functionThatRendersData);  
    // }else if(event.target.value === "frustratedMood"){
    //     clearElements(mainArticleContainer);
    //     API.getMoodEntries("frustrated").then(functionThatRendersData); 
    // }
}