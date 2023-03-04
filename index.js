const fs = require('fs');
const axios = require('axios');
const HTMLParser = require('node-html-parser');

function modifyString(string) {
    return string.replace(',', ' ');
}

async function parsePageToFile(url, outFilePath) {
    const headerClass = '._card__title_8sstg_1';

    axios.get(url)
    .then(response => {
        let body = HTMLParser.parse(response.data);
        let select = body.querySelectorAll(headerClass);
        select.forEach(element => {
            fs.writeFileSync(outFilePath, modifyString(element.text) +',\n', { flag: 'a' });
        });
    })
    .catch(err => {
        console.log(err.code);
    });
}

const url = 'https://stopgame.ru/vreviews/p';
const fileText = 'Обзоры Stopgame';
const outFilePath = fileText + '.csv';
const startIndex = 1, endIndex = 77;

function iterateThroughPages(url, startIndex, endIndex, outFilePath, fileText) {
    fs.writeFileSync(outFilePath, fileText + ',\n');
    for (let i = startIndex; i <= endIndex; ++i) {
        setTimeout(() => {
            parsePageToFile(url + i, outFilePath);
        }, 300);
    }
}

iterateThroughPages(url, startIndex, endIndex, outFilePath, fileText);