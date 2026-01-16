import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js';
import dressRoutes from "./routes/dress.routes.js"
//need to have some middleware

const app = express();//just an instace of express app
app.use(express.json());//the middle ware we needed

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://missingfit-frontend.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json({limit:"16kb"})) //to apply a limit to recieve json request
app.use(express.urlencoded()) //it is used to take data from url and in url in between data there is special characters that's why it is used
app.use(cookieParser())
app.use(express.static('public'))
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/dress',dressRoutes)

export default app;