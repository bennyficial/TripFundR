$(document).ready(function(){
    $("#InviteButton").on("click",handleInviteForm);





    function handleInviteForm(event){
        event.preventDefault();
        console.log("this works");
        var emailInput = $("#email").val().trim()
        if (!emailInput){
            return
        } else{
            var requestData = {email: emailInput};
            var url = window.location.href;
            var urlSplit = url.split("/")
            var tripId = urlSplit[urlSplit.length - 1];
            $.post("/api/trip/addtrip/" + tripId,requestData, function(res){
                $("#EmailMessage").text("User added to invite list");
            })        
        }
        
    }
})