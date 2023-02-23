import constants from "../../constants.js";

type ClientErrorResponse = {
    value: number,
    msgs: {
        undefined: string,
        invalid: string, 
        nonPositive: string
    }
}

// utility function to group inputs along with some error messages that are common among all of them.
export function createClientErrorResponses(price: number, downPayment: number, annualInterestRate: number, amortizationPeriod: number, paymentSchedule: number): ClientErrorResponse[]{
    return [
            {value: price, msgs: {
                undefined: constants.price.undefined,
                invalid: constants.price.invalid,
                nonPositive: constants.price.nonPositive
            }},
            {value: downPayment, msgs: {
                undefined: constants.downPayment.undefined,
                invalid: constants.downPayment.invalid,
                nonPositive: constants.downPayment.nonPositive
            }},
            {value: annualInterestRate, msgs: {
                undefined: constants.interest.undefined,
                invalid: constants.interest.invalid,
                nonPositive: constants.interest.nonPositive
            }},
            {value: amortizationPeriod, msgs: {
                undefined: constants.amortizationPeriod.undefined,
                invalid: constants.amortizationPeriod.invalid,
                nonPositive: constants.amortizationPeriod.nonPositive
            }},
            {value: paymentSchedule, msgs: {
                undefined: constants.paymentSchedule.undefined,
                invalid: constants.paymentSchedule.invalid,
                nonPositive: constants.paymentSchedule.nonPositive
            }},
        ]
}