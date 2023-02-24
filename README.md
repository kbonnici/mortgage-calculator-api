# BC Mortgage Calculator API

author: Karl Bonnici (@kbonnici)

## Overview

A mortgage calculator API which takes in the following inputs:
* Property price
* Down payment
* Annual interest rate
* Amortization period (5 year increments between 5 and 30 years)
* Payment schedule (accelerated bi-weekly, bi-weekly, monthly)

and produces the following outputs:
* Payment per payment schedule
* An error if the inputs are not valid

This API can be interacted with using the [accompanying frontend application](https://github.com/kbonnici/mortgage-calculator-frontend)

### Mortgage Payment Formula

`M = P * (r * (1+r)^n)/((1 + r)^n - 1)`
* M = Payment per payment schedule
* P = Principle
* r = per payment schedule interest rate. Calculated by dividing the annual interest rate by the number of payments per annum
* n = Total number of payments over the amortization period

## How to Run

* First, run `npm install`
* To run the server, run `npm start`
* To watch for changes to code, run `npm run dev`
* To only build the project, run `npm run build`

## Testing

* Unit tests: `npm run test`
* Integration tests: `npm run integration`
* Both: `npm run test integration`
* Coverage report: `npx jest --coverage`