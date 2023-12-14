const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');
const exphbs = require('express-handlebars') 
const fs = require('fs');


const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', exphbs.engine({ extname:'.hbs', defaultLayout:'main' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

dotenv.config({path: path.join(__dirname, '/config/.env')})

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB()

const surveySchema = mongoose.Schema({
  name: String,
  email: String,
  question1: String,
  question2: String,
  question3: String,
  question4: String,
  // question5: String,
  question6: String,
  question7: String,
  question8: String,
})

const Survey = mongoose.model('Survey', surveySchema)

app.get('/', (req, res)=>{
  res.render('index', {title: 'Disport NG', })
})

app.post('/api/new-survey', async (req, res) => {
  {
    try{
      const { name, email, question1, question2, question3, question4, question6, question7, question8,} = req.body

      const newSurvey = await new Survey({ name, email, question1, question2, question3, question4, question6, question7, question8, })
      await newSurvey.save()

      // fs.appendFile('emails.txt', `${email},\n`, (err) => {
      //   if (err) {
      //     console.error('Error appending email to file:', err);
      //     return res.status(500).json({ error: 'Error appending email to file' });
      //   } else {
      //     console.log('Email appended to file');
      //   }
      // })

      res.status(201).json({ message: 'User data saved successfully'})
    } catch (error) {
      res.status(500).json({ error: 'Error saving survey'})
    }
  }
})



app.listen(8080, console.log('Server running...'))
