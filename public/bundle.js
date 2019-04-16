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
        happyRadioEvent.addEventListener("click", _eventHandler.default.filterMoodHandler);
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
        sadRadioEvent.addEventListener("click", _eventHandler.default.filterMoodHandler);
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
        angryRadioEvent.addEventListener("click", _eventHandler.default.filterMoodHandler);
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
        frustratedRadioEvent.addEventListener("click", _eventHandler.default.filterMoodHandler);
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
    const filterFieldset = buildFieldsetElement("legend", "filterMood", "radio", "Filter Journal Entries by Mood"); // the search container 

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2RvbU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNUb0RvbS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50SGFuZGxlci5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUixFQUFBLGlCQUFpQixHQUFJO0FBQUU7QUFDbkIsV0FBTyxLQUFLLENBQUMsK0JBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUgsR0FKTzs7QUFLUixFQUFBLGdCQUFnQixDQUFFLEtBQUYsRUFBUztBQUFFO0FBQ3ZCLFdBQU8sS0FBSyxDQUFDLCtCQUFELEVBQWlDO0FBQ3pDLE1BQUEsTUFBTSxFQUFFLE1BRGlDO0FBRXpDLE1BQUEsT0FBTyxFQUFDO0FBQ0osd0JBQWdCO0FBRFosT0FGaUM7QUFLekMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTG1DLEtBQWpDLENBQUwsQ0FPTixJQVBNLENBT0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBUFgsQ0FBUDtBQVFILEdBZE87O0FBZVIsRUFBQSxjQUFjLENBQUUsSUFBRixFQUFRO0FBQUU7QUFDcEIsV0FBTyxLQUFLLENBQUUsc0NBQXFDLElBQUssRUFBNUMsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUgsR0FsQk87O0FBbUJSLEVBQUEsV0FBVyxDQUFFLE9BQUYsRUFBVztBQUNsQixXQUFPLEtBQUssQ0FBRSxpQ0FBZ0MsT0FBUSxFQUExQyxFQUE0QztBQUNwRCxNQUFBLE1BQU0s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QixVQUF4QixDQUFQO0FBQ0gsV0FKbUIsQ0FBcEIsQ0FINkIsQ0FRN0I7O0FBQ0EsY0FBRyxXQUFXLEtBQUssU0FBbkIsRUFBNkI7QUFDekIsa0NBQWEsZ0JBQWIsQ0FBOEIsVUFBOUI7QUFDSDtBQUNKLFNBWkQ7QUFhSCxPQWREO0FBZUg7QUFDSjtBQTNHWSxDQUFqQjtlQThHZSxROzs7Ozs7QUNySGY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBLG9CQUFXLGFBQVgsRyxDQUVBO0FBQ0E7OztBQUNBLGNBQUksaUJBQUosR0FBd0IsSUFBeEIsQ0FBNkIsc0JBQWEsdUJBQTFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gdGhpcyBpcyB0aGUgYXBpIGNvbXBvbmVudFxuXG5jb25zdCBBUEkgPSB7XG4gICAgZ2V0Sm91cm5hbEVudHJpZXMgKCkgeyAvLyByZXR1cm5zIGFsbCB0aGUgZW50cmllcyBhcyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIHNhdmVKb3VybmFsRW50cnkgKGVudHJ5KSB7IC8vIHNhdmVzIGVhY2ggZW50cnkgYW5kIHN0b3JlIGluIHRoZSBhcGlcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIix7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczp7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIGdldE1vb2RFbnRyaWVzIChtb29kKSB7IC8vIHJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzP21vb2Q9JHttb29kfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIGRlbGV0ZUVudHJ5IChlbnRyeUlkKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvJHtlbnRyeUlkfWAse1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNsZWFyRWxlbWVudHMobWFpbkFydGljbGVDb250YWluZXIpKTtcbiAgICB9LFxuICAgIHB1dEVudHJ5IChlbnRyeUlkLCB1cGRhdGVPYmopIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcy8ke2VudHJ5SWR9YCx7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZU9iailcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGdldEVudHJ5IChlbnRyeUlkKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcy8ke2VudHJ5SWR9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiLy8gaW1wb3J0IGZpbGVzXG5pbXBvcnQgaGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCJcblxuY29uc3QgbWFpbkRpdkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheS0tY29udGFpbmVyXCIpO1xuY29uc3QgbWFpbkFydGljbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5LS1sb2dcIik7XG5jb25zdCBtYWluQ29udGFpbmVyRG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuY29uc3QgYnVpbGRFbGVtZW50ID0gKGVsZW1UeXBlLCBlbGVtVmFsdWUsIGVsZW1UZXh0Q29udGVudCwgZWxlbUlkKSA9PiB7XG4gICAgXG59XG5cbmNvbnN0IGRvbU1hbmFnZXIgPSB7XG4gICAgYnVpbGRGaWVsZHNldEVsZW1lbnQ6IChlbG0sIGVsbVR5cGUsIGVsZW1BdHRyaWJ1dGUsIGVsZW1UZXh0Q29udGVudCkgPT4ge1xuICAgICAgICAvLyB0aGlzIHdpbGwgYWN0dWFsbHkgbWFrZSB0aGUgZm9ybSdzIGZpZWxkc2V0XG4gICAgICAgIGNvbnN0IGZpZWxkc2V0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgICAgICAgY29uc3QgbGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoKGVsbSkge1xuICAgICAgICAgICAgY2FzZSBcInRleHRhcmVhXCI6ICBjb25zdCB0ZXh0QXJlYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZWxtIGlzIG5vdCB1bmRlZmluZWQgd2hpY2ggbWVhbnMgaXQgaXMgdGV4dGFyZWFcbiAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGVsZW1BdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICBcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYUVsZW1lbnQubmFtZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgdGV4dEFyZWFFbGVtZW50LmlkID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYUVsZW1lbnQuY29scyA9IFwiMzBcIjtcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYUVsZW1lbnQucm93cyA9IFwiNVwiO1xuICAgICAgICAgICAgICAgIHRleHRBcmVhRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCB0cnVlKTtcbiAgICBcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dEFyZWFFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RcIjogICAgICAgICAvLyBpZiBlbG0gPT09IHNlbGVjdCwgbWFrZSB0aGF0ICBlbGVtZW50IGFkZGluZyBpdHMgYXR0cmlidXRlcyArIG9wdGlvbnMgKyBhcHBlbmRcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgICAgICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGVsZW1BdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50Lm5hbWUgPSBlbGVtQXR0cmlidXRlO1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuaWQgPSBlbGVtQXR0cmlidXRlO1xuICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgICAgIG9wdGlvbjEudmFsdWUgPSBcImhhcHB5XCI7XG4gICAgICAgICAgICAgICAgb3B0aW9uMS50ZXh0Q29udGVudCA9IFwiSGFwcHlcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBvcHRpb24yLnZhbHVlID0gXCJzYWRcIjtcbiAgICAgICAgICAgICAgICBvcHRpb24yLnRleHRDb250ZW50ID0gXCJTYWRcIjtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBvcHRpb24zLnZhbHVlID0gXCJhbmdyeVwiO1xuICAgICAgICAgICAgICAgIG9wdGlvbjMudGV4dENvbnRlbnQgPSBcIkFuZ3J5XCI7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICAgICAgb3B0aW9uNC52YWx1ZSA9IFwiZnJ1c3RyYXRlZFwiO1xuICAgICAgICAgICAgICAgIG9wdGlvbjQudGV4dENvbnRlbnQgPSBcIkZydXN0cmF0ZWRcIjtcbiAgICBcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbjEpO1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uMik7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24zKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbjQpO1xuICAgIFxuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsZWdlbmRcIjogY29uc3QgbGVnZW5kRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgICAgICAgICAgICAgbGVnZW5kRWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1UZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQobGVnZW5kRWxlbWVudCk7XG4gICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFwcHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBoYXBweUxhYmVsLnRleHRDb250ZW50ID0gXCJIYXBweVwiO1xuICAgICAgICAgICAgICAgIGhhcHB5TGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwiaGFwcHlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhcHB5UmFkaW9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgaGFwcHlSYWRpb0J1dHRvbi50eXBlID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICBoYXBweVJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiaGFwcHlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGhhcHB5UmFkaW9CdXR0b24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJoYXBweU1vb2RcIik7XG4gICAgICAgICAgICAgICAgaGFwcHlSYWRpb0J1dHRvbi5uYW1lID0gXCJtb29kXCI7XG4gICAgICAgICAgICAgICAgaGFwcHlSYWRpb0V2ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVycy5maWx0ZXJNb29kSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZmllbGRzZXRFbGVtZW50LmFwcGVuZENoaWxkKGhhcHB5UmFkaW9CdXR0b24pO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChoYXBweUxhYmVsKTtcbiAgICBcbiAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBzYWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBzYWRMYWJlbC50ZXh0Q29udGVudCA9IFwiU2FkXCI7XG4gICAgICAgICAgICAgICAgc2FkTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwic2FkTW9vZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzYWRSYWRpb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBzYWRSYWRpb0J1dHRvbi50eXBlID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICBzYWRSYWRpb0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNhZE1vb2RcIik7XG4gICAgICAgICAgICAgICAgc2FkUmFkaW9CdXR0b24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJzYWRNb29kXCIpO1xuICAgICAgICAgICAgICAgIHNhZFJhZGlvQnV0dG9uLm5hbWUgPSBcIm1vb2RcIjtcbiAgICAgICAgICAgICAgICBzYWRSYWRpb0V2ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVycy5maWx0ZXJNb29kSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZmllbGRzZXRFbGVtZW50LmFwcGVuZENoaWxkKHNhZFJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2FkTGFiZWwpO1xuICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ3J5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICAgICAgICAgYW5ncnlMYWJlbC50ZXh0Q29udGVudCA9IFwiQW5ncnlcIjtcbiAgICAgICAgICAgICAgICBhbmdyeUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImFuZ3J5TW9vZFwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbmdyeVJhZGlvQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgIGFuZ3J5UmFkaW9CdXR0b24udHlwZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgYW5ncnlSYWRpb0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFuZ3J5TW9vZFwiKTtcbiAgICAgICAgICAgICAgICBhbmdyeVJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiYW5ncnlNb29kXCIpO1xuICAgICAgICAgICAgICAgIGFuZ3J5UmFkaW9CdXR0b24ubmFtZSA9IFwibW9vZFwiO1xuICAgICAgICAgICAgICAgIGFuZ3J5UmFkaW9FdmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlcnMuZmlsdGVyTW9vZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChhbmdyeVJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgICAgICBmaWVsZHNldEVsZW1lbnQuYXBwZW5kQ2hpbGQoYW5ncnlMYWJlbCk7XG4gICAgXG4gICAgICAgICAgICAgICAgY29uc3QgZnJ1c3RyYXRlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgICAgICAgIGZydXN0cmF0ZWRMYWJlbC50ZXh0Q29udGVudCA9IFwiRnJ1c3RyYXRlZFwiXG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZExhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImZydXN0cmF0ZWRNb29kXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZydXN0cmF0ZWRSYWRpb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBmcnVzdHJhdGVkUmFkaW9CdXR0b24udHlwZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZFJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZnJ1c3RyYXRlZE1vb2RcIik7XG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZFJhZGlvQnV0dG9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiZnJ1c3RyYXRlZE1vb2RcIik7XG4gICAgICAgICAgICAgICAgZnJ1c3RyYXRlZFJhZGlvQnV0dG9uLm5hbWUgPSBcIm1vb2RcIjtcbiAgICAgICAgICAgICAgICBmcnVzdHJhdGVkUmFkaW9FdmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlcnMuZmlsdGVyTW9vZEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChmcnVzdHJhdGVkUmFkaW9CdXR0b24pO1xuICAgICAgICAgICAgICAgIGZpZWxkc2V0RWxlbWVudC5hcHBlbmRDaGlsZChmcnVzdHJhdGVkTGFiZWwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBpZiBhbGwgZWxzZSBmYWlscyB0aGF0IG1lYW5zIHRoZSBlbGVtZW50IGlzIGFuIGlucHV0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgZWxlbWVudCArIGFwcGVuZCB0byBmaWVsZHNldFxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgZWxlbUF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgbGFiZWxFbGVtZW50LnRleHRDb250ZW50ID0gZWxlbVRleHRDb250ZW50O1xuICAgIFxuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC50eXBlID0gZWxtVHlwZTtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQubmFtZSA9IGVsZW1BdHRyaWJ1dGU7XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LmlkID0gZWxlbUF0dHJpYnV0ZTtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgdHJ1ZSk7XG4gICAgXG4gICAgICAgICAgICAgICAgZmllbGRzZXRFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZmllbGRzZXRFbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkc2V0RWxlbWVudFxuICAgIH0sXG4gICAgYnVpbGRNYWluSFRNTDogKCkgPT4ge1xuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgYnVpbGQgdGhlIGpvdXJuYWwgZm9ybSBmb3IgZW50cnlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGpvdXJuYWxIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgICAgIGpvdXJuYWxIZWFkZXIudGV4dENvbnRlbnQgPSBcIkRhaWx5Sm91cm5hbFwiO1xuICAgIFxuICAgICAgICBtYWluRGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKGpvdXJuYWxIZWFkZXIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbWFpbkZvcm1Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcbiAgICAgICAgY29uc3QgZGF0ZUZpZWxkc2V0ID0gYnVpbGRGaWVsZHNldEVsZW1lbnQodW5kZWZpbmVkLCBcImRhdGVcIiwgXCJqb3VybmFsRGF0ZVwiLCBcIkRhdGUgb2YgRW50cnkgXCIpO1xuICAgICAgICBtYWluQ29udGFpbmVyRG9jRnJhZy5hcHBlbmRDaGlsZChkYXRlRmllbGRzZXQpO1xuICAgIFxuICAgICAgICBjb25zdCBjb25jZXB0RmllbGRzZXQgPSBidWlsZEZpZWxkc2V0RWxlbWVudCh1bmRlZmluZWQsIFwidGV4dFwiLCBcImNvbmNlcHRzXCIsIFwiQ29uY2VwdHMgY292ZXJlZCBcIik7XG4gICAgICAgIG1haW5Db250YWluZXJEb2NGcmFnLmFwcGVuZENoaWxkKGNvbmNlcHRGaWVsZHNldCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGVudHJ5RmllbGRzZXQgPSBidWlsZEZpZWxkc2V0RWxlbWVudChcInRleHRhcmVhXCIsIHVuZGVmaW5lZCwgXCJqb3VybmFsRW50cnlcIiwgXCJKb3VybmFsIEVudHJ5IFwiKTtcbiAgICAgICAgbWFpbkNvbnRhaW5lckRvY0ZyYWcuYXBwZW5kQ2hpbGQoZW50cnlGaWVsZHNldCk7XG4gICAgXG4gICAgICAgIGNvbnN0IHNlbGVjdEZpZWxkc2V0ID0gYnVpbGRGaWVsZHNldEVsZW1lbnQoXCJzZWxlY3RcIiwgdW5kZWZpbmVkLCBcIm1vb2RcIiwgXCJNb29kIGZvciB0aGUgZGF5IFwiKTtcbiAgICAgICAgbWFpbkNvbnRhaW5lckRvY0ZyYWcuYXBwZW5kQ2hpbGQoc2VsZWN0RmllbGRzZXQpO1xuICAgIFxuICAgICAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgc2F2ZUJ1dHRvbi5pZCA9IFwic2F2ZS0tYnV0dG9uXCI7XG4gICAgICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmUgSm91cm5hbCBFbnRyeVwiO1xuICAgICAgICBsZXQgYnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIik7XG4gICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLnNhdmVCdXR0b25IYW5kbGVyKTtcbiAgICBcbiAgICAgICAgXG4gICAgICAgIG1haW5Db250YWluZXJEb2NGcmFnLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuICAgICAgICBtYWluQXJ0aWNsZUNvbnRhaW5lci5hcHBlbmRDaGlsZChicik7XG4gICAgXG4gICAgICAgIG1haW5Gb3JtQ29udGFpbmVyLmFwcGVuZENoaWxkKG1haW5Db250YWluZXJEb2NGcmFnKTtcbiAgICAgICAgbWFpbkRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluRm9ybUNvbnRhaW5lcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgbWFpbkRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChocik7XG4gICAgXG4gICAgICAgIG1haW5BcnRpY2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGJyKTtcbiAgICAgICAgbWFpbkFydGljbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoYnIpO1xuICAgIFxuICAgIFxuICAgICAgICAvLyB0aGUgZmlsdGVyIG1vb2QgY29udGFpbmVyIFxuICAgIFxuICAgICAgICAvLyBjb25zdCBtYWluTGVnZW5kQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWx0ZXItLWFuZC1zZWFyY2hcIik7XG4gICAgICAgIGNvbnN0IGZpbHRlck1vb2RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZpbHRlci0tbW9vZFwiKTtcbiAgICAgICAgY29uc3QgZmlsdGVyRmllbGRzZXQgPSBidWlsZEZpZWxkc2V0RWxlbWVudChcImxlZ2VuZFwiLCBcImZpbHRlck1vb2RcIiwgXCJyYWRpb1wiLCBcIkZpbHRlciBKb3VybmFsIEVudHJpZXMgYnkgTW9vZFwiKTtcbiAgICBcbiAgICAgICAgLy8gdGhlIHNlYXJjaCBjb250YWluZXIgXG4gICAgICAgIGNvbnN0IHNlYXJjaEVudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC0tZW50cmllc1wiKTtcbiAgICAgICAgY29uc3Qgc2VhcmNoRmllbGRzZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gICAgICAgIGNvbnN0IHNlYXJjaExlZ2VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIik7XG4gICAgICAgIHNlYXJjaExlZ2VuZC50ZXh0Q29udGVudCA9IFwiU2VhcmNoIEpvdXJuYWwgRW50cmllc1wiO1xuICAgICAgICBzZWFyY2hGaWVsZHNldC5hcHBlbmRDaGlsZChzZWFyY2hMZWdlbmQpO1xuICAgIFxuICAgICAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgc2VhcmNoSW5wdXQuc2l6ZSA9IDUwO1xuICAgICAgICBzZWFyY2hJbnB1dC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgc2VhcmNoIHRlcm1cIjtcbiAgICAgICAgc2VhcmNoSW5wdXQuaWQgPSBcInNlYXJjaGVkLS1pdGVtXCI7XG4gICAgICAgIHNlYXJjaEZpZWxkc2V0LmFwcGVuZENoaWxkKHNlYXJjaElucHV0KTtcbiAgICAgICAgc2VhcmNoRW50cmllcy5hcHBlbmRDaGlsZChzZWFyY2hGaWVsZHNldCk7XG4gICAgICAgIGZpbHRlck1vb2RDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsdGVyRmllbGRzZXQpO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgaGFuZGxlcnMuaGFuZGxlU2VhcmNoKTtcbiAgICBcbiAgICB9LFxuICAgIGNsZWFyRWxlbWVudHM6IChlbGVtZW50KSA9PiB7XG4gICAgICAgIHdoaWxlKGVsZW1lbnQuZmlyc3RDaGlsZCl7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkRWRpdEZvcm1IdG1sOiAodXBkYXRlT2JqKSA9PiB7XG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gd2lsbCBjcmVhdGUgdGhlIGZvcm0gdG8gZWRpdCBcbiAgICBcbiAgICAgICAgY29uc3QgZWRpdEZpZWxkc2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuICAgICAgICBlZGl0RmllbGRzZXQuaWQgPSAgYHVwZGF0ZS1lbnRyeS0tJHt1cGRhdGVPYmouaWR9YDtcbiAgICAgICAgY29uc3QgZWRpdERvY0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IGVkaXRMZWdlbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGVnZW5kXCIpO1xuICAgICAgICBlZGl0TGVnZW5kLnRleHRDb250ZW50ID0gXCJVcGRhdGUgSm91cm5hbCBFbnRyeVwiO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChlZGl0TGVnZW5kKTtcbiAgICAgICAgLy8gZWRpdEZpZWxkc2V0LmFwcGVuZENoaWxkKGVkaXRMZWdlbmQpO1xuICAgIFxuICAgICAgICBjb25zdCBjb25jZXB0UCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb25zdCBjb25jZXB0c0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBjb25jZXB0c0xhYmVsLnRleHRDb250ZW50ID0gXCJDb25jZXB0czogXCI7XG4gICAgICAgIGNvbnN0IGVkaXRDb25jZXB0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZWRpdENvbmNlcHRzLmlkID0gYGVkaXQtY29uY2VwdHMtLSR7dXBkYXRlT2JqLmlkfWA7XG4gICAgICAgIGVkaXRDb25jZXB0cy5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBgJHt1cGRhdGVPYmouY29uY2VwdHN9YCk7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKGNvbmNlcHRQKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoY29uY2VwdHNMYWJlbCk7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKGVkaXRDb25jZXB0cyk7XG4gICAgXG4gICAgICAgIGNvbnN0IGRhdGVQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gXCJEYXRlOiBcIjtcbiAgICAgICAgY29uc3QgZWRpdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGVkaXREYXRlLmlkID0gYGVkaXQtZGF0ZS0tJHt1cGRhdGVPYmouaWR9YDtcbiAgICAgICAgZWRpdERhdGUuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYCR7dXBkYXRlT2JqLmVudHJ5X2RhdGV9YCk7XG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKGRhdGVQKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoZWRpdERhdGUpO1xuICAgIFxuICAgICAgICBjb25zdCBlbnRyeVAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29uc3QgZW50cnlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgZW50cnlMYWJlbC50ZXh0Q29udGVudCA9IFwiRW50cnk6IFwiO1xuICAgICAgICBjb25zdCBlZGl0RW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGVkaXRFbnRyeS5pZCA9IGBlZGl0LWVudHJ5LS0ke3VwZGF0ZU9iai5pZH1gO1xuICAgICAgICBlZGl0RW50cnkuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgYCR7dXBkYXRlT2JqLmVudHJ5fWApO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChlbnRyeVApO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChlbnRyeUxhYmVsKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoZWRpdEVudHJ5KTtcbiAgICBcbiAgICAgICAgY29uc3QgbW9vZFAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29uc3QgbW9vZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBtb29kTGFiZWwudGV4dENvbnRlbnQgPSBcIk1vb2Q6IFwiO1xuICAgICAgICBjb25zdCBlZGl0TW9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgICAgIGVkaXRNb29kLmlkID0gYGVkaXQtbW9vZC0tJHt1cGRhdGVPYmouaWR9YDtcbiAgICAgICAgY29uc3Qgb3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbjEudmFsdWUgPSBcImhhcHB5XCI7XG4gICAgICAgIG9wdGlvbjEubmFtZSA9IFwibW9vZFwiO1xuICAgICAgICBvcHRpb24xLnRleHRDb250ZW50ID0gXCJIYXBweVwiO1xuICAgICAgICBjb25zdCBvcHRpb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgb3B0aW9uMi52YWx1ZSA9IFwic2FkXCI7XG4gICAgICAgIG9wdGlvbjIubmFtZSA9IFwibW9vZFwiO1xuICAgICAgICBvcHRpb24yLnRleHRDb250ZW50ID0gXCJTYWRcIjtcbiAgICAgICAgY29uc3Qgb3B0aW9uMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbjMudmFsdWUgPSBcImFuZ3J5XCI7XG4gICAgICAgIG9wdGlvbjMubmFtZSA9IFwibW9vZFwiO1xuICAgICAgICBvcHRpb24zLnRleHRDb250ZW50ID0gXCJBbmdyeVwiO1xuICAgICAgICBjb25zdCBvcHRpb240ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgb3B0aW9uNC52YWx1ZSA9IFwiZnJ1c3RyYXRlZFwiO1xuICAgICAgICBvcHRpb240Lm5hbWUgPSBcIm1vb2RcIjtcbiAgICAgICAgb3B0aW9uNC50ZXh0Q29udGVudCA9IFwiRnJ1c3RyYXRlZFwiO1xuICAgIFxuICAgICAgICBlZGl0TW9vZC5hcHBlbmRDaGlsZChvcHRpb24xKTtcbiAgICAgICAgZWRpdE1vb2QuYXBwZW5kQ2hpbGQob3B0aW9uMik7XG4gICAgICAgIGVkaXRNb29kLmFwcGVuZENoaWxkKG9wdGlvbjMpO1xuICAgICAgICBlZGl0TW9vZC5hcHBlbmRDaGlsZChvcHRpb240KTtcbiAgICBcbiAgICAgICAgY29uc3Qgc2F2ZVAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgc2F2ZVAuaWQgPSAgYHVwZGF0ZS1lbnRyeS0tJHt1cGRhdGVPYmouaWR9YDtcbiAgICAgICAgY29uc3QgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgdXBkYXRlQnV0dG9uLmlkID0gYHVwZGF0ZS1lbnRyeS0tJHt1cGRhdGVPYmouaWR9YDtcbiAgICAgICAgdXBkYXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJVcGRhdGUgRW50cnlcIlxuICAgICAgICB1cGRhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXJzLmhhbmRsZVVwZGF0ZSk7XG4gICAgICAgIHNhdmVQLmFwcGVuZENoaWxkKHVwZGF0ZUJ1dHRvbik7XG4gICAgXG4gICAgICAgIGVkaXREb2NGb3JtLmFwcGVuZENoaWxkKG1vb2RQKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQobW9vZExhYmVsKTtcbiAgICAgICAgZWRpdERvY0Zvcm0uYXBwZW5kQ2hpbGQoZWRpdE1vb2QpO1xuICAgICAgICBlZGl0RG9jRm9ybS5hcHBlbmRDaGlsZChzYXZlUCk7XG4gICAgXG4gICAgICAgIGVkaXRGaWVsZHNldC5hcHBlbmRDaGlsZChlZGl0RG9jRm9ybSk7XG4gICAgXG4gICAgICAgIHJldHVybiBlZGl0RmllbGRzZXQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkb21NYW5hZ2VyIiwiLy8gaW1wb3J0c1xuaW1wb3J0IGVudHJ5Q29tcG9uZW50IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCJcblxuXG5jb25zdCBhcnRpY2xlRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeS0tbG9nXCIpXG5cbmNvbnN0IGVudHJpZXNUb0RvbSA9IHtcbiAgICBmdW5jdGlvblRoYXRSZW5kZXJzRGF0YTogKHBhcnNlZEVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnNlZEVudHJ5KSAvL2FuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgY29uc3QgYXJ0aWNsZURvbUZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIFxuICAgICAgICBwYXJzZWRFbnRyeS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIGxldCBqb3VybmFsRW50cnlIdG1sID0gZW50cnlDb21wb25lbnQubWFrZUpvdXJuYWxFbnRyeUNvbXBvbmVudChlbnRyeSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFydGljbGVEb21GcmFnLmFwcGVuZENoaWxkKGpvdXJuYWxFbnRyeUh0bWwpO1xuICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICBhcnRpY2xlRG9tRnJhZy5hcHBlbmRDaGlsZChocik7XG4gICAgICAgIH0pXG4gICAgICAgIGFydGljbGVET00uYXBwZW5kQ2hpbGQoYXJ0aWNsZURvbUZyYWcpO1xuICAgIFxuICAgIH0sXG4gICAgcmVuZGVyU2VhcmNoRGF0YTogKG9iaikgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICAgIGNvbnN0IHBhcmExID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IHBhcmEyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgXG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IG9iai5jb25jZXB0cztcbiAgICAgICAgcGFyYTEudGV4dENvbnRlbnQgPSBvYmouZW50cnk7XG4gICAgICAgIHBhcmEyLnRleHRDb250ZW50ID0gb2JqLmVudHJ5X2RhdGU7XG4gICAgXG4gICAgICAgIG1haW5BcnRpY2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgICAgIG1haW5BcnRpY2xlQ29udGFpbmVyLmFwcGVuZENoaWxkKHBhcmExKTtcbiAgICAgICAgbWFpbkFydGljbGVDb250YWluZXIuYXBwZW5kQ2hpbGQocGFyYTIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZW50cmllc1RvRG9tOyIsIi8vIGltcG9ydHMgXG5pbXBvcnQgaGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCJcblxuXG5jb25zdCBlbnRyeUNvbXBvbmVuZXQgPSB7XG4gICAgbWFrZUpvdXJuYWxFbnRyeUNvbXBvbmVudDogKGVudHJ5T2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudHJ5SHRtbENvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xuICAgICAgICBlbnRyeUh0bWxDb21wb25lbnQuaWQgPSBgZW50cnktbG9nLS0ke2VudHJ5T2JqLmlkfWBcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGgyVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgICBoMlRhZy50ZXh0Q29udGVudCA9IGAke2VudHJ5T2JqLmNvbmNlcHRzfWA7XG4gICAgICAgIGVudHJ5SHRtbENvbXBvbmVudC5hcHBlbmRDaGlsZChoMlRhZyk7XG4gICAgXG4gICAgICAgIGNvbnN0IGRhdGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XG4gICAgICAgIGRhdGVUYWcudGV4dENvbnRlbnQgPSAgYCR7ZW50cnlPYmouZW50cnlfZGF0ZX1gO1xuICAgICAgICBlbnRyeUh0bWxDb21wb25lbnQuYXBwZW5kQ2hpbGQoZGF0ZVRhZyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHBhcmFFbnRyeVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBwYXJhRW50cnlUYWcudGV4dENvbnRlbnQgPSBgJHtlbnRyeU9iai5lbnRyeX1gO1xuICAgICAgICBlbnRyeUh0bWxDb21wb25lbnQuYXBwZW5kQ2hpbGQocGFyYUVudHJ5VGFnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcGFyYU1vb2RUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgcGFyYU1vb2RUYWcudGV4dENvbnRlbnQgPSBgTW9vZDogJHtlbnRyeU9iai5tb29kfWA7XG4gICAgICAgIGVudHJ5SHRtbENvbXBvbmVudC5hcHBlbmRDaGlsZChwYXJhTW9vZFRhZyk7XG4gICAgXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5pZCA9IGBkZWxldGUtLWVudHJ5LSR7ZW50cnlPYmouaWR9YDtcbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVycy5oYW5kbGVEZWxldGUpO1xuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuICAgICAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtLWVudHJ5LSR7ZW50cnlPYmouaWR9YDtcbiAgICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlcnMuaGFuZGxlRWRpdCk7XG4gICAgXG4gICAgICAgIGVudHJ5SHRtbENvbXBvbmVudC5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICAgICAgZW50cnlIdG1sQ29tcG9uZW50LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gICAgXG4gICAgXG4gICAgICAgIHJldHVybiBlbnRyeUh0bWxDb21wb25lbnQ7XG4gICAgfSxcbiAgICBuZXdKb3VybmFsRW50cnk6IChqb3VybmFsQ29uY2VwdHMsIGpvdXJuYWxFbnRyeSwgam91cm5hbERhdGUsIGpvdXJuYWxNb29kKSA9PiB7XG4gICAgICAgIC8vIEludm9rZSB0aGUgZmFjdG9yeSBmdW5jdGlvbiwgcGFzc2luZyBhbG9uZyB0aGUgZm9ybSBmaWVsZCB2YWx1ZXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFwiZW50cnlfZGF0ZVwiOiBqb3VybmFsRGF0ZSxcbiAgICAgICAgICAgIFwiY29uY2VwdHNcIjogam91cm5hbENvbmNlcHRzLFxuICAgICAgICAgICAgXCJlbnRyeVwiOiBqb3VybmFsRW50cnksXG4gICAgICAgICAgICBcIm1vb2RcIjogam91cm5hbE1vb2RcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZW50cnlDb21wb25lbmV0IiwiLy8gY2FsbCBhbGwgdGhlIGltcG9ydHNcbmltcG9ydCBBUEkgZnJvbSBcIi4vZGF0YVwiXG5pbXBvcnQgZW50cmllc1RvRG9tIGZyb20gXCIuL2VudHJpZXNUb0RvbVwiIC8vIHJlbmRlcnMgZnVuY3Rpb25Ub0RvbSBhbmQgc2VhcmNoUmVuZGVyXG5pbXBvcnQgZG9tTWFuYWdlciBmcm9tIFwiLi9kb21NYW5hZ2VyXCIgIC8vIGFsbCB0aGUgaHRtIGZ1bmN0aW9uc1xuaW1wb3J0IGVudHJ5Q29tcG9uZW50IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCJcblxuXG5jb25zdCBoYW5kbGVycyA9IHtcbiAgICBzYXZlQnV0dG9uSGFuZGxlcjogKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNhdmUgYnV0dG9uIHByZXNzZWQhXCIpO1xuICAgIFxuICAgICAgICAvLyBzYXZlIGFsbCB0aGUgaW5wdXQgdmFsdWVzIGludG8gYSB2YXJpYWJsZSBzbyB3ZSBjYW4gcGFzcyB0aGVtIHRvIHRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAgIGNvbnN0IHVzZXJFbnRyeURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxEYXRlXCIpLnZhbHVlO1xuICAgICAgICBjb25zdCB1c2VyRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdXNlckNvbmNlcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmNlcHRzXCIpLnZhbHVlO1xuICAgICAgICBjb25zdCBtb29kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kXCIpO1xuICAgICAgICB1c2VyTW9vZCA9IG1vb2Qub3B0aW9uc1ttb29kLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgICBjb25zdCBlbnRyeSA9IG5ld0pvdXJuYWxFbnRyeSh1c2VyQ29uY2VwdCwgdXNlckVudHJ5LCB1c2VyRW50cnlEYXRlLCB1c2VyTW9vZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gd2lsbCBjbGVhciBvdXQgdGhlIGRvbSBzbyB0aGF0IHdlIGNhbiBcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBuZXcgc2VjdGlvbiBvZiBqb3VybmFsIGVudHJpZXMgXG4gICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhtYWluQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgXG4gICAgICAgIC8vIHNhdmUgdGhlICdlbnRyeScgdG8gdGhlIGFwaSwgVEhFTiBjYWxsIHRvIEdFVCB0aGUgZW50cmllcywgVEhFTiBhcHBlbmQgdG8gdGhlIERPTVxuICAgICAgICBBUEkuc2F2ZUpvdXJuYWxFbnRyeShlbnRyeSkudGhlbihBUEkuZ2V0Sm91cm5hbEVudHJpZXMpLnRoZW4oZW50cmllc1RvRG9tLmZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhKTtcbiAgICB9LFxuICAgIGZpbHRlck1vb2RIYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgIC8vIHRoaXMgZnVuY3Rpb24gd2lsbCBwcm9kdWNlIGFsbCB0aGUgZW50cmllcyB3LyB0aGUgc2VsZWN0ZWQgbW9vZCBmcm9tIHRoZSByYWRpbyBidXR0b25zXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHN3aXRjaCh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChldmVudC50YXJnZXQudmFsdWUgPT09IFwiaGFwcHlNb29kXCIpOlxuICAgICAgICAgICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhtYWluQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgQVBJLmdldE1vb2RFbnRyaWVzKFwiaGFwcHlcIikudGhlbihlbnRyaWVzVG9Eb20uZnVuY3Rpb25UaGF0UmVuZGVyc0RhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAoZXZlbnQudGFyZ2V0LnZhbHVlID09PSBcInNhZE1vb2RcIik6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aGF0IGhhcHBlbmVkXCIpIFxuICAgICAgICAgICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhtYWluQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgQVBJLmdldE1vb2RFbnRyaWVzKFwic2FkXCIpLnRoZW4oZW50cmllc1RvRG9tLmZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gXCJhbmdyeU1vb2RcIik6IFxuICAgICAgICAgICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhtYWluQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgQVBJLmdldE1vb2RFbnRyaWVzKFwiYW5ncnlcIikudGhlbihlbnRyaWVzVG9Eb20uZnVuY3Rpb25UaGF0UmVuZGVyc0RhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBkb21NYW5hZ2VyLmNsZWFyRWxlbWVudHMobWFpbkFydGljbGVDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIEFQSS5nZXRNb29kRW50cmllcyhcImZydXN0cmF0ZWRcIikudGhlbihlbnRyaWVzVG9Eb20uZnVuY3Rpb25UaGF0UmVuZGVyc0RhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVEZWxldGU6ICgpID0+IHtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgZGVsZXRlIGhhbmRsZXIgZnVuY3Rpb25cbiAgICAgICAgZW50cnlJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkLnNwbGl0KFwiLS1cIilbMV07XG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5SWQpO1xuICAgIFxuICAgICAgICBBUEkuZGVsZXRlRW50cnkoZW50cnlJZCkudGhlbihBUEkuZ2V0Sm91cm5hbEVudHJpZXMpLnRoZW4oZW50cmllc1RvRG9tLmZ1bmN0aW9uVGhhdFJlbmRlcnNEYXRhKTtcbiAgICB9LFxuICAgIGhhbmRsZUVkaXQ6ICgpID0+IHtcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIHBvcHVsYXRlIHRoZSBlbnRyeSBpbiBxdWVzdGlvbiBcbiAgICAgICAgZW50cnlJZCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkLnNwbGl0KFwiLS1cIilbMV07XG4gICAgICAgIGNvbnNvbGUubG9nKGVudHJ5SWQpO1xuICAgIFxuICAgICAgICBjb25zdCBlZGl0Rm9ybUFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZW50cnktbG9nLS0ke2VudHJ5SWR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGVkaXRGb3JtQXJ0aWNsZSk7XG4gICAgICAgIC8vIGdldCB0aGF0IHBhcnRpY3VsYXIgb2JqZWN0XG4gICAgICAgIEFQSS5nZXRFbnRyeShlbnRyeUlkKS50aGVuKGVudHJ5VG9FZGl0ID0+IHtcbiAgICAgICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhlZGl0Rm9ybUFydGljbGUpO1xuICAgICAgICAgICAgY29uc3QgZWRpdEVudHJ5ID0gZG9tTWFuYWdlci5idWlsZEVkaXRGb3JtSHRtbChlbnRyeVRvRWRpdCk7XG4gICAgICAgICAgICBlZGl0Rm9ybUFydGljbGUuYXBwZW5kQ2hpbGQoZWRpdEVudHJ5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFQSS51cGRhdGVFbnRyeShlbnRyeUlkLCB1cGRhdGVkT2JqKS50aGVuKEFQSS5nZXRKb3VybmFsRW50cmllcykudGhlbihmdW5jdGlvblRoYXRSZW5kZXJzRGF0YSk7XG4gICAgfSxcbiAgICBoYW5kbGVVcGRhdGU6ICgpID0+IHtcbiAgICAgICAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIHVwZGF0ZSB0aGUgaW5mb3JtYXRpb24gaW4gcXVlc3Rpb25cbiAgICAgICAgY29uc3QgZW50cnlJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgICAgICBjb25zb2xlLmxvZyhlbnRyeUlkKTtcbiAgICBcbiAgICAgICAgY29uc3QgdXBkYXRlZEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXQtZW50cnktLSR7ZW50cnlJZH1gKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdXBkYXRlZENvbmNlcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdC1jb25jZXB0cy0tJHtlbnRyeUlkfWApLnZhbHVlO1xuICAgICAgICBjb25zdCB1cGRhdGVkRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0LWRhdGUtLSR7ZW50cnlJZH1gKS52YWx1ZTtcbiAgICAgICAgY29uc3QgdXBkYXRlZE1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdC1tb29kLS0ke2VudHJ5SWR9YCk7XG4gICAgICAgIGNvbnN0IG1vb2QgPSB1cGRhdGVkTW9vZC5vcHRpb25zW3VwZGF0ZWRNb29kLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZyh1cGRhdGVkRW50cnksdXBkYXRlZENvbmNlcHQsIHVwZGF0ZWREYXRlLCBtb29kKTtcbiAgICBcbiAgICAgICAgbGV0IHVwZGF0ZWRKb3VybmFsRW50cnkgPSBlbnRyeUNvbXBvbmVudC5uZXdKb3VybmFsRW50cnkodXBkYXRlZENvbmNlcHQsdXBkYXRlZEVudHJ5LHVwZGF0ZWREYXRlLCBtb29kKTtcbiAgICBcbiAgICAgICAgZG9tTWFuYWdlci5jbGVhckVsZW1lbnRzKG1haW5BcnRpY2xlQ29udGFpbmVyKTtcbiAgICAgICAgQVBJLnB1dEVudHJ5KGVudHJ5SWQsIHVwZGF0ZWRKb3VybmFsRW50cnkpLnRoZW4oQVBJLmdldEpvdXJuYWxFbnRyaWVzKS50aGVuKGVudHJpZXNUb0RvbS5mdW5jdGlvblRoYXRSZW5kZXJzRGF0YSk7XG4gICAgfSxcbiAgICBoYW5kbGVTZWFyY2g6ICgpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmNoYXJDb2RlID09PSAxMykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzb21ldGhpbmcgd2FzIHNlYXJjaGVkXCIpO1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IGV2ZW50LnRhcmdldC52YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIGRvbU1hbmFnZXIuY2xlYXJFbGVtZW50cyhtYWluQXJ0aWNsZUNvbnRhaW5lcik7XG4gICAgICAgICAgICAvLyBtYWluQXJ0aWNsZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgICAgQVBJLmdldEpvdXJuYWxFbnRyaWVzKCkudGhlbihlbnRyeUFycmF5ID0+IHtcbiAgICAgICAgICAgICAgICBlbnRyeUFycmF5LmZvckVhY2goam91cm5hbE9iaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGpvdXJuYWxBcnJheVZhbHVlcyA9IE9iamVjdC52YWx1ZXMoam91cm5hbE9iaik7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGpvdXJuYWxBcnJheVZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoU2VhcmNoID0gam91cm5hbEFycmF5VmFsdWVzLmZpbmQodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codHlwZW9mKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG93ZXJDYXNlVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG93ZXJDYXNlVmFsdWUuaW5jbHVkZXMoc2VhcmNoVGVybSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwid2hhdCBpcyBpbiB0aGUgYXJyYXk6IFwiLG1hdGNoU2VhcmNoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobWF0Y2hTZWFyY2ggIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyaWVzVG9Eb20ucmVuZGVyU2VhcmNoRGF0YShqb3VybmFsT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyc1xuIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhXCJcbmltcG9ydCBkb21NYW5hZ2VyIGZyb20gXCIuL2RvbU1hbmFnZXJcIlxuaW1wb3J0IGVudHJpZXNUb0RvbSBmcm9tIFwiLi9lbnRyaWVzVG9Eb21cIlxuXG4vLyBzdGVwIDEuIGNhbGwgdGhlIGZ1bmN0aW9uIHRvIGJ1aWxkIHRoZSBmb3JtIGh0bWxcbmRvbU1hbmFnZXIuYnVpbGRNYWluSFRNTCgpO1xuXG4vLyBzdGVwIDIuIGNhbGwgYXBpIG9iamVjdCdzIG1ldGhvZCBnZXRFbnRyaWVzIHdoaWNoIHdpbGwgdGhlbiBjYWxsIGEgZnVuY3Rpb24gdG8gXG4vLyByZW5kZXIgdGhhdCBkYXRhIHRvIHRoZSBkb20gXG5BUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKGVudHJpZXNUb0RvbS5mdW5jdGlvblRoYXRSZW5kZXJzRGF0YSk7XG5cbiJdfQ==
