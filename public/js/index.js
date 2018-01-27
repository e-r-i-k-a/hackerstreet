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
/**
 *
 * @param {{}} formData
 */
function addEvent(formData) {
    //if (CATEGORIES.indexOf(){}
    $.ajax('/events/add', {
        method: 'POST',
        dataType: 'json',
        data: formData,
        success: function (data) {
            console.dir(data);
        },
        fail(a, b, c) {
            console.error(b);
        }
    });
}

function populateCategories() {
    // categoriesDiv
    var catDiv = document.getElementById('categoriesDiv')
    CATEGORIES.forEach(category => {
        var categoryButton = document.createElement('button')
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
        var div = document.createElement('div')

        li.innerText = event.Name
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
        fail(a, b, c) {
            console.error(b);
        }
    })
}

$(function () {
    $('#calendar_add_event').click(function (e) {
        e.preventDefault();
        // TODO: toggle Add Event visibility
    });

    $('#calendar_add_event_form_submit').click(function (e) {
        e.preventDefault();
        var formData = {
            ID: Date.now(),
            Name: $('input[name="calendar_add_event_form_name"]').val(),
            Description: $('input[name="calendar_add_event_form_description"]').val(),
            Date: $('input[name="calendar_add_event_form_date"]').val(),
            Time: $('input[name="calendar_add_event_form_time"]').val(),
            Categories: [$('#calendar_add_event_form_categories').val()],
            Attendees: [],
            Organizer: $('#calendar_add_event_form_organizer').val(),
            PointOfContact: $('#calendar_add_event_form_contact').val()
        };
        //addEvent(formData);
        console.log(formData);
    });
});

$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 2,
    // asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
});
