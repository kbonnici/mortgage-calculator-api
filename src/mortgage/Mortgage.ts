import constants from "../../constants.js";
import { createClientErrorResponses } from "../utils/utils.js";
import { PaymentSchedule } from "./PaymentSchedule.js";

type MonthlyMortgagePaymentCalculationResult = {monthlyPayment: number} | {error: string};

export class Mortgage {
    price: number;
    downPayment: number;
    annualInterestRate: number;
    amortizationPeriod: number;
    paymentSchedule: PaymentSchedule;

    constructor(price: number, 
        downPayment: number, 
        annualInterestRate: number, 
        amortizationPeriod: number, 
        paymentSchedule: PaymentSchedule
    ){
        this.price = price;
        this.downPayment = downPayment;
        this.annualInterestRate = annualInterestRate;
        this.amortizationPeriod = amortizationPeriod;
        this.paymentSchedule = paymentSchedule;
    }

    /**
     * @returns An object containing either the monthlyPayment or an error message.
     */
    calculateMonthlyMortgagePayment(): MonthlyMortgagePaymentCalculationResult {
        const {price, downPayment, annualInterestRate, amortizationPeriod, paymentSchedule} = this;
        const clientErrorResponses = createClientErrorResponses(
            price, 
            downPayment, 
            annualInterestRate, 
            amortizationPeriod, 
            paymentSchedule
        )


        for (const input of clientErrorResponses){
            if(input.value == null)                             return {error: input.msgs.undefined};
            else if (isNaN(input.value))                        return {error: input.msgs.invalid};
            else if (input.value <= 0)                          return {error: input.msgs.nonPositive};
        }

        if (downPayment < constants.minimumDownPayment * price) return {error: constants.downPayment.insufficientDownPayment};
        if (downPayment > price)                                return {error: constants.downPayment.belowPrice};
        if (annualInterestRate >= 1.0)                          return {error: constants.interest.betweenZeroOne};
        if (amortizationPeriod % 5 != 0)                        return {error: constants.amortizationPeriod.invalidIncrement};
        if (amortizationPeriod < 5 || amortizationPeriod > 30)  return {error: constants.amortizationPeriod.invalidIncrement};
        if (!(paymentSchedule in PaymentSchedule))              return {error: constants.paymentSchedule.invalid};

        // calculate monthly payment
        const P = price - downPayment;
        const r = annualInterestRate / paymentSchedule;
        const n = amortizationPeriod * paymentSchedule;

        const x = Math.pow(1+r, n);
        const numerator = r * x;
        const denominator = x - 1;

        const fraction = numerator / denominator;

        const M = P * fraction;
        return {monthlyPayment: Math.round(100*M)/100} // round to nearest 100th
    }
}