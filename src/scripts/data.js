const API = {
    getJournalEntries () { // returns all the entries as an array of objects
        return fetch("http://localhost:8088/entries")
        .then(response => response.json())
    },
    saveJournalEntry (entry) { // saves each entry and store in the api
        return fetch("http://localhost:8088/entries",{
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(entry)
        })
        .then(response => response.json())
    },
    getMoodEntries (mood) { // returns an array of objects
        return fetch(`http://localhost:8088/entries?mood=${mood}`)
        .then(response => response.json())
    },
    deleteEntry (entryId) {
        return fetch(`http://localhost:8088/entries/${entryId}`,{
            method: "DELETE"
        })
        .then(clearElements(mainArticleContainer));
    },
    putEntry (entryId, updateObj) {
        return fetch(`http://localhost:8088/entries/${entryId}`,{
            method: "PUT",
            headers: {
                "content-type": "application/json"
              },
            body: JSON.stringify(updateObj)
        })
    },
    getEntry (entryId){
        return fetch(`http://localhost:8088/entries/${entryId}`)
        .then(response => response.json())
    }
}