const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes.js')

// customize yarge version
yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body:',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string',
        },
    },
    describe: 'Remove a new note',
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string',
        },
    },
    describe: 'Read a new note',
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()