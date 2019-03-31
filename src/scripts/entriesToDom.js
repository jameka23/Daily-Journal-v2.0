const articleDOM = document.querySelector("#entry--log")

const functionThatRendersData = (parsedEntry) => {
    console.log(parsedEntry) //an array of objects
    const articleDomFrag = document.createDocumentFragment();
    
    parsedEntry.forEach(entry => {
        let journalEntryHtml = makeJournalEntryComponent(entry);
        
        articleDomFrag.appendChild(journalEntryHtml);
        const hr = document.createElement("hr");
        articleDomFrag.appendChild(hr);
    })
    articleDOM.appendChild(articleDomFrag);

}