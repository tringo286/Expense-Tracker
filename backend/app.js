const express = require('express');
const dotenv = require('dotenv');

const { connectDB } = require("./db")
const expense = require('./routes/expense.route')

dotenv.config({ path: '../.env' });

const app = express();

const PORT = process.env.PORT || 3000;;

app.use(express.json());
app.use('/api/expense', expense);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})
