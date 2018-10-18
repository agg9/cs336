//Author: Austin Gibson
// lab07 ajax

$( document ).ready(function() {
        $( "#buttonPress" ).click(function( event ) {
            
             $.ajax({
            url: "/hello",
            data: {
                name: "lab07"
            },
            type: "GET",
            })

            .done(function ( json_string ){
                const json = JSON.parse(json_string);
                $("body").append("<p>" + json.message + "</p>");
                //$("<em>", json.message).appendTo("body");
                
                alert("ajax request success");
            })

            .fail(function(xhr, status, errorThrown) {
                alert("ajax request failed");
            })


        });
        
    });



	
 