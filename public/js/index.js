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

var rootURL = 'https://us-central1-hackerstreet-2b6df.cloudfunctions.net/api/';

/**
 *
 * @param {{}} formData
 */
function addEvent(formData){
    //if (CATEGORIES.indexOf(){}
    var data = JSON.stringify(formData);
    console.log(data);
    $.ajax(rootURL+'event/add',{
        method: 'POST',
        dataType: 'json',
        crossDomain: true,
        data: data,
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
