import { encoded, translations } from './data.js'

function decoding(encoded, translations) {
    let decoded = [];
    let idsDictionary = {};
    let uniqueIds = [];

    for (let i = 0; i < encoded.length; i++) {
        let item = encoded[i];
        let decodedItem = {};

        for (let key in item) {
            if (key.endsWith('Id') && translations[item[key]] !== undefined) {
                decodedItem[key] = translations[item[key]];

                if (idsDictionary[item[key]] === undefined) {
                    idsDictionary[item[key]] = 1;
                } else {
                    idsDictionary[item[key]]++;
                }

            } else {
                decodedItem[key] = item[key];
            }
        }

        uniqueIds = Object.keys(idsDictionary).filter(function (item) {
            return idsDictionary[item] === 1;
        });

        decoded.push(decodedItem);
    }

    return [decoded, uniqueIds];
}

console.log(decoding(encoded, translations));