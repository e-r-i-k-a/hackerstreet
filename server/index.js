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

firebase.initializeApp(require('../FireBaseConfig'));

const onFireBaseSignInError = (signInError, res) =>{
  if (signInError){
    console.error(signInError);
    res.status(500).send({error:'Cannot access firebase'});
  }
};

/**
 * 
 * @param {{body: {ID: number, Categories:[String],Descrition: String, Attendees: [{}], name:String }}} req 
 * @param {*} res 
 */
var onAddEvent = (req,res)=>{
  //console.log(req.body);
  firebase.auth().signInAnonymously().then(()=>{
    firebase.database ().ref('/Event/'+req.body.ID).set(req.body,(err)=>{
      if(err){
        console.error(err.message, err.stack);
        res.status(500).send({error: 'cannot add event'});
      }
      else res.json({message: 'event posted', eventId: req.body.ID});
    });
  })
  .catch(err => onFireBaseSignInError(err,res));
};

app.post('/events/add', onAddEvent);

/**
 * 
 * @param {{body: {id: number, eventId: number, phone: String, email: String }}} req 
 * @param {*} res 
 */
var onRsvp = (req,res)=>{
  firebase.auth().signInAnonymously().then(()=>{
    firebase.database().ref('/Event/'+req.body.eventId).child('Attendees').set({
      id: req.body.id,
      phone: req.body.phone,
      email: req.body.email
    }, (err)=>{
      if(err) console.error(err.message, err.stack);
      res.json({message:'OK', attendeeId: req.body.id});
    });
  }).catch(e => onFireBaseSignInError(e,res));
};

app.post(['/events/sign-up'], onRsvp );

app.listen(PORT,()=>{
  console.log('listening');
});