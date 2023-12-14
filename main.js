const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const exphbs = require('express-handlebars') 

const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', exphbs.engine({ extname:'.hbs', defaultLayout:'main' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

const envFile = path.resolve(__dirname, 'config', '.env');
dotenv.config({ path: envFile });

const MONGODB_URI = process.env.MONGO_URL;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
  .then(() => {
    console.log("Connected to database")
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  })

  app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');

const surveySchema = new mongoose.Schema({
  name: String,
  email: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  question5: String,
  question6: String,
  question7: String,
  question8: String,
})

const Survey = mongoose.model('Survey', surveySchema)

app.post('/api/new-survey', async (req, res) => {
  {
    try{
      const { name, email, question1, question2, question3, question4, question5, question6, question7, question8,} = req.body

      const newSurvey = new Survey({ name, email, question1, question2, question3, question4, question5, question6, question7, question8, })
      await newSurvey.save()

      fs.appendFile('emails.txt', `${email},\n`, (err) => {
        if (err) {
          console.error('Error appending email to file:', err);
          return res.status(500).json({ error: 'Error appending email to file' });
        } else {
          console.log('Email appended to file');
        }
      })

      res.status(201).json({ message: 'User data saved successfully'})
    } catch (error) {
      res.status(500).json({ error: 'Error saving survey'})
    }
  }
})

app.get('/', (req, res)=>{
    res.render('index', {title: 'Disport NG', })
})

app.listen(8080, console.log('Server running...'))
