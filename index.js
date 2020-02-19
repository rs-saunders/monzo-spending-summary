require('dotenv').config();
const monzo = require('./monzo');
const dateFns = require('date-fns');
const fs = require('fs');
const path = require('path');
const util = require('util');

const SUMMARY_FILE = path.join(process.env.OUTPUT_DIR, 'summary.json');

const writeFile = util.promisify(fs.writeFile);
const categories = {};

monzo.getTransactions()
    .then(transactions => {
        console.log('Parsing transactions...');
        for (let transaction of transactions) {          
            const yearMonth = dateFns.format(dateFns.parseISO(transaction.created), 'yyyy-MM');
            if(!categories[yearMonth]) {
                categories[yearMonth] = {};
            }
            if(!categories[yearMonth][transaction.category]) {
                categories[yearMonth][transaction.category] = 0;
            }

            const amount = parseInt(transaction.amount);

            if(amount < 0) {
                categories[yearMonth][transaction.category] += amount;
            }
        }

        console.log(`Writing file ${SUMMARY_FILE}...`);
        return writeFile(SUMMARY_FILE, JSON.stringify(categories, null, 2));
    })
    .catch(error => {
        console.log(error);
    })
    .then(() => {
        console.log('All Done!');
    });