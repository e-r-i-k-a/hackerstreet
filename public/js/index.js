var CATEGORIES = [
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
function addEvent(formData){
    //if (CATEGORIES.indexOf(){}
    $.ajax('/events/add',{
        method: 'POST',
        dataType: 'json',
        data: formData,
        success: function(data){
            console.dir(data);
        }
    });
}