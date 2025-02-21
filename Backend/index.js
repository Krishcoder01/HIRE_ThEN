const express = require('express')
const app = express()
const dotenv = require('dotenv');
const Db = require('./config/mongoDb');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRotes');
const cors = require('cors');



// const allowedOrigins = [
//         'http://localhost:5173', // Frontend on localhost
       
//       ];


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();
app.use(cors(
    // {
    //       origin: (origin, callback) => {
    //         if (!origin || allowedOrigins.includes(origin)) {
    //           callback(null, true);
    //         } else {
    //           callback(new Error('Not allowed by CORS'));
    //         }
    //       },
    //       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    //       credentials: true,
    //     }
));


//Connect to MongoDB
Db();


//Routes

app.use('/api/user', userRoutes ) ;
app.use('/api/transaction', transactionRoutes ) ;
app.use('/api/budget' , budgetRoutes);



app.listen(process.env.PORT, () => console.log(`App is started on port  ${process.env.PORT}!`))