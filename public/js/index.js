'use strict';
const CATEGORIES = [
    'Educational',
    'Social',
    'Sports',
    'Food',
    'Arts',
    'Health & Wellness',
    'Senior',
    'Career'
];

var LOCATIONS = [
    { Organizer: 'John Doe', Center: 'Abrons Arts Center', Address: '466 Grand St, New York, NY 10002' },
    { Organizer: 'Jane Doe', Center: 'ATTAIN Computer Lab', Address: '211 Jefferson St, Staten Island, NY 10306' },
    { Organizer: 'Jim Doe', Center: 'Boys & Girls Republic' },
    { Organizer: 'Jen Doe', Center: 'Community Consultation Center', Address:'40 Montgomery St, New York, NY 10002' },
    { Organizer: 'John Doe', Center: 'Early Childhood Education Center', Address: '40 Montgomery St, New York, NY 10002' },
    { Organizer: 'John Doe', Center: 'Healthcare Insurance Access Program' },
    { Organizer:'Jen Doe', Center:'Health Unlimited Family Medical Center', Address: 'Health Unlimited Family Medical Center'},
    { Organizer: 'Jen Doe', Center: 'Henry Street Settlement Senior Center',Address: '334 Madison St, New York, NY 10002' },
    { Organizer: 'Jim Doe', Center: 'Home Planning Workshop',Address: ''},
    { Organizer:'Jim Doe', Center: 'Workforce Development Welcome Center/Jobs Plus',Address: '335 E 111th St, New York, NY 10029'}
];

LOCATIONS = LOCATIONS.map(function(_){
    if(!_.hasOwnProperty('Address')){ // Can't find address on Google Maps
        _.Address = _.Center       
    }
    return _;
 });

var rootURL = 'https://us-central1-hackerstreet-2b6df.cloudfunctions.net/api/';

/**
 *
 * @param {{}} formData
 */
function addEvent(formData){
    //if (CATEGORIES.indexOf(){}
    console.log(data);
    $.ajax(rootURL+'event/add',{
        method: 'POST',
        dataType: 'json',
        crossDomain: true,
        data: JSON.stringify(formData),
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function(data){
            console.dir(data);
        },
        fail(a,b,c){
            console.error(b);
        }
    });
}

function populateCategories() {
    // categoriesDiv
    var catDiv = document.getElementById('categoriesDiv')
    CATEGORIES.forEach(category => {
        var categoryButton = document.createElement('button')
        categoryButton.className = "categoryButton"
        categoryButton.innerText = category
        categoryButton.onclick = onFilter
        catDiv.appendChild(categoryButton)
    })
}

var events = []
var filter = ''

function initialize() {
    retrieveEvents()
    populateCategories()
}

function onFilter(evt) {
    console.log("evt.target: " + evt.target.innerText)
    filter = evt.target.innerText
    populateEventsList()
}

function populateEventsList() {
    var theUL = document.getElementById('eventList')
    while (theUL.firstChild) {
        theUL.removeChild(theUL.firstChild)
    }
    var eventsToUse = filter != '' ?
        events.filter(event => {
            return (event.Categories && event.Categories.includes(filter))
        }) :
        events
    
    eventsToUse.forEach(event => {
        var li = document.createElement("li")
        li.style['list-style'] = 'none'
        var eventDiv = document.createElement('div')
        eventDiv.className = "eventDiv"
        var divLeft = document.createElement('div')
        divLeft.className = 'eventDivLeft'
        var theImg = document.createElement('img')
        theImg.src = 'http://via.placeholder.com/200x150'
        divLeft.appendChild(theImg)
        var divRight = document.createElement('div')
        divRight.className = 'eventDivRight'
        var eventTitle = document.createElement('h3')
        eventTitle.innerText = event.Name
        divRight.appendChild(eventTitle)
        var eventDate = document.createElement('p')
        var eventTime = document.createElement('p')
        eventDate.innerText = event.Date
        eventTime.innerText = event.Time
        divRight.appendChild(eventDate)
        divRight.appendChild(eventTime)
        var signUpBtn = document.createElement('button')
        signUpBtn.className = "signUpButton"
        signUpBtn.innerText = "Sign Up"
        divRight.appendChild(signUpBtn)
        eventDiv.appendChild(divLeft)
        eventDiv.appendChild(divRight)
        li.appendChild(eventDiv)
        theUL.appendChild(li)
    })
    console.log("after for loop")
}

function retrieveEvents() {
    $.ajax('https://us-central1-hackerstreet-2b6df.cloudfunctions.net/api/event', {
        method: 'GET',
        success: function (eventsRetrieved) {
            // eventList
            events = eventsRetrieved
            console.log("got back events")
            populateEventsList()
        },
        fail(a,b,c) {
            console.error(b);
        }
    })
}

$(function(){
    $('#calendar_add_event').click(function(e){
        e.preventDefault();
        // TODO: toggle Add Event visibility
    });

    $('#calendar_add_event_form_submit').click(function(e){
        e.preventDefault();
        var formData = {
            ID: Date.now(),
            Name: $('input[name="calendar_add_event_form_name"]').val(),
            Description: $('input[name="calendar_add_event_form_description"]').val(),
            Date: $('input[name="calendar_add_event_form_date"]').val(),
            Time: $('input[name="calendar_add_event_form_time"]').val(),
            Categories: [$('#calendar_add_event_form_categories').val() ],
            Attendees: [],
            Organizer: $('#calendar_add_event_form_organizer').val(),
            PointOfContact: $('#calendar_add_event_form_contact').val()
        };
        addEvent(formData);
    });
});

$(document).ready(function() {
    $('.calendar_carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true
      });
})
