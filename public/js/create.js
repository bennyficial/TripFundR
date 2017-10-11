$(document).ready(function(){
    $("#create").on("click",handleCreateForm);


function handleCreateForm (event) {
    event.preventDefault();
    $.ajax({
            url: "/api/trip/new",
            method: "POST",
            data: {
              title: $("#title").val().trim(),
              destination: $("#destination").val().trim(),
              description: $("#description").val().trim(),
              date: $("#date").val().trim()
            }

          }).done(function(res) {
            
            var tripid = res.tripInfo.id;
        //    return res.redirect("/api/trip/" + tripid);
        location.replace("/api/trip/" + tripid)
        
          });
        }
});



        
        