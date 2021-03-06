// import files
import handlers from "./eventHandler"

const mainDivContainer = document.querySelector("#display--container");
const mainArticleContainer = document.querySelector("#entry--log");
const mainContainerDocFrag = document.createDocumentFragment();

const buildElement = (elemType, elemValue, elemTextContent, elemId) => {
    
}

const domManager = {
    buildFieldsetElement: (elm, elmType, elemAttribute, elemTextContent) => {
        // this will actually make the form's fieldset
        const fieldsetElement = document.createElement("fieldset");
        const labelElement = document.createElement("label");
        
        switch(elm) {
            case "textarea":  const textAreaElement = document.createElement("textarea");
                // checks to see if the elm is not undefined which means it is textarea
                labelElement.setAttribute("for", elemAttribute);
                labelElement.textContent = elemTextContent;
    
                textAreaElement.name = elemAttribute;
                textAreaElement.id = elemAttribute;
                textAreaElement.cols = "30";
                textAreaElement.rows = "5";
                textAreaElement.setAttribute("required", true);
    
                fieldsetElement.appendChild(labelElement);
                fieldsetElement.appendChild(textAreaElement);
                break;
            case "select":         // if elm === select, make that  element adding its attributes + options + append
                const selectElement = document.createElement("select");
                labelElement.setAttribute("for", elemAttribute);
                labelElement.textContent = elemTextContent;
                selectElement.name = elemAttribute;
                selectElement.id = elemAttribute;
    
                const option1 = document.createElement("option");
                option1.value = "happy";
                option1.textContent = "Happy";
                const option2 = document.createElement("option");
                option2.value = "sad";
                option2.textContent = "Sad";
                const option3 = document.createElement("option");
                option3.value = "angry";
                option3.textContent = "Angry";
                const option4 = document.createElement("option");
                option4.value = "frustrated";
                option4.textContent = "Frustrated";
    
                selectElement.appendChild(option1);
                selectElement.appendChild(option2);
                selectElement.appendChild(option3);
                selectElement.appendChild(option4);
    
                fieldsetElement.appendChild(labelElement);
                fieldsetElement.appendChild(selectElement);
                break;
            case "legend": const legendElement = document.createElement("legend");
                legendElement.textContent = elemTextContent;
                fieldsetElement.appendChild(legendElement);
    
                const happyLabel = document.createElement("label");
                happyLabel.textContent = "Happy";
                happyLabel.setAttribute("for", "happyMood");
                const happyRadioButton = document.createElement("input");
                happyRadioButton.type = elemAttribute;
                happyRadioButton.setAttribute("id", "happyMood");
                happyRadioButton.setAttribute("value", "happyMood");
                happyRadioButton.name = "mood";
                happyRadioButton.addEventListener("click", handlers.filterMoodHandler);
                fieldsetElement.appendChild(happyRadioButton);
                fieldsetElement.appendChild(happyLabel);
    
    
                const sadLabel = document.createElement("label");
                sadLabel.textContent = "Sad";
                sadLabel.setAttribute("for", "sadMood");
                const sadRadioButton = document.createElement("input");
                sadRadioButton.type = elemAttribute;
                sadRadioButton.setAttribute("id", "sadMood");
                sadRadioButton.setAttribute("value", "sadMood");
                sadRadioButton.name = "mood";
                sadRadioButton.addEventListener("click", handlers.filterMoodHandler);
                fieldsetElement.appendChild(sadRadioButton);
                fieldsetElement.appendChild(sadLabel);
    
                const angryLabel = document.createElement("label");
                angryLabel.textContent = "Angry";
                angryLabel.setAttribute("for", "angryMood");
                const angryRadioButton = document.createElement("input");
                angryRadioButton.type = elemAttribute;
                angryRadioButton.setAttribute("id", "angryMood");
                angryRadioButton.setAttribute("value", "angryMood");
                angryRadioButton.name = "mood";
                angryRadioButton.addEventListener("click", handlers.filterMoodHandler);
                fieldsetElement.appendChild(angryRadioButton);
                fieldsetElement.appendChild(angryLabel);
    
                const frustratedLabel = document.createElement("label");
                frustratedLabel.textContent = "Frustrated"
                frustratedLabel.setAttribute("for", "frustratedMood");
                const frustratedRadioButton = document.createElement("input");
                frustratedRadioButton.type = elemAttribute;
                frustratedRadioButton.setAttribute("id", "frustratedMood");
                frustratedRadioButton.setAttribute("value", "frustratedMood");
                frustratedRadioButton.name = "mood";
                frustratedRadioButton.addEventListener("click", handlers.filterMoodHandler);
                fieldsetElement.appendChild(frustratedRadioButton);
                fieldsetElement.appendChild(frustratedLabel);
                break;
            default:
                // if all else fails that means the element is an input element
                // create element + append to fieldset
                const inputElement = document.createElement("input");
            
                labelElement.setAttribute("for", elemAttribute);
                labelElement.textContent = elemTextContent;
    
                inputElement.type = elmType;
                inputElement.name = elemAttribute;
                inputElement.id = elemAttribute;
                inputElement.setAttribute("required", true);
    
                fieldsetElement.appendChild(labelElement);
                fieldsetElement.appendChild(inputElement);            
        }
        return fieldsetElement
    },
    buildMainHTML: () => {
        // this function will build the journal form for entry
        
        const journalHeader = document.createElement("h1");
        journalHeader.textContent = "DailyJournal";
    
        mainDivContainer.appendChild(journalHeader);
        
        const mainFormContainer = document.createElement("article");
        const dateFieldset = domManager.buildFieldsetElement(undefined, "date", "journalDate", "Date of Entry ");
        mainContainerDocFrag.appendChild(dateFieldset);
    
        const conceptFieldset = domManager.buildFieldsetElement(undefined, "text", "concepts", "Concepts covered ");
        mainContainerDocFrag.appendChild(conceptFieldset);
    
        const entryFieldset = domManager.buildFieldsetElement("textarea", undefined, "journalEntry", "Journal Entry ");
        mainContainerDocFrag.appendChild(entryFieldset);
    
        const selectFieldset = domManager.buildFieldsetElement("select", undefined, "mood", "Mood for the day ");
        mainContainerDocFrag.appendChild(selectFieldset);
    
        const saveButton = document.createElement("button");
        saveButton.id = "save--button";
        saveButton.textContent = "Save Journal Entry";
        let br = document.createElement("br");
        saveButton.addEventListener("click", handlers.saveButtonHandler);
    
        
        mainContainerDocFrag.appendChild(saveButton);
        mainArticleContainer.appendChild(br);
    
        mainFormContainer.appendChild(mainContainerDocFrag);
        mainDivContainer.appendChild(mainFormContainer);
        
        const hr = document.createElement("hr");
        mainDivContainer.appendChild(hr);
    
        mainArticleContainer.appendChild(br);
        mainArticleContainer.appendChild(br);
    
    
        // the filter mood container 
    
        // const mainLegendContainer = document.querySelector("#filter--and-search");
        const filterMoodContainer = document.querySelector("#filter--mood");
        const filterFieldset = domManager.buildFieldsetElement("legend", "filterMood", "radio", "Filter Journal Entries by Mood");
    
        // the search container 
        const searchEntries = document.querySelector("#search--entries");
        const searchFieldset = document.createElement("fieldset");
        const searchLegend = document.createElement("legend");
        searchLegend.textContent = "Search Journal Entries";
        searchFieldset.appendChild(searchLegend);
    
        const searchInput = document.createElement("input");
        searchInput.size = 50;
        searchInput.placeholder = "Enter search term";
        searchInput.id = "searched--item";
        searchFieldset.appendChild(searchInput);
        searchEntries.appendChild(searchFieldset);
        filterMoodContainer.appendChild(filterFieldset);
    
        searchInput.addEventListener("keypress", handlers.handleSearch);
    
    },
    clearElements: (element) => {
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    },
    buildEditFormHtml: (updateObj) => {
        // this function will create the form to edit 
    
        const editFieldset = document.createElement("fieldset");
        editFieldset.id =  `update-entry--${updateObj.id}`;
        const editDocForm = document.createDocumentFragment();
        const editLegend = document.createElement("legend");
        editLegend.textContent = "Update Journal Entry";
        editDocForm.appendChild(editLegend);
        // editFieldset.appendChild(editLegend);
    
        const conceptP = document.createElement("p");
        const conceptsLabel = document.createElement("label");
        conceptsLabel.textContent = "Concepts: ";
        const editConcepts = document.createElement("input");
        editConcepts.id = `edit-concepts--${updateObj.id}`;
        editConcepts.setAttribute("value", `${updateObj.concepts}`);
        editDocForm.appendChild(conceptP);
        editDocForm.appendChild(conceptsLabel);
        editDocForm.appendChild(editConcepts);
    
        const dateP = document.createElement("p");
        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Date: ";
        const editDate = document.createElement("input");
        editDate.id = `edit-date--${updateObj.id}`;
        editDate.setAttribute("value", `${updateObj.entry_date}`);
        editDocForm.appendChild(dateP);
        editDocForm.appendChild(dateLabel);
        editDocForm.appendChild(editDate);
    
        const entryP = document.createElement("p");
        const entryLabel = document.createElement("label");
        entryLabel.textContent = "Entry: ";
        const editEntry = document.createElement("input");
        editEntry.id = `edit-entry--${updateObj.id}`;
        editEntry.setAttribute("value", `${updateObj.entry}`);
        editDocForm.appendChild(entryP);
        editDocForm.appendChild(entryLabel);
        editDocForm.appendChild(editEntry);
    
        const moodP = document.createElement("p");
        const moodLabel = document.createElement("label");
        moodLabel.textContent = "Mood: ";
        const editMood = document.createElement("select");
        editMood.id = `edit-mood--${updateObj.id}`;
        const option1 = document.createElement("option");
        option1.value = "happy";
        option1.name = "mood";
        option1.textContent = "Happy";
        const option2 = document.createElement("option");
        option2.value = "sad";
        option2.name = "mood";
        option2.textContent = "Sad";
        const option3 = document.createElement("option");
        option3.value = "angry";
        option3.name = "mood";
        option3.textContent = "Angry";
        const option4 = document.createElement("option");
        option4.value = "frustrated";
        option4.name = "mood";
        option4.textContent = "Frustrated";
    
        editMood.appendChild(option1);
        editMood.appendChild(option2);
        editMood.appendChild(option3);
        editMood.appendChild(option4);
    
        const saveP = document.createElement("p");
        saveP.id =  `update-entry--${updateObj.id}`;
        const updateButton = document.createElement("button");
        updateButton.id = `update-entry--${updateObj.id}`;
        updateButton.textContent = "Update Entry"
        updateButton.addEventListener("click", handlers.handleUpdate);
        saveP.appendChild(updateButton);
    
        editDocForm.appendChild(moodP);
        editDocForm.appendChild(moodLabel);
        editDocForm.appendChild(editMood);
        editDocForm.appendChild(saveP);
    
        editFieldset.appendChild(editDocForm);
    
        return editFieldset;
    }
}

export default domManager