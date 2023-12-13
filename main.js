const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.engine('.hbs', exphbs.engine({ extname:'.hbs' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    res.render('index', {title: 'Disport NG', layout:false})
})

app.listen(8080, console.log('Server running...'))