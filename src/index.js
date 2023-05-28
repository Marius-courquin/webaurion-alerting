import dotenv from 'dotenv';
import {readCSV} from "./utils/csvReader.js";
import {downloadNotes} from "./webaurionInteraction.js";
import {checkAndCreateDirectory, checkFileExistence, deleteFile, renameFile} from "./utils/directoryManagement.js";
import {sendNewMessage} from "./services/repository.js";

dotenv.config();

const downloadPath = './downloads'
const fullDownloadPath = process.env.DOWNLOADS_PATH;
const downloadedFile = 'Mes Notes aux épreuves.csv';
const oldFile = 'oldNotes.csv';
const downloadedFilePath = fullDownloadPath + '/' + downloadedFile;
const oldFilePath = fullDownloadPath + '/' + oldFile;


checkAndCreateDirectory(downloadPath).then(() =>
    downloadNotes(fullDownloadPath)
        .then(() => readCSV(downloadedFilePath, 0)
            .then((notes) => {
                checkFileExistence(oldFilePath)
                    .then( () =>
                        readCSV(oldFilePath, 0).then((oldNotes) => {
                            const notesToSend = notes.filter((note) => !oldNotes.includes(note));
                            deleteFile(oldFilePath).then(() => sendMessagesAndRenameOldFile(notesToSend))
                        })
                    )
                    .catch(() => sendMessagesAndRenameOldFile(notes))
            })))

const sendMessagesAndRenameOldFile = (newNotes) => {
    renameFile(downloadedFilePath, oldFilePath);
    newNotes.forEach((note) => sendNewMessage(note));
}