# Monzo Spending Summary

Creates a summary of all spending by year-month and category. The idea is to mimic the summary you get each month within the mobile app.

## How to use

```
npm install
```

Visit https://developers.monzo.com/ and sign in to get an access token and account id from the API Playground

> **Note:** an access token only lasts **5 minutes** for retreiving transactions so act quick! 

create a `.env` file in the root of the project

```
MONZO_ACCOUNT_ID=""
MONZO_ACCESS_TOKEN=""
OUTPUT_DIR = "./data"
```
> **Note:** make sure the output directory exists before you start.

```
npm start
```

## Output
Two files are created in the specified output directory. `transactions.json` and `summary.json`


### transactions.json
This is the returned json from the api containing all transactions for the specified account. Visit https://docs.monzo.com/#transactions for details.

### summary.json 
```
{
    "2018-11": {
        "general": 0,
        "cash": -8000,
        "eating_out": -28251,
        "groceries": -35446,
        "shopping": -42811,
        "personal_care": -7402,
        "entertainment": -15601,
        "transport": -4168,
        "bills": -391,
        "family": -2099
    },
    "2018-12": {
        "personal_care": -13842,
        "eating_out": -69356,
        "shopping": -38066,
        "groceries": -88273,
        "entertainment": -4149,
        "family": -19547,
        "general": -231461,
        "transport": -6616,
        "holidays": -1400,
        "cash": -12061,
        "bills": -475
    }
}
```
