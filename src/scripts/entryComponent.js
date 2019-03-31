const makeJournalEntryComponent = (entryObj) => {
    const entryHtmlComponent = document.createElement("article");
    /*  
        <h1>${journalEntry.concepts}</h1>
        <p>${journalEntry.entry}</p>
        <p>${journalEntry.entry_date}</p>
        <p>${journalEntry.mood}</p>
     */
    const h2Tag = document.createElement("h2");
    h2Tag.textContent = `${entryObj.concepts}`;
    entryHtmlComponent.appendChild(h2Tag);

    const dateTag = document.createElement("h4");
    dateTag.textContent =  `${entryObj.entry_date}`;
    entryHtmlComponent.appendChild(dateTag);

    const paraEntryTag = document.createElement("p");
    paraEntryTag.textContent = `${entryObj.entry}`;
    entryHtmlComponent.appendChild(paraEntryTag);

    const paraMoodTag = document.createElement("p");
    paraMoodTag.textContent = `${entryObj.mood}`;
    entryHtmlComponent.appendChild(paraMoodTag);

    return entryHtmlComponent;
}

const newJournalEntry = (journalConcepts, journalEntry, journalDate, journalMood) => {
    // Invoke the factory function, passing along the form field values
    return {
        "entry_date": journalConcepts,
        "concepts": journalEntry,
        "entry": journalDate,
        "mood": journalMood
    }
}