import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL =
  'mongodb+srv://vivek:vivek@cluster0.xpii4q5.mongodb.net/memories-app?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3080;

mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Sever Running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
