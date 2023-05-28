import * as fs from "fs";
import csvParser from "csv-parser";

export const readCSV = async (filePath, columnIndex) => {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath, { encoding: 'latin1' })
            .pipe(csvParser())
            .on('data', (data) => {
                const value = data[Object.keys(data)[0]];
                results.push(value.split(";")[columnIndex]);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};