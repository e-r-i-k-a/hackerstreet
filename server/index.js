// const router = require('express').Router()
// module.exports = router

// router.use('/events', require('./events'))

// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const firebase = require('firebase');
const PORT = 8081 || process.env.PORT;

app.get('/events', (req,res)=>{

});

app.post('/events/add',(req,res)=>{
  
});

app.listen(PORT,()=>{
  console.log('listening');
})