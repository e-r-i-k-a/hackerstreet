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
            alert('Event successfully created')
            window.location.href = '/';
            console.dir(data);
        },
        fail(a,b,c){
            console.error(b);
        }
    });
}

$(function(){
    for (const cat of CATEGORIES){
        $('#calendar_add_event_form_categories').prepend(
            `<option value="${cat}">${cat}</option>`
        );
    }

    for (const loc of LOCATIONS){
        $('#calendar_add_event_form_organizer').prepend(
            `<option value="${loc.Organizer}">${loc.Center}</option>`
        );
    }

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