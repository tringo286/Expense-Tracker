const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require("./db")
const expenses = require('./routes/expenseRoutes')
const incomes = require('./routes/incomeRoutes')
const user = require('./routes/userRoutes')
const auth = require('./routes/authRoutes')

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://spendings-tracker-app.netlify.app', // Frontend URL
  credentials: true,  // Allow sending cookies
}));

app.use('/', auth)
app.use('/', user);
app.use('/', expenses);
app.use('/', incomes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})
