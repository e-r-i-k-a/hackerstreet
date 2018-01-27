// const router = require('express').Router()
// module.exports = router

// router.use('/events', require('./events'))

// router.use((req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// })

const express = require('express');
const app = express();
const PORT = 8081 || process.env.PORT;

app.get('/events', (req,res)=>{

});


app.listen(PORT,()=>{
  console.log('listening');
})