/* 
 * addPerson.js is the javascript and AJAX need to send person data to server
 * @Author Austin Gibson
 * CS336 Fall 2018
 *
 */


 "use strict"


$( document ).ready(function() {

    $("form").on( "submit", function(event) {
        event.preventDefault();

        var form = $(this);
        $.ajax({
            url: '/people',
            type: "POST",
            data: form.serialize(),
            dataType: 'json'
        })
        .done(function(result){
            alert("Person creation success!");
        })
        .fail(function(xhr, status, errorThrown) {
           alert("Error:  person unable to be added")
       })
    });
}); 