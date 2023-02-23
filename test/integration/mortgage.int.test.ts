import request from 'supertest'
import app from '../../src/app/app.js'
import constants from '../../constants.js';
import { PaymentSchedule } from '../../src/mortgage/PaymentSchedule.js';

describe('GET /', ()=> {
    const price = 1000000;
    const downPayment = 250000;
    const annualInterestRate = 0.05;
    const amortizationPeriod = 25;
    const paymentSchedule = PaymentSchedule.MONTHLY;

    test('given all valid fields', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty('monthlyPayment', 4384.43)
    });
    
    test('undefined price', async () => {
        const response = await request(app).get('/').send({
            downPayment,
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.price.undefined)
    });

    test('undefined downPayment', async () => {
        const response = await request(app).get('/').send({
            price,
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.downPayment.undefined)
    });

    test('undefined annualInterestRate', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.interest.undefined)
    });

    test('undefined amortizationPeriod', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.amortizationPeriod.undefined)
    });

    test('undefined paymentSchedule', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate,
            amortizationPeriod,
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.paymentSchedule.undefined)
    });

    test('NaN price', async () => {
        const response = await request(app).get('/').send({
            price: "foo",
            downPayment,
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.price.invalid)
    });

    test('NaN downPayment', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment: "foo",
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.downPayment.invalid)
    });

    test('NaN annualInterestRate', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate: "foo",
            amortizationPeriod,
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.interest.invalid)
    });

    test('NaN amortizationPeriod', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate,
            amortizationPeriod: "foo",
            paymentSchedule
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.amortizationPeriod.invalid)
    });

    test('NaN paymentSchedule', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule: "foo"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.paymentSchedule.invalid)
    });

    test('paymentSchedule that isnt 12, 24 or 26', async () => {
        const response = await request(app).get('/').send({
            price,
            downPayment,
            annualInterestRate,
            amortizationPeriod,
            paymentSchedule: 1
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toHaveProperty('error', constants.paymentSchedule.invalid)
    })
});