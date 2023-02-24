
import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { Mortgage } from '../mortgage/Mortgage.js';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.post('/', (req: Request, res: Response)=> {
    const {price, downPayment, annualInterestRate, amortizationPeriod, paymentSchedule}: Mortgage = req.body;
    const mortgage = new Mortgage(price, downPayment, annualInterestRate, amortizationPeriod, paymentSchedule);
    const result = mortgage.calculateMonthlyMortgagePayment();

    if('error' in result) return res.status(400).send(result)

    return res.status(200).send(result)
})

export default app;