const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const firebase = require('firebase');
const PORT = 8081 || process.env.PORT;

app.get('/event', (req,res)=>{
  firebase.database().ref('Event')
  .once('value')
  .then(snapshot => {
    let events = Object.keys(snapshot.val()).map(key => {
      return Object.assign({id:key}, snapshot.val()[key])
    })
    if(req.query.category){
      console.log("IT WORKS", req.query.category)
      events = events.filter(event => {
        return event.Categories.includes(req.query.category)
      })
      console.log("EVENTS", events)
    }
    res.json(events)
  })
});

app.get('/event/:id', (req,res)=>{
  let eventID = req.params.id
  firebase.database().ref('Event/'+eventID)
  .once('value')
  .then(snapshot => {
    res.json(snapshot.val())
  })
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
  firebase.auth().signInAnonymously()
  .then(()=>{
    let now = Date.now()
    firebase.database()
    .ref('/Event/'+now.set(req.body,(err)=>{
      if(err){
        console.error(err.message, err.stack);
        res.status(500).send({error: 'cannot add event'});
      }
      else res.json({message: 'event posted', eventId: now});
    }))
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
  // ngrok.connect((e,r)=>{
  //   console.log(r);
  // })
});
