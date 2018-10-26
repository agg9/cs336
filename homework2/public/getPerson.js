/* 
 * getPerson.js is the javascript file to display a certain users information
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
            url: '/getPerson',
            type: "POST",
            data: form.serialize(),
            dataType: 'json'
        })
        .done( function(result){
		
			$("body").append(JSON.stringify(result));
        })
        .fail(function(xhr, status, errorThrown) {
           alert("Error:  ajax request failed");
       }) 
    });
});  