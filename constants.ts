export default {
    minimumDownPayment: 0.05,
    price: {
        nonPositive: "price must be positive",
        invalid: "invalid price",
        undefined: "price is undefined"
    },

    downPayment: {
        nonPositive: "down payment must be positive",
        insufficientDownPayment: `down payment must be at least 5% of the asking price`,
        belowPrice: "down payment must be less than or equal to asking price",
        invalid: "invalid down payment",
        undefined: "down payment is undefined"
    },

    interest: {
        nonPositive: "interest rate must be positive",
        betweenZeroOne: "interest rate must be between 0 and 1",
        invalid: "invalid interest rate",
        undefined: "interest rate is undefined"
    },

    amortizationPeriod: {
        invalidIncrement: "amortization period must be a 5 year increment between 5 and 30 years",
        nonPositive: "amortization period must be positive",
        invalid: "invalid amortization period",
        undefined: "amortization period is undefined"
    },

    paymentSchedule: {
        nonPositive: "payment schedule must be positive",
        invalid: "invalid payment schedule",
        undefined: "payment schedule is undefined"
    }
}