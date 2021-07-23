const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'your notes....'
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title == title)
    if (note) {
        console.log(chalk.inverse.green(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.inverse.red("Note not found"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'));
    notes.forEach(element => {
        console.log(element.title)
    });
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title == title)
    if (!duplicateNote) {
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

const removeNote = (title) => {
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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json', dataJSON)
}

const loadNotes = () => {
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
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}