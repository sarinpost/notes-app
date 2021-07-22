const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'your notes....'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note => {
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log('Duplicate title !')
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const isExist = notes.find(note => title == note.title)
    if (isExist) {
        const result = notes.filter(note => title != note.title)
        saveNotes(result)
        console.log(chalk.bgGreen('remove success !'));
    } else {
        console.log(chalk.bgRed('No note removed !'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync("./notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}