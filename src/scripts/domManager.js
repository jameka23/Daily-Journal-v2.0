const mainDivContainer = document.querySelector("#display--container");
const mainArticleContainer = document.querySelector("#entry--log");
const mainContainerDocFrag = document.createDocumentFragment();

const buildFieldsetElement = (elm, elmType, elemAttribute, elemTextContent) => {
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
            fieldsetElement.appendChild(happyRadioButton);
            fieldsetElement.appendChild(happyLabel);


            const sadLabel = document.createElement("label");
            sadLabel.textContent = "Sad";
            sadLabel.setAttribute("for", "sadMood");
            const sadRadioButton = document.createElement("input");
            sadRadioButton.type = elemAttribute;
            sadRadioButton.setAttribute("id", "sadMood");
            fieldsetElement.appendChild(sadRadioButton);
            fieldsetElement.appendChild(sadLabel);

            const angryLabel = document.createElement("label");
            angryLabel.textContent = "Angry";
            angryLabel.setAttribute("for", "angryMood");
            const angryRadioButton = document.createElement("input");
            angryRadioButton.type = elemAttribute;
            angryRadioButton.setAttribute("id", "angryMood");
            fieldsetElement.appendChild(angryRadioButton);
            fieldsetElement.appendChild(angryLabel);

            const frustratedLabel = document.createElement("label");
            frustratedLabel.textContent = "Frustrated"
            frustratedLabel.setAttribute("for", "frustratedMood");
            const frustratedRadioButton = document.createElement("input");
            frustratedRadioButton.type = elemAttribute;
            frustratedRadioButton.setAttribute("id", "frustratedMood");
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
}


const buildMainHTML = () => {
    // this function will build the journal form for entry
    const journalHeader = document.createElement("h1");
    journalHeader.textContent = "DailyJournal";

    mainDivContainer.appendChild(journalHeader);
    
    const mainFormContainer = document.createElement("article");
    const dateFieldset = buildFieldsetElement(undefined, "date", "journalDate", "Date of Entry ");
    mainContainerDocFrag.appendChild(dateFieldset);

    const conceptFieldset = buildFieldsetElement(undefined, "text", "concepts", "Concepts covered ");
    mainContainerDocFrag.appendChild(conceptFieldset);

    const entryFieldset = buildFieldsetElement("textarea", undefined, "journalEntry", "Journal Entry ");
    mainContainerDocFrag.appendChild(entryFieldset);

    const selectFieldset = buildFieldsetElement("select", undefined, "mood", "Mood for the day ");
    mainContainerDocFrag.appendChild(selectFieldset);

    const saveButton = document.createElement("button");
    saveButton.id = "save--button";
    saveButton.textContent = "Save Journal Entry";
    
    mainContainerDocFrag.appendChild(saveButton);

    mainFormContainer.appendChild(mainContainerDocFrag);
    mainDivContainer.appendChild(mainFormContainer);
    
    const hr = document.createElement("hr");
    mainDivContainer.appendChild(hr);

    const filterMoodContainer = document.querySelector("#filter--mood");
    const filterFieldset = buildFieldsetElement("legend", "filterMood", "radio", "Filter Journal Entries by Mood");
    filterMoodContainer.appendChild(filterFieldset);

}


