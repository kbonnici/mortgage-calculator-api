import constants from '../../constants.js';
import {Mortgage} from '../../src/mortgage/Mortgage.js'
import { PaymentSchedule } from '../../src/mortgage/PaymentSchedule.js';

describe('Calculate monthly mortgage payments', ()=> {
    
    const price = 1000000;
    const downPayment = 250000;
    const annualInterestRate = 0.05;
    const amortizationPeriod = 25;
    const paymentSchedule = PaymentSchedule.ACCELERATED;
    let mortgage: Mortgage;

    beforeEach(()=> {
        mortgage = new Mortgage(price, downPayment, annualInterestRate, amortizationPeriod, paymentSchedule)
    })

    test('can create a mortgage object', ()=> {
        expect(mortgage.price).toEqual(price);
        expect(mortgage.downPayment).toEqual(downPayment);
        expect(mortgage.annualInterestRate).toEqual(annualInterestRate);
        expect(mortgage.amortizationPeriod).toEqual(amortizationPeriod);
        expect(mortgage.paymentSchedule).toEqual(paymentSchedule);
    })

    test('returns correct monthlyPayment', ()=> {
        let monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('monthlyPayment', 2022.44);

        mortgage.paymentSchedule = PaymentSchedule.BIWEEKLY;
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('monthlyPayment', 2191.07);

        mortgage.paymentSchedule = PaymentSchedule.MONTHLY;
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('monthlyPayment', 4384.43);
    })

    test('returns nonPositive error when price <= 0', () => {
        mortgage.price = 0;
        let monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.price.nonPositive);

        mortgage.price = -1
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.price.nonPositive);
    })

    test('returns nonPositive downPayment when downPayment <= 0', () => {
        mortgage.downPayment = 0;
        let monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.downPayment.nonPositive);

        mortgage.downPayment = -1
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.downPayment.nonPositive);
    })

    test('returns nonPositive annualInterestRate when annualInterestRate <= 0', () => {
        mortgage.annualInterestRate = 0;
        let monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.interest.nonPositive);

        mortgage.annualInterestRate = -1
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.interest.nonPositive);
    })

    test('returns nonPositive amortizationPeriod when amortizationPeriod <= 0', () => {
        mortgage.amortizationPeriod = 0;
        let monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.amortizationPeriod.nonPositive);

        mortgage.amortizationPeriod = -1
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();
        expect(monthlyPayment).toHaveProperty('error', constants.amortizationPeriod.nonPositive);
    })

    test('returns downPayment must be below price error when price < downPayment', ()=> {
        mortgage.price = 1;
        const monthlyPayment = mortgage.calculateMonthlyMortgagePayment();

        expect(monthlyPayment).toHaveProperty('error', constants.downPayment.belowPrice);
    })

    test('returns insufficient downPayment when downPayment < 5% of price', () => {
        mortgage.downPayment = 1;
        const monthlyPayment = mortgage.calculateMonthlyMortgagePayment();

        expect(monthlyPayment).toHaveProperty('error', constants.downPayment.insufficientDownPayment);
    })

    test('returns between 0 and 1 error when annualInterestRate > 1.0', () => {
        mortgage.annualInterestRate = 1.1;
        const monthlyPayment = mortgage.calculateMonthlyMortgagePayment();

        expect(monthlyPayment).toHaveProperty('error', constants.interest.betweenZeroOne);
    })

    test('returns invalidIncrement error when amortizationPeriod is not a multiple of 5 or between 5 and 30', () => {
        mortgage.amortizationPeriod = 6;
        let monthlyPayment = mortgage.calculateMonthlyMortgagePayment();

        expect(monthlyPayment).toHaveProperty('error', constants.amortizationPeriod.invalidIncrement);

        mortgage.amortizationPeriod = 31;
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();

        expect(monthlyPayment).toHaveProperty('error', constants.amortizationPeriod.invalidIncrement);

        mortgage.amortizationPeriod = 4;
        monthlyPayment = mortgage.calculateMonthlyMortgagePayment();

        expect(monthlyPayment).toHaveProperty('error', constants.amortizationPeriod.invalidIncrement);
    })
})