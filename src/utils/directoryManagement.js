import * as fs from "fs";

export const checkAndCreateDirectory = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, {recursive: true});
    }
    return Promise.resolve()
};

export const renameFile = (oldPath, newPath) => {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

export const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err)
                reject();
            } else {
                resolve();
            }
        })
    })
}

export const checkFileExistence = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                reject();
            } else {
                resolve();
            }
        });
    });
};