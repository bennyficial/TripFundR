$(document).ready(function(){
    $("#InviteButton").on("click",handleInviteForm);
    $("#bringButton").on("click", handleBringButton);

    function handleInviteForm(event){
        event.preventDefault();
        var emailInput = $("#email").val().trim()
        if (!emailInput){
            return
        } else{
            var requestData = {email: emailInput};
            var url = window.location.href;
            var urlSplit = url.split("/")
            var tripId = urlSplit[urlSplit.length - 1];
            $.post("/api/trip/addtrip/" + tripId,requestData, function(res){
                if(res.error){
                    $("#EmailMessage").text(res.message)
                } else{
                    $("#EmailMessage").text("User added to invite list");    
                }
            })        
        }
    }

    function handleBringButton (event) {
        event.preventDefault();
        var invId = $(this).attr("data-item");
        $.ajax({
            url: "/api/trip/inventory/update/" + invId,
            method: 'PUT'
        }).done(function(res) {
            var url = window.location.href;
            var urlSplit = url.split("/")
            var tripId = urlSplit[urlSplit.length - 1];
            location.replace("/api/trip/" + tripId);
        });
    }
});
