// imports 
import handlers from "./eventHandler"


const entryComponenet = {
    makeJournalEntryComponent: (entryObj) => {
        const entryHtmlComponent = document.createElement("article");
        entryHtmlComponent.id = `entry-log--${entryObj.id}`
        
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
        paraMoodTag.textContent = `Mood: ${entryObj.mood}`;
        entryHtmlComponent.appendChild(paraMoodTag);
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = `delete--entry-${entryObj.id}`;
        deleteButton.addEventListener("click", handlers.handleDelete);
    
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.id = `edit--entry-${entryObj.id}`;
        editButton.addEventListener("click", handlers.handleEdit);
    
        entryHtmlComponent.appendChild(editButton);
        entryHtmlComponent.appendChild(deleteButton);
    
    
        return entryHtmlComponent;
    },
    newJournalEntry: (journalConcepts, journalEntry, journalDate, journalMood) => {
        // Invoke the factory function, passing along the form field values
        return {
            "entry_date": journalDate,
            "concepts": journalConcepts,
            "entry": journalEntry,
            "mood": journalMood
        }
    }
}

export default entryComponenet