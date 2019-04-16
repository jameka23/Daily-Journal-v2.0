(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// this is the api component
const API = {
  getJournalEntries() {
    // returns all the entries as an array of objects
    return fetch("http://localhost:8088/entries").then(response => response.json());
  },

  saveJournalEntry(entry) {
    // saves each entry and store in the api
    return fetch("http://localhost:8088/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    }).then(response => response.json());
  },

  getMoodEntries(mood) {
    // returns an array of objects
    return fetch(`http://localhost:8088/entries?mood=${mood}`).then(response => response.json());
  },

  deleteEntry(entryId) {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
      method: "DELETE"
    }).then(clearElements(mainArticleContainer));
  },

  putEntry(entryId, updateObj) {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(updateObj)
    });
  },

  getEntry(entryId) {
    return fetch(`http://localhost:8088/entries/${entryId}`).then(response => response.json());
  }

};
var _default = API;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventHandler = _interopRequireDefault(require("./eventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import files
const mainDivContainer = document.querySelector("#display--container");
const mainArticleContainer = document.querySelector("#entry--log");
const mainContainerDocFrag = document.createDocumentFragment();

const buildElement = (elemType, elemValue, elemTextContent, elemId) => {};

const domManager = {
  buildFieldsetElement: (elm, elmType, elemAttribute, elemTextContent) => {
    // this will actually make the form's fieldset
    const fieldsetElement = document.createElement("fieldset");
    const labelElement = document.createElement("label");

    switch (elm) {
      case "textarea":
        const textAreaElement = document.createElement("textarea"); // checks to see if the elm is not undefined which means it is textarea

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

      case "select":
        // if elm === select, make that  element adding its attributes + options + append
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

      case "legend":
        const legendElement = document.createElement("legend");
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
        happyRadioButton.addEventListener("click", _eventHandler.default.filterMoodHandler);
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
        sadRadioButton.addEventListener("click", _eventHandler.default.filterMoodHandler);
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
        angryRadioButton.addEventListener("click", _eventHandler.default.filterMoodHandler);
        fieldsetElement.appendChild(angryRadioButton);
        fieldsetElement.appendChild(angryLabel);
        const frustratedLabel = document.createElement("label");
        frustratedLabel.textContent = "Frustrated";
        frustratedLabel.setAttribute("for", "frustratedMood");
        const frustratedRadioButton = document.createElement("input");
        frustratedRadioButton.type = elemAttribute;
        frustratedRadioButton.setAttribute("id", "frustratedMood");
        frustratedRadioButton.setAttribute("value", "frustratedMood");
        frustratedRadioButton.name = "mood";
        frustratedRadioButton.addEventListener("click", _eventHandler.default.filterMoodHandler);
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

    return fieldsetElement;
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
    saveButton.addEventListener("click", _eventHandler.default.saveButtonHandler);
    mainContainerDocFrag.appendChild(saveButton);
    mainArticleContainer.appendChild(br);
    mainFormContainer.appendChild(mainContainerDocFrag);
    mainDivContainer.appendChild(mainFormContainer);
    const hr = document.createElement("hr");
    mainDivContainer.appendChild(hr);
    mainArticleContainer.appendChild(br);
    mainArticleContainer.appendChild(br); // the filter mood container 
    // const mainLegendContainer = document.querySelector("#filter--and-search");

    const filterMoodContainer = document.querySelector("#filter--mood");
    const filterFieldset = domManager.buildFieldsetElement("legend", "filterMood", "radio", "Filter Journal Entries by Mood"); // the search container 

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
    searchInput.addEventListener("keypress", _eventHandler.default.handleSearch);
  },
  clearElements: element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },
  buildEditFormHtml: updateObj => {
    // this function will create the form to edit 
    const editFieldset = document.createElement("fieldset");
    editFieldset.id = `update-entry--${updateObj.id}`;
    const editDocForm = document.createDocumentFragment();
    const editLegend = document.createElement("legend");
    editLegend.textContent = "Update Journal Entry";
    editDocForm.appendChild(editLegend); // editFieldset.appendChild(editLegend);

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
    saveP.id = `update-entry--${updateObj.id}`;
    const updateButton = document.createElement("button");
    updateButton.id = `update-entry--${updateObj.id}`;
    updateButton.textContent = "Update Entry";
    updateButton.addEventListener("click", _eventHandler.default.handleUpdate);
    saveP.appendChild(updateButton);
    editDocForm.appendChild(moodP);
    editDocForm.appendChild(moodLabel);
    editDocForm.appendChild(editMood);
    editDocForm.appendChild(saveP);
    editFieldset.appendChild(editDocForm);
    return editFieldset;
  }
};
var _default = domManager;
exports.default = _default;

},{"./eventHandler":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
const articleDOM = document.querySelector("#entry--log");
const entriesToDom = {
  functionThatRendersData: parsedEntry => {
    console.log(parsedEntry); //an array of objects

    const articleDomFrag = document.createDocumentFragment();
    parsedEntry.forEach(entry => {
      let journalEntryHtml = _entryComponent.default.makeJournalEntryComponent(entry);

      articleDomFrag.appendChild(journalEntryHtml);
      const hr = document.createElement("hr");
      articleDomFrag.appendChild(hr);
    });
    articleDOM.appendChild(articleDomFrag);
  },
  renderSearchData: obj => {
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
};
var _default = entriesToDom;
exports.default = _default;

},{"./entryComponent":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventHandler = _interopRequireDefault(require("./eventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports 
const entryComponenet = {
  makeJournalEntryComponent: entryObj => {
    const entryHtmlComponent = document.createElement("article");
    entryHtmlComponent.id = `entry-log--${entryObj.id}`;
    const h2Tag = document.createElement("h2");
    h2Tag.textContent = `${entryObj.concepts}`;
    entryHtmlComponent.appendChild(h2Tag);
    const dateTag = document.createElement("h4");
    dateTag.textContent = `${entryObj.entry_date}`;
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
    deleteButton.addEventListener("click", _eventHandler.default.handleDelete);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.id = `edit--entry-${entryObj.id}`;
    editButton.addEventListener("click", _eventHandler.default.handleEdit);
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
    };
  }
};
var _default = entryComponenet;
exports.default = _default;

},{"./eventHandler":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _entriesToDom = _interopRequireDefault(require("./entriesToDom"));

var _domManager = _interopRequireDefault(require("./domManager"));

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// call all the imports
// renders functionToDom and searchRender
// all the htm functions
const handlers = {
  saveButtonHandler: () => {
    console.log("save button pressed!"); // save all the input values into a variable so we can pass them to the factory function

    const userEntryDate = document.querySelector("#journalDate").value;
    const userEntry = document.querySelector("#journalEntry").value;
    const userConcept = document.querySelector("#concepts").value;
    const mood = document.querySelector("#mood");
    userMood = mood.options[mood.selectedIndex].value;
    const entry = newJournalEntry(userConcept, userEntry, userEntryDate, userMood);
    console.log(entry); // this function will clear out the dom so that we can 
    // append the new section of journal entries 

    _domManager.default.clearElements(mainArticleContainer); // save the 'entry' to the api, THEN call to GET the entries, THEN append to the DOM


    _data.default.saveJournalEntry(entry).then(_data.default.getJournalEntries).then(_entriesToDom.default.functionThatRendersData);
  },
  filterMoodHandler: () => {
    // this function will produce all the entries w/ the selected mood from the radio buttons
    // console.log(event.target.value);
    switch (true) {
      case event.target.value === "happyMood":
        _domManager.default.clearElements(mainArticleContainer);

        _data.default.getMoodEntries("happy").then(_entriesToDom.default.functionThatRendersData);

        break;

      case event.target.value === "sadMood":
        console.log("what happened");

        _domManager.default.clearElements(mainArticleContainer);

        _data.default.getMoodEntries("sad").then(_entriesToDom.default.functionThatRendersData);

        break;

      case event.target.value === "angryMood":
        _domManager.default.clearElements(mainArticleContainer);

        _data.default.getMoodEntries("angry").then(_entriesToDom.default.functionThatRendersData);

        break;

      default:
        _domManager.default.clearElements(mainArticleContainer);

        _data.default.getMoodEntries("frustrated").then(_entriesToDom.default.functionThatRendersData);

        break;
    }
  },
  handleDelete: () => {
    // this is the delete handler function
    entryId = event.target.parentNode.id.split("--")[1];
    console.log(entryId);

    _data.default.deleteEntry(entryId).then(_data.default.getJournalEntries).then(_entriesToDom.default.functionThatRendersData);
  },
  handleEdit: () => {
    // this function will populate the entry in question 
    entryId = event.target.parentNode.id.split("--")[1];
    console.log(entryId);
    const editFormArticle = document.querySelector(`#entry-log--${entryId}`);
    console.log(editFormArticle); // get that particular object

    _data.default.getEntry(entryId).then(entryToEdit => {
      _domManager.default.clearElements(editFormArticle);

      const editEntry = _domManager.default.buildEditFormHtml(entryToEdit);

      editFormArticle.appendChild(editEntry);
    }); // API.updateEntry(entryId, updatedObj).then(API.getJournalEntries).then(functionThatRendersData);

  },
  handleUpdate: () => {
    // this function will update the information in question
    const entryId = event.target.id.split("--")[1]; // console.log(event.target);

    console.log(entryId);
    const updatedEntry = document.querySelector(`#edit-entry--${entryId}`).value;
    const updatedConcept = document.querySelector(`#edit-concepts--${entryId}`).value;
    const updatedDate = document.querySelector(`#edit-date--${entryId}`).value;
    const updatedMood = document.querySelector(`#edit-mood--${entryId}`);
    const mood = updatedMood.options[updatedMood.selectedIndex].value; // console.log(updatedEntry,updatedConcept, updatedDate, mood);

    let updatedJournalEntry = _entryComponent.default.newJournalEntry(updatedConcept, updatedEntry, updatedDate, mood);

    _domManager.default.clearElements(mainArticleContainer);

    _data.default.putEntry(entryId, updatedJournalEntry).then(_data.default.getJournalEntries).then(_entriesToDom.default.functionThatRendersData);
  },
  handleSearch: () => {
    if (event.charCode === 13) {
      // console.log("something was searched");
      const searchTerm = event.target.value.toString().toLowerCase(); // console.log(searchTerm);

      _domManager.default.clearElements(mainArticleContainer); // mainArticleContainer.innerHTML = ''


      _data.default.getJournalEntries().then(entryArray => {
        entryArray.forEach(journalObj => {
          const journalArrayValues = Object.values(journalObj); // console.log(journalArrayValues);

          const matchSearch = journalArrayValues.find(value => {
            // console.log(typeof(value));
            let lowerCaseValue = value.toString().toLowerCase();
            return lowerCaseValue.includes(searchTerm);
          }); // console.log("what is in the array: ",matchSearch);

          if (matchSearch !== undefined) {
            _entriesToDom.default.renderSearchData(journalObj);
          }
        });
      });
    }
  }
};
var _default = handlers;
exports.default = _default;

},{"./data":1,"./domManager":2,"./entriesToDom":3,"./entryComponent":4}],6:[function(require,module,exports){
"use strict";

var _data = _interopRequireDefault(require("./data"));

var _domManager = _interopRequireDefault(require("./domManager"));

var _entriesToDom = _interopRequireDefault(require("./entriesToDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// step 1. call the function to build the form html
_domManager.default.buildMainHTML(); // step 2. call api object's method getEntries which will then call a function to 
// render that data to the dom 


_data.default.getJournalEntries().then(_entriesToDom.default.functionThatRendersData);

},{"./data":1,"./domManager":2,"./entriesToDom":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNUb0RvbS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50SGFuZGxlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUixFQUFBLGlCQUFpQixHQUFJO0FBQUU7QUFDbkIsV0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUgsR0FKTzs7QUFLUixFQUFBLGdCQUFnQixDQUFFLEtBQUYsRUFBUztBQUFFO0FBQ3ZCLFdBQU8sS0FBSyxDQUFDLCtCQUFELEVBQWlDO0FBQ3pDLE1BQUEsTUFBTSxFQUFFLE1BRGlDO0FBRXpDLE1BQUEsT0FBTyxFQUFDO0FBQ0osd0JBQWdCO0FBRFosT0FGaUM7QUFLekMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTG1DLEtBQWpDLENBQUwsQ0FPTixJQVBNLENBT0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBUFgsQ0FBUDtBQVFILEdBZE87O0FBZVIsRUFBQSxjQUFjLENBQUUsSUFBRixFQUFRO0FBQUU7QUFDcEIsV0FBTyxLQUFLLENBQUUsc0NBQXFDLElBQUssRUFBNUMsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUgsR0FsQk87O0FBbUJSLEVBQUEsV0FBVyxDQUFFLE9BQUYsRUFBVztBQUNsQixXQUFPLEtBQUssQ0FBRSxpQ0FBZ0MsT0FBUSxFQUExQyxFQUE0QztBQUNwRCxNQUFBLE1BQU0s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LEdBQUcsS0FBSyxDQUFDLFFBQU4sR0FBaUIsV0FBakIsRUFBckI7QUFDQSxtQkFBTyxjQUFjLENBQUMsUUFBZixDQUF3QixVQUF4QixDQUFQO0FBQ0gsV0FKbUIsQ0FBcEIsQ0FINkIsQ0FRN0I7O0FBQ0EsY0FBRyxXQUFXLEtBQUssU0FBbkIsRUFBNkI7QUFDekIsa0NBQWEsZ0JBQWIsQ0FBOEIsVUFBOUI7QUFDSDtBQUNKLFNBWkQ7QUFhSCxPQWREO0FBZUg7QUFDSjtBQTNHWSxDQUFqQjtlQThHZSxROzs7Ozs7QUNySGY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBLG9CQUFXLGFBQVgsRyxDQUVBO0FBQ0E7OztBQUNBLGNBQUksaUJBQUosR0FBd0IsSUFBeEIsQ0FBNkIsc0JBQWEsdUJBQTFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gdGhpcyBpcyB0aGUgYXBpIGNvbXBvbmVudFxuXG5jb25zdCBBUEkgPSB7XG4gICAgZ2V0Sm91cm5hbEVudHJpZXMgKCkgeyAvLyByZXR1cm5zIGFsbCB0aGUgZW50cmllcyBhcyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIHNhdmVKb3VybmFsRW50cnkgKGVudHJ5KSB7IC8vIHNhdmVzIGVhY2ggZW50cnkgYW5kIHN0b3JlIGluIHRoZSBhcGlcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIix7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczp7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIGdldE1vb2RFbnRyaWVzIChtb29kKSB7IC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzP21vb2Q9JHttb29kfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIGRlbGV0ZUVudHJ5IChlbnRyeUlkKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvJHtlbnRyeUlkfWAse1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsZWFyRWxlbWVudHMobWFpbkFydGljbGVDb250YWluZXIpKTtcbiAgICB9LFxuICAgIHB1dEVudHJ5IChlbnRyeUlkLCB1cGRhdGVPYmopIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcy8ke2VudHJ5SWR9YCx7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZU9iailcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGdldEVudHJ5IChlbnRyeUlkKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcy8ke2VudHJ5SWR9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiLy8gaW1wb3J0IGZpbGVzXG5pbXBvcnQgaGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCJcblxuY29uc3QgbWFpbkRpdkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheS0tY29udGFpbmVyXCIpO1xuY29uc3QgbWFpbkFydGljbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5LS1sb2dcIik7XG5jb25zdCBtYWluQ29udGFpbmVyRG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuY29uc3QgYnVpbGRFbGVtZW50ID0gKGVsZW1UeXBlLCBlbGVtVmFsdWUsIGVsZW1UZXh0Q29udGVudCwgZWxlbUlkKSA9PiB7XG4gICAgXG59XG5cbmNvbnN0IGRvbU1hbmFnZXIgPSB7XG4gICAgYnVpbGRGaWVsZHNldEVsZW1lbnQ6IChlbG0sIGVsbVR5cGUsIGVsZW1BdHRyaWJ1dGUsIGVsZW1UZXh0Q29udGVudCkgPT4ge1xuICAgICAgICAvLyB0aGlzIHdpbGwgYWN0dWFsbHkgbWFrZSB0aGUgZm9ybSdzIGZpZWxkc2V0XG4gICAgICAgIGNvbnN0IGZpZWxkc2V0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgICAgICAgY29uc3QgbGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoKGVsbSkge1xuICAgICAgICAgICAgY2FzZSBcInRleHRhcmVhXCI6ICBjb25zdCB0ZXh0QXJlYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZWxtIGlzIG5vdCB1bmRlZmluZWQgd2hpY2ggbWVhbnMgaXQgaXMgdGV4dGFyZWFcbiAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGVsZW1BdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICBcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYUVsZW1lbnQubmFtZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgdGV4dEFyZWFFbGVtZW50LmlkID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYUVsZW1lbnQuY29scyA9IFwiMzBcIjtcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYUVsZW1lbnQucm93cyA9IFwiNVwiO1xuICAgICAgICAgICAgICAgIHRleHRBcmVhRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCB0cnVlKTtcbiAgICBcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dEFyZWFFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RcIjogICAgICAgICAvLyBpZiBlbG0gPT09IHNlbGVjdCwgbWFrZSB0aGF0ICBlbGVtZW50IGFkZGluZyBpdHMgYXR0cmlidXRlcyArIG9wdGlvbnMgKyBhcHBlbmRcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGVsZW1BdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50Lm5hbWUgPSBlbGVtQXR0cmlidXRlO1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuaWQgPSBlbGVtQXR0cmlidXRlO1xuICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgICAgIG9wdGlvbjEudmFsdWUgPSBcImhhcHB5XCI7XG4gICAgICAgICAgICAgICAgb3B0aW9uMS50ZXh0Q29udGVudCA9IFwiSGFwcHlcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBvcHRpb24yLnZhbHVlID0gXCJzYWRcIjtcbiAgICAgICAgICAgICAgICBvcHRpb24yLnRleHRDb250ZW50ID0gXCJTYWRcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBvcHRpb24zLnZhbHVlID0gXCJhbmdyeVwiO1xuICAgICAgICAgICAgICAgIG9wdGlvbjMudGV4dENvbnRlbnQgPSBcIkFuZ3J5XCI7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICAgICAgb3B0aW9uNC52YWx1ZSA9IFwiZnJ1c3RyYXRlZFwiO1xuICAgICAgICAgICAgICAgIG9wdGlvbjQudGV4dENvbnRlbnQgPSBcIkZydXN0cmF0ZWRcIjtcbiAgICBcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbjEpO1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uMik7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24zKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbjQpO1xuICAgIFxuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsZWdlbmRcIjogY29uc3QgbGVnZW5kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgICAgICAgICAgICAgbGVnZW5kRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQobGVnZW5kRWxlbWVudCk7XG4gICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFwcHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBoYXBweUxhYmVsLnRleHRDb250ZW50ID0gXCJIYXBweVwiO1xuICAgICAgICAgICAgICAgIGhhcHB5TGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiaGFwcHlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhcHB5UmFkaW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgaGFwcHlSYWRpb0J1dHRvbi50eXBlID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICBoYXBweVJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiaGFwcHlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGhhcHB5UmFkaW9CdXR0b24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJoYXBweU1vb2RcIik7XG4gICAgICAgICAgICAgICAgaGFwcHlSYWRpb0J1dHRvbi5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgICAgICAgICAgaGFwcHlSYWRpb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlcnMuZmlsdGVyTW9vZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChoYXBweVJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGFwcHlMYWJlbCk7XG4gICAgXG4gICAgXG4gICAgICAgICAgICAgICAgY29uc3Qgc2FkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICAgICAgICAgc2FkTGFiZWwudGV4dENvbnRlbnQgPSBcIlNhZFwiO1xuICAgICAgICAgICAgICAgIHNhZExhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcInNhZE1vb2RcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2FkUmFkaW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgc2FkUmFkaW9CdXR0b24udHlwZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgc2FkUmFkaW9CdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzYWRNb29kXCIpO1xuICAgICAgICAgICAgICAgIHNhZFJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwic2FkTW9vZFwiKTtcbiAgICAgICAgICAgICAgICBzYWRSYWRpb0J1dHRvbi5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgICAgICAgICAgc2FkUmFkaW9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLmZpbHRlck1vb2RIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2FkUmFkaW9CdXR0b24pO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChzYWRMYWJlbCk7XG4gICAgXG4gICAgICAgICAgICAgICAgY29uc3QgYW5ncnlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBhbmdyeUxhYmVsLnRleHRDb250ZW50ID0gXCJBbmdyeVwiO1xuICAgICAgICAgICAgICAgIGFuZ3J5TGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiYW5ncnlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ3J5UmFkaW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgYW5ncnlSYWRpb0J1dHRvbi50eXBlID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICBhbmdyeVJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYW5ncnlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGFuZ3J5UmFkaW9CdXR0b24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJhbmdyeU1vb2RcIik7XG4gICAgICAgICAgICAgICAgYW5ncnlSYWRpb0J1dHRvbi5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgICAgICAgICAgYW5ncnlSYWRpb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlcnMuZmlsdGVyTW9vZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChhbmdyeVJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoYW5ncnlMYWJlbCk7XG4gICAgXG4gICAgICAgICAgICAgICAgY29uc3QgZnJ1c3RyYXRlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgICAgICAgIGZydXN0cmF0ZWRMYWJlbC50ZXh0Q29udGVudCA9IFwiRnJ1c3RyYXRlZFwiXG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZExhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImZydXN0cmF0ZWRNb29kXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZydXN0cmF0ZWRSYWRpb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBmcnVzdHJhdGVkUmFkaW9CdXR0b24udHlwZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZFJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZnJ1c3RyYXRlZE1vb2RcIik7XG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZFJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiZnJ1c3RyYXRlZE1vb2RcIik7XG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZFJhZGlvQnV0dG9uLm5hbWUgPSBcIm1vb2RcIjtcbiAgICAgICAgICAgICAgICBmcnVzdHJhdGVkUmFkaW9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLmZpbHRlck1vb2RIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoZnJ1c3RyYXRlZFJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoZnJ1c3RyYXRlZExhYmVsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gaWYgYWxsIGVsc2UgZmFpbHMgdGhhdCBtZWFucyB0aGUgZWxlbWVudCBpcyBhbiBpbnB1dCBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGVsZW1lbnQgKyBhcHBlbmQgdG8gZmllbGRzZXRcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGVsZW1BdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICBcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9IGVsbVR5cGU7XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50Lm5hbWUgPSBlbGVtQXR0cmlidXRlO1xuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5pZCA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIHRydWUpO1xuICAgIFxuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZHNldEVsZW1lbnRcbiAgICB9LFxuICAgIGJ1aWxkTWFpbkhUTUw6ICgpID0+IHtcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIGJ1aWxkIHRoZSBqb3VybmFsIGZvcm0gZm9yIGVudHJ5XG4gICAgICAgIFxuICAgICAgICBjb25zdCBqb3VybmFsSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICBqb3VybmFsSGVhZGVyLnRleHRDb250ZW50ID0gXCJEYWlseUpvdXJuYWxcIjtcbiAgICBcbiAgICAgICAgbWFpbkRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChqb3VybmFsSGVhZGVyKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1haW5Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XG4gICAgICAgIGNvbnN0IGRhdGVGaWVsZHNldCA9IGRvbU1hbmFnZXIuYnVpbGRGaWVsZHNldEVsZW1lbnQodW5kZWZpbmVkLCBcImRhdGVcIiwgXCJqb3VybmFsRGF0ZVwiLCBcIkRhdGUgb2YgRW50cnkgXCIpO1xuICAgICAgICBtYWluQ29udGFpbmVyRG9jRnJhZy5hcHBlbmRDaGlsZChkYXRlRmllbGRzZXQpO1xuICAgIFxuICAgICAgICBjb25zdCBjb25jZXB0RmllbGRzZXQgPSBkb21NYW5hZ2VyLmJ1aWxkRmllbGRzZXRFbGVtZW50KHVuZGVmaW5lZCwgXCJ0ZXh0XCIsIFwiY29uY2VwdHNcIiwgXCJDb25jZXB0cyBjb3ZlcmVkIFwiKTtcbiAgICAgICAgbWFpbkNvbnRhaW5lckRvY0ZyYWcuYXBwZW5kQ2hpbGQoY29uY2VwdEZpZWxkc2V0KTtcbiAgICBcbiAgICAgICAgY29uc3QgZW50cnlGaWVsZHNldCA9IGRvbU1hbmFnZXIuYnVpbGRGaWVsZHNldEVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB1bmRlZmluZWQsIFwiam91cm5hbEVudHJ5XCIsIFwiSm91cm5hbCBFbnRyeSBcIik7XG4gICAgICAgIG1haW5Db250YWluZXJEb2NGcmFnLmFwcGVuZENoaWxkKGVudHJ5RmllbGRzZXQpO1xuICAgIFxuICAgICAgICBjb25zdCBzZWxlY3RGaWVsZHNldCA9IGRvbU1hbmFnZXIuYnVpbGRGaWVsZHNldEVsZW1lbnQoXCJzZWxlY3RcIiwgdW5kZWZpbmVkLCBcIm1vb2RcIiwgXCJNb29kIGZvciB0aGUgZGF5IFwiKTtcbiAgICAgICAgbWFpbkNvbnRhaW5lckRvY0ZyYWcuYXBwZW5kQ2hpbGQoc2VsZWN0RmllbGRzZXQpO1xuICAgIFxuICAgICAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgc2F2ZUJ1dHRvbi5pZCA9IFwic2F2ZS0tYnV0dG9uXCI7XG4gICAgICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmUgSm91cm5hbCBFbnRyeVwiO1xuICAgICAgICBsZXQgYnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLnNhdmVCdXR0b25IYW5kbGVyKTtcbiAgICBcbiAgICAgICAgXG4gICAgICAgIG1haW5Db250YWluZXJEb2NGcmFnLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgICAgICBtYWluQXJ0aWNsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChicik7XG4gICAgXG4gICAgICAgIG1haW5Gb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5Db250YWluZXJEb2NGcmFnKTtcbiAgICAgICAgbWFpbkRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluRm9ybUNvbnRhaW5lcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgbWFpbkRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChocik7XG4gICAgXG4gICAgICAgIG1haW5BcnRpY2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGJyKTtcbiAgICAgICAgbWFpbkFydGljbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYnIpO1xuICAgIFxuICAgIFxuICAgICAgICAvLyB0aGUgZmlsdGVyIG1vb2QgY29udGFpbmVyIFxuICAgIFxuICAgICAgICAvLyBjb25zdCBtYWluTGVnZW5kQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWx0ZXItLWFuZC1zZWFyY2hcIik7XG4gICAgICAgIGNvbnN0IGZpbHRlck1vb2RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpbHRlci0tbW9vZFwiKTtcbiAgICAgICAgY29uc3QgZmlsdGVyRmllbGRzZXQgPSBkb21NYW5hZ2VyLmJ1aWxkRmllbGRzZXRFbGVtZW50KFwibGVnZW5kXCIsIFwiZmlsdGVyTW9vZFwiLCBcInJhZGlvXCIsIFwiRmlsdGVyIEpvdXJuYWwgRW50cmllcyBieSBNb29kXCIpO1xuICAgIFxuICAgICAgICAvLyB0aGUgc2VhcmNoIGNvbnRhaW5lciBcbiAgICAgICAgY29uc3Qgc2VhcmNoRW50cmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoLS1lbnRyaWVzXCIpO1xuICAgICAgICBjb25zdCBzZWFyY2hGaWVsZHNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgICAgICAgY29uc3Qgc2VhcmNoTGVnZW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiKTtcbiAgICAgICAgc2VhcmNoTGVnZW5kLnRleHRDb250ZW50ID0gXCJTZWFyY2ggSm91cm5hbCBFbnRyaWVzXCI7XG4gICAgICAgIHNlYXJjaEZpZWxkc2V0LmFwcGVuZENoaWxkKHNlYXJjaExlZ2VuZCk7XG4gICAgXG4gICAgICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBzZWFyY2hJbnB1dC5zaXplID0gNTA7XG4gICAgICAgIHNlYXJjaElucHV0LnBsYWNlaG9sZGVyID0gXCJFbnRlciBzZWFyY2ggdGVybVwiO1xuICAgICAgICBzZWFyY2hJbnB1dC5pZCA9IFwic2VhcmNoZWQtLWl0ZW1cIjtcbiAgICAgICAgc2VhcmNoRmllbGRzZXQuYXBwZW5kQ2hpbGQoc2VhcmNoSW5wdXQpO1xuICAgICAgICBzZWFyY2hFbnRyaWVzLmFwcGVuZENoaWxkKHNlYXJjaEZpZWxkc2V0KTtcbiAgICAgICAgZmlsdGVyTW9vZENvbnRhaW5lci5hcHBlbmRDaGlsZChmaWx0ZXJGaWVsZHNldCk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBoYW5kbGVycy5oYW5kbGVTZWFyY2gpO1xuICAgIFxuICAgIH0sXG4gICAgY2xlYXJFbGVtZW50czogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgd2hpbGUoZWxlbWVudC5maXJzdENoaWxkKXtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGRFZGl0Rm9ybUh0bWw6ICh1cGRhdGVPYmopID0+IHtcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSB0aGUgZm9ybSB0byBlZGl0IFxuICAgIFxuICAgICAgICBjb25zdCBlZGl0RmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gICAgICAgIGVkaXRGaWVsZHNldC5pZCA9ICBgdXBkYXRlLWVudHJ5LS0ke3VwZGF0ZU9iai5pZH1gO1xuICAgICAgICBjb25zdCBlZGl0RG9jRm9ybSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgZWRpdExlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgICAgIGVkaXRMZWdlbmQudGV4dENvbnRlbnQgPSBcIlVwZGF0ZSBKb3VybmFsIEVudHJ5XCI7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKGVkaXRMZWdlbmQpO1xuICAgICAgICAvLyBlZGl0RmllbGRzZXQuYXBwZW5kQ2hpbGQoZWRpdExlZ2VuZCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGNvbmNlcHRQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IGNvbmNlcHRzTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGNvbmNlcHRzTGFiZWwudGV4dENvbnRlbnQgPSBcIkNvbmNlcHRzOiBcIjtcbiAgICAgICAgY29uc3QgZWRpdENvbmNlcHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBlZGl0Q29uY2VwdHMuaWQgPSBgZWRpdC1jb25jZXB0cy0tJHt1cGRhdGVPYmouaWR9YDtcbiAgICAgICAgZWRpdENvbmNlcHRzLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGAke3VwZGF0ZU9iai5jb25jZXB0c31gKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoY29uY2VwdFApO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChjb25jZXB0c0xhYmVsKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoZWRpdENvbmNlcHRzKTtcbiAgICBcbiAgICAgICAgY29uc3QgZGF0ZVAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSBcIkRhdGU6IFwiO1xuICAgICAgICBjb25zdCBlZGl0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZWRpdERhdGUuaWQgPSBgZWRpdC1kYXRlLS0ke3VwZGF0ZU9iai5pZH1gO1xuICAgICAgICBlZGl0RGF0ZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHt1cGRhdGVPYmouZW50cnlfZGF0ZX1gKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoZGF0ZVApO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChlZGl0RGF0ZSk7XG4gICAgXG4gICAgICAgIGNvbnN0IGVudHJ5UCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb25zdCBlbnRyeUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBlbnRyeUxhYmVsLnRleHRDb250ZW50ID0gXCJFbnRyeTogXCI7XG4gICAgICAgIGNvbnN0IGVkaXRFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZWRpdEVudHJ5LmlkID0gYGVkaXQtZW50cnktLSR7dXBkYXRlT2JqLmlkfWA7XG4gICAgICAgIGVkaXRFbnRyeS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHt1cGRhdGVPYmouZW50cnl9YCk7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKGVudHJ5UCk7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKGVudHJ5TGFiZWwpO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChlZGl0RW50cnkpO1xuICAgIFxuICAgICAgICBjb25zdCBtb29kUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb25zdCBtb29kTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIG1vb2RMYWJlbC50ZXh0Q29udGVudCA9IFwiTW9vZDogXCI7XG4gICAgICAgIGNvbnN0IGVkaXRNb29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgZWRpdE1vb2QuaWQgPSBgZWRpdC1tb29kLS0ke3VwZGF0ZU9iai5pZH1gO1xuICAgICAgICBjb25zdCBvcHRpb24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgb3B0aW9uMS52YWx1ZSA9IFwiaGFwcHlcIjtcbiAgICAgICAgb3B0aW9uMS5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgIG9wdGlvbjEudGV4dENvbnRlbnQgPSBcIkhhcHB5XCI7XG4gICAgICAgIGNvbnN0IG9wdGlvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICBvcHRpb24yLnZhbHVlID0gXCJzYWRcIjtcbiAgICAgICAgb3B0aW9uMi5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgIG9wdGlvbjIudGV4dENvbnRlbnQgPSBcIlNhZFwiO1xuICAgICAgICBjb25zdCBvcHRpb24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgb3B0aW9uMy52YWx1ZSA9IFwiYW5ncnlcIjtcbiAgICAgICAgb3B0aW9uMy5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgIG9wdGlvbjMudGV4dENvbnRlbnQgPSBcIkFuZ3J5XCI7XG4gICAgICAgIGNvbnN0IG9wdGlvbjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICBvcHRpb240LnZhbHVlID0gXCJmcnVzdHJhdGVkXCI7XG4gICAgICAgIG9wdGlvbjQubmFtZSA9IFwibW9vZFwiO1xuICAgICAgICBvcHRpb240LnRleHRDb250ZW50ID0gXCJGcnVzdHJhdGVkXCI7XG4gICAgXG4gICAgICAgIGVkaXRNb29kLmFwcGVuZENoaWxkKG9wdGlvbjEpO1xuICAgICAgICBlZGl0TW9vZC5hcHBlbmRDaGlsZChvcHRpb24yKTtcbiAgICAgICAgZWRpdE1vb2QuYXBwZW5kQ2hpbGQob3B0aW9uMyk7XG4gICAgICAgIGVkaXRNb29kLmFwcGVuZENoaWxkKG9wdGlvbjQpO1xuICAgIFxuICAgICAgICBjb25zdCBzYXZlUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBzYXZlUC5pZCA9ICBgdXBkYXRlLWVudHJ5LS0ke3VwZGF0ZU9iai5pZH1gO1xuICAgICAgICBjb25zdCB1cGRhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICB1cGRhdGVCdXR0b24uaWQgPSBgdXBkYXRlLWVudHJ5LS0ke3VwZGF0ZU9iai5pZH1gO1xuICAgICAgICB1cGRhdGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlVwZGF0ZSBFbnRyeVwiXG4gICAgICAgIHVwZGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlcnMuaGFuZGxlVXBkYXRlKTtcbiAgICAgICAgc2F2ZVAuYXBwZW5kQ2hpbGQodXBkYXRlQnV0dG9uKTtcbiAgICBcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQobW9vZFApO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChtb29kTGFiZWwpO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChlZGl0TW9vZCk7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKHNhdmVQKTtcbiAgICBcbiAgICAgICAgZWRpdEZpZWxkc2V0LmFwcGVuZENoaWxkKGVkaXREb2NGb3JtKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGVkaXRGaWVsZHNldDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbU1hbmFnZXIiLCIvLyBpbXBvcnRzXG5pbXBvcnQgZW50cnlDb21wb25lbnQgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxuXG5cbmNvbnN0IGFydGljbGVET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5LS1sb2dcIilcblxuY29uc3QgZW50cmllc1RvRG9tID0ge1xuICAgIGZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhOiAocGFyc2VkRW50cnkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocGFyc2VkRW50cnkpIC8vYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICBjb25zdCBhcnRpY2xlRG9tRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgXG4gICAgICAgIHBhcnNlZEVudHJ5LmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IGpvdXJuYWxFbnRyeUh0bWwgPSBlbnRyeUNvbXBvbmVudC5tYWtlSm91cm5hbEVudHJ5Q29tcG9uZW50KGVudHJ5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXJ0aWNsZURvbUZyYWcuYXBwZW5kQ2hpbGQoam91cm5hbEVudHJ5SHRtbCk7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIGFydGljbGVEb21GcmFnLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfSlcbiAgICAgICAgYXJ0aWNsZURPTS5hcHBlbmRDaGlsZChhcnRpY2xlRG9tRnJhZyk7XG4gICAgXG4gICAgfSxcbiAgICByZW5kZXJTZWFyY2hEYXRhOiAob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgICAgY29uc3QgcGFyYTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29uc3QgcGFyYTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBcbiAgICAgICAgaGVhZGVyLnRleHRDb250ZW50ID0gb2JqLmNvbmNlcHRzO1xuICAgICAgICBwYXJhMS50ZXh0Q29udGVudCA9IG9iai5lbnRyeTtcbiAgICAgICAgcGFyYTIudGV4dENvbnRlbnQgPSBvYmouZW50cnlfZGF0ZTtcbiAgICBcbiAgICAgICAgbWFpbkFydGljbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgbWFpbkFydGljbGVDb250YWluZXIuYXBwZW5kQ2hpbGQocGFyYTEpO1xuICAgICAgICBtYWluQXJ0aWNsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXJhMik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBlbnRyaWVzVG9Eb207IiwiLy8gaW1wb3J0cyBcbmltcG9ydCBoYW5kbGVycyBmcm9tIFwiLi9ldmVudEhhbmRsZXJcIlxuXG5cbmNvbnN0IGVudHJ5Q29tcG9uZW5ldCA9IHtcbiAgICBtYWtlSm91cm5hbEVudHJ5Q29tcG9uZW50OiAoZW50cnlPYmopID0+IHtcbiAgICAgICAgY29uc3QgZW50cnlIdG1sQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XG4gICAgICAgIGVudHJ5SHRtbENvbXBvbmVudC5pZCA9IGBlbnRyeS1sb2ctLSR7ZW50cnlPYmouaWR9YFxuICAgICAgICBcbiAgICAgICAgY29uc3QgaDJUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICAgIGgyVGFnLnRleHRDb250ZW50ID0gYCR7ZW50cnlPYmouY29uY2VwdHN9YDtcbiAgICAgICAgZW50cnlIdG1sQ29tcG9uZW50LmFwcGVuZENoaWxkKGgyVGFnKTtcbiAgICBcbiAgICAgICAgY29uc3QgZGF0ZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgICAgICAgZGF0ZVRhZy50ZXh0Q29udGVudCA9ICBgJHtlbnRyeU9iai5lbnRyeV9kYXRlfWA7XG4gICAgICAgIGVudHJ5SHRtbENvbXBvbmVudC5hcHBlbmRDaGlsZChkYXRlVGFnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcGFyYUVudHJ5VGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHBhcmFFbnRyeVRhZy50ZXh0Q29udGVudCA9IGAke2VudHJ5T2JqLmVudHJ5fWA7XG4gICAgICAgIGVudHJ5SHRtbENvbXBvbmVudC5hcHBlbmRDaGlsZChwYXJhRW50cnlUYWcpO1xuICAgIFxuICAgICAgICBjb25zdCBwYXJhTW9vZFRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBwYXJhTW9vZFRhZy50ZXh0Q29udGVudCA9IGBNb29kOiAke2VudHJ5T2JqLm1vb2R9YDtcbiAgICAgICAgZW50cnlIdG1sQ29tcG9uZW50LmFwcGVuZENoaWxkKHBhcmFNb29kVGFnKTtcbiAgICBcbiAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICAgICAgZGVsZXRlQnV0dG9uLmlkID0gYGRlbGV0ZS0tZW50cnktJHtlbnRyeU9iai5pZH1gO1xuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLmhhbmRsZURlbGV0ZSk7XG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gICAgICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC0tZW50cnktJHtlbnRyeU9iai5pZH1gO1xuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVycy5oYW5kbGVFZGl0KTtcbiAgICBcbiAgICAgICAgZW50cnlIdG1sQ29tcG9uZW50LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgICAgICBlbnRyeUh0bWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgICBcbiAgICBcbiAgICAgICAgcmV0dXJuIGVudHJ5SHRtbENvbXBvbmVudDtcbiAgICB9LFxuICAgIG5ld0pvdXJuYWxFbnRyeTogKGpvdXJuYWxDb25jZXB0cywgam91cm5hbEVudHJ5LCBqb3VybmFsRGF0ZSwgam91cm5hbE1vb2QpID0+IHtcbiAgICAgICAgLy8gSW52b2tlIHRoZSBmYWN0b3J5IGZ1bmN0aW9uLCBwYXNzaW5nIGFsb25nIHRoZSBmb3JtIGZpZWxkIHZhbHVlc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJlbnRyeV9kYXRlXCI6IGpvdXJuYWxEYXRlLFxuICAgICAgICAgICAgXCJjb25jZXB0c1wiOiBqb3VybmFsQ29uY2VwdHMsXG4gICAgICAgICAgICBcImVudHJ5XCI6IGpvdXJuYWxFbnRyeSxcbiAgICAgICAgICAgIFwibW9vZFwiOiBqb3VybmFsTW9vZFxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBlbnRyeUNvbXBvbmVuZXQiLCIvLyBjYWxsIGFsbCB0aGUgaW1wb3J0c1xuaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcbmltcG9ydCBlbnRyaWVzVG9Eb20gZnJvbSBcIi4vZW50cmllc1RvRG9tXCIgLy8gcmVuZGVycyBmdW5jdGlvblRvRG9tIGFuZCBzZWFyY2hSZW5kZXJcbmltcG9ydCBkb21NYW5hZ2VyIGZyb20gXCIuL2RvbU1hbmFnZXJcIiAgLy8gYWxsIHRoZSBodG0gZnVuY3Rpb25zXG5pbXBvcnQgZW50cnlDb21wb25lbnQgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxuXG5cbmNvbnN0IGhhbmRsZXJzID0ge1xuICAgIHNhdmVCdXR0b25IYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2F2ZSBidXR0b24gcHJlc3NlZCFcIik7XG4gICAgXG4gICAgICAgIC8vIHNhdmUgYWxsIHRoZSBpbnB1dCB2YWx1ZXMgaW50byBhIHZhcmlhYmxlIHNvIHdlIGNhbiBwYXNzIHRoZW0gdG8gdGhlIGZhY3RvcnkgZnVuY3Rpb25cbiAgICAgICAgY29uc3QgdXNlckVudHJ5RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IHVzZXJFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5XCIpLnZhbHVlO1xuICAgICAgICBjb25zdCB1c2VyQ29uY2VwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uY2VwdHNcIikudmFsdWU7XG4gICAgICAgIGNvbnN0IG1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIik7XG4gICAgICAgIHVzZXJNb29kID0gbW9vZC5vcHRpb25zW21vb2Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gbmV3Sm91cm5hbEVudHJ5KHVzZXJDb25jZXB0LCB1c2VyRW50cnksIHVzZXJFbnRyeURhdGUsIHVzZXJNb29kKTtcbiAgICAgICAgY29uc29sZS5sb2coZW50cnkpO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIGNsZWFyIG91dCB0aGUgZG9tIHNvIHRoYXQgd2UgY2FuIFxuICAgICAgICAvLyBhcHBlbmQgdGhlIG5ldyBzZWN0aW9uIG9mIGpvdXJuYWwgZW50cmllcyBcbiAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKG1haW5BcnRpY2xlQ29udGFpbmVyKTtcbiAgICBcbiAgICAgICAgLy8gc2F2ZSB0aGUgJ2VudHJ5JyB0byB0aGUgYXBpLCBUSEVOIGNhbGwgdG8gR0VUIHRoZSBlbnRyaWVzLCBUSEVOIGFwcGVuZCB0byB0aGUgRE9NXG4gICAgICAgIEFQSS5zYXZlSm91cm5hbEVudHJ5KGVudHJ5KS50aGVuKEFQSS5nZXRKb3VybmFsRW50cmllcykudGhlbihlbnRyaWVzVG9Eb20uZnVuY3Rpb25UaGF0UmVuZGVyc0RhdGEpO1xuICAgIH0sXG4gICAgZmlsdGVyTW9vZEhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIHByb2R1Y2UgYWxsIHRoZSBlbnRyaWVzIHcvIHRoZSBzZWxlY3RlZCBtb29kIGZyb20gdGhlIHJhZGlvIGJ1dHRvbnNcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgc3dpdGNoKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gXCJoYXBweU1vb2RcIik6XG4gICAgICAgICAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKG1haW5BcnRpY2xlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBBUEkuZ2V0TW9vZEVudHJpZXMoXCJoYXBweVwiKS50aGVuKGVudHJpZXNUb0RvbS5mdW5jdGlvblRoYXRSZW5kZXJzRGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIChldmVudC50YXJnZXQudmFsdWUgPT09IFwic2FkTW9vZFwiKTpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndoYXQgaGFwcGVuZWRcIikgXG4gICAgICAgICAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKG1haW5BcnRpY2xlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBBUEkuZ2V0TW9vZEVudHJpZXMoXCJzYWRcIikudGhlbihlbnRyaWVzVG9Eb20uZnVuY3Rpb25UaGF0UmVuZGVyc0RhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcImFuZ3J5TW9vZFwiKTogXG4gICAgICAgICAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKG1haW5BcnRpY2xlQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBBUEkuZ2V0TW9vZEVudHJpZXMoXCJhbmdyeVwiKS50aGVuKGVudHJpZXNUb0RvbS5mdW5jdGlvblRoYXRSZW5kZXJzRGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhtYWluQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgQVBJLmdldE1vb2RFbnRyaWVzKFwiZnJ1c3RyYXRlZFwiKS50aGVuKGVudHJpZXNUb0RvbS5mdW5jdGlvblRoYXRSZW5kZXJzRGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZURlbGV0ZTogKCkgPT4ge1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSBkZWxldGUgaGFuZGxlciBmdW5jdGlvblxuICAgICAgICBlbnRyeUlkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWQuc3BsaXQoXCItLVwiKVsxXTtcbiAgICAgICAgY29uc29sZS5sb2coZW50cnlJZCk7XG4gICAgXG4gICAgICAgIEFQSS5kZWxldGVFbnRyeShlbnRyeUlkKS50aGVuKEFQSS5nZXRKb3VybmFsRW50cmllcykudGhlbihlbnRyaWVzVG9Eb20uZnVuY3Rpb25UaGF0UmVuZGVyc0RhdGEpO1xuICAgIH0sXG4gICAgaGFuZGxlRWRpdDogKCkgPT4ge1xuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgcG9wdWxhdGUgdGhlIGVudHJ5IGluIHF1ZXN0aW9uIFxuICAgICAgICBlbnRyeUlkID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWQuc3BsaXQoXCItLVwiKVsxXTtcbiAgICAgICAgY29uc29sZS5sb2coZW50cnlJZCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRGb3JtQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlbnRyeS1sb2ctLSR7ZW50cnlJZH1gKTtcbiAgICAgICAgY29uc29sZS5sb2coZWRpdEZvcm1BcnRpY2xlKTtcbiAgICAgICAgLy8gZ2V0IHRoYXQgcGFydGljdWxhciBvYmplY3RcbiAgICAgICAgQVBJLmdldEVudHJ5KGVudHJ5SWQpLnRoZW4oZW50cnlUb0VkaXQgPT4ge1xuICAgICAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKGVkaXRGb3JtQXJ0aWNsZSk7XG4gICAgICAgICAgICBjb25zdCBlZGl0RW50cnkgPSBkb21NYW5hZ2VyLmJ1aWxkRWRpdEZvcm1IdG1sKGVudHJ5VG9FZGl0KTtcbiAgICAgICAgICAgIGVkaXRGb3JtQXJ0aWNsZS5hcHBlbmRDaGlsZChlZGl0RW50cnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQVBJLnVwZGF0ZUVudHJ5KGVudHJ5SWQsIHVwZGF0ZWRPYmopLnRoZW4oQVBJLmdldEpvdXJuYWxFbnRyaWVzKS50aGVuKGZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhKTtcbiAgICB9LFxuICAgIGhhbmRsZVVwZGF0ZTogKCkgPT4ge1xuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgdXBkYXRlIHRoZSBpbmZvcm1hdGlvbiBpbiBxdWVzdGlvblxuICAgICAgICBjb25zdCBlbnRyeUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5SWQpO1xuICAgIFxuICAgICAgICBjb25zdCB1cGRhdGVkRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdC1lbnRyeS0tJHtlbnRyeUlkfWApLnZhbHVlO1xuICAgICAgICBjb25zdCB1cGRhdGVkQ29uY2VwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0LWNvbmNlcHRzLS0ke2VudHJ5SWR9YCkudmFsdWU7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXQtZGF0ZS0tJHtlbnRyeUlkfWApLnZhbHVlO1xuICAgICAgICBjb25zdCB1cGRhdGVkTW9vZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0LW1vb2QtLSR7ZW50cnlJZH1gKTtcbiAgICAgICAgY29uc3QgbW9vZCA9IHVwZGF0ZWRNb29kLm9wdGlvbnNbdXBkYXRlZE1vb2Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVwZGF0ZWRFbnRyeSx1cGRhdGVkQ29uY2VwdCwgdXBkYXRlZERhdGUsIG1vb2QpO1xuICAgIFxuICAgICAgICBsZXQgdXBkYXRlZEpvdXJuYWxFbnRyeSA9IGVudHJ5Q29tcG9uZW50Lm5ld0pvdXJuYWxFbnRyeSh1cGRhdGVkQ29uY2VwdCx1cGRhdGVkRW50cnksdXBkYXRlZERhdGUsIG1vb2QpO1xuICAgIFxuICAgICAgICBkb21NYW5hZ2VyLmNsZWFyRWxlbWVudHMobWFpbkFydGljbGVDb250YWluZXIpO1xuICAgICAgICBBUEkucHV0RW50cnkoZW50cnlJZCwgdXBkYXRlZEpvdXJuYWxFbnRyeSkudGhlbihBUEkuZ2V0Sm91cm5hbEVudHJpZXMpLnRoZW4oZW50cmllc1RvRG9tLmZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhKTtcbiAgICB9LFxuICAgIGhhbmRsZVNlYXJjaDogKCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuY2hhckNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvbWV0aGluZyB3YXMgc2VhcmNoZWRcIik7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKG1haW5BcnRpY2xlQ29udGFpbmVyKTtcbiAgICAgICAgICAgIC8vIG1haW5BcnRpY2xlQ29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKGVudHJ5QXJyYXkgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJ5QXJyYXkuZm9yRWFjaChqb3VybmFsT2JqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgam91cm5hbEFycmF5VmFsdWVzID0gT2JqZWN0LnZhbHVlcyhqb3VybmFsT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coam91cm5hbEFycmF5VmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hTZWFyY2ggPSBqb3VybmFsQXJyYXlWYWx1ZXMuZmluZCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb3dlckNhc2VWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb3dlckNhc2VWYWx1ZS5pbmNsdWRlcyhzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ3aGF0IGlzIGluIHRoZSBhcnJheTogXCIsbWF0Y2hTZWFyY2gpO1xuICAgICAgICAgICAgICAgICAgICBpZihtYXRjaFNlYXJjaCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNUb0RvbS5yZW5kZXJTZWFyY2hEYXRhKGpvdXJuYWxPYmopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzXG4iLCJpbXBvcnQgQVBJIGZyb20gXCIuL2RhdGFcIlxuaW1wb3J0IGRvbU1hbmFnZXIgZnJvbSBcIi4vZG9tTWFuYWdlclwiXG5pbXBvcnQgZW50cmllc1RvRG9tIGZyb20gXCIuL2VudHJpZXNUb0RvbVwiXG5cbi8vIHN0ZXAgMS4gY2FsbCB0aGUgZnVuY3Rpb24gdG8gYnVpbGQgdGhlIGZvcm0gaHRtbFxuZG9tTWFuYWdlci5idWlsZE1haW5IVE1MKCk7XG5cbi8vIHN0ZXAgMi4gY2FsbCBhcGkgb2JqZWN0J3MgbWV0aG9kIGdldEVudHJpZXMgd2hpY2ggd2lsbCB0aGVuIGNhbGwgYSBmdW5jdGlvbiB0byBcbi8vIHJlbmRlciB0aGF0IGRhdGEgdG8gdGhlIGRvbSBcbkFQSS5nZXRKb3VybmFsRW50cmllcygpLnRoZW4oZW50cmllc1RvRG9tLmZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhKTtcblxuIl19
