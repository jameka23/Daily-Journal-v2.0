// imports
import entryComponent from "./entryComponent"


const articleDOM = document.querySelector("#entry--log")

const entriesToDom = {
    functionThatRendersData: (parsedEntry) => {
        console.log(parsedEntry) //an array of objects
        const articleDomFrag = document.createDocumentFragment();
        
        parsedEntry.forEach(entry => {
            let journalEntryHtml = entryComponent.makeJournalEntryComponent(entry);
            
            articleDomFrag.appendChild(journalEntryHtml);
            const hr = document.createElement("hr");
            articleDomFrag.appendChild(hr);
        })
        articleDOM.appendChild(articleDomFrag);
    
    },
    renderSearchData: (obj) => {
        const header = document.createElement("h2");
        const para1 = document.createElement("p");
        const para2 = document.createElement("p");
    
        header.textContent = obj.concepts;
        para1.textContent = obj.entry;
        para2.textContent = obj.entry_date;
    
        mainArticleContainer.appendChild(header);
        mainArticleContainer.appendChild(para1);
        mainArticleContainer.appendChild(para2);
    }
}

export default entriesToDom;