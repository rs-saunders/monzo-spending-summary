const Axios = require('axios');
const fs = require('fs');
const util = require('util');
const path = require('path');
const writeFile = util.promisify(fs.writeFile);
const axios = Axios.create({
    baseURL: 'https://api.monzo.com/',
    headers: { 'Authorization': `Bearer ${process.env.MONZO_ACCESS_TOKEN}` }
});

const TRANSACTIONS_FILE = path.join(process.env.OUTPUT_DIR, 'transactions.json');

const statuses = {
    200: 'All is well.',
    400: 'Your request has missing arguments or is malformed.',
    401: 'Your request is not authenticated.',
    403: 'Your request is authenticated but has insufficient permissions.',
    404: 'The endpoint requested does not exist.',
    405: 'You are using an incorrect HTTP verb. Double check whether it should be POST/GET/DELETE/etc.',
    406: 'Your application does not accept the content format returned according to the Accept headers sent in the request.',
    429: 'Your application is exceeding its rate limit. Back off, buddy. :p',
    500: 'Something is wrong on our end. Whoopsie.',
    504: 'Something has timed out on our end. Whoopsie.',
};

async function get(endpoint) {
    try {
        return await axios.get(endpoint);
    } catch (err) {
        // console.log(err);
        throw new Error(`${err.response.status} error: GET ${endpoint} -> ${statuses[err.response.status]}`);
    } 
}

module.exports = {
    getTransactions: async () => {
        if(fs.existsSync(TRANSACTIONS_FILE)) {
            const transactions = fs.readFileSync(TRANSACTIONS_FILE);
            console.log(`Loading transactons from ${TRANSACTIONS_FILE}...`);
            if(transactions.length > 0) {
                return JSON.parse(transactions);
            }
        } 
        console.log('Fetching transactons from api...');
        const { data: { transactions } } = await get(`/transactions?expand[]=merchant&account_id=${process.env.MONZO_ACCOUNT_ID}`);
        console.log(`Writing file ${SUMMARY_FILE}...`);
        await writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions));
        return transactions;
    }
}