$(document).ready(function(){
    $("#InviteButton").on("click",handleInviteForm);
    $("#Add")





    function handleInviteForm(event){
        event.preventDefault();
        console.log("this");
        var emailInput = $("#email").val().trim()
        console.log(emailInput);
        if (!emailInput){
            return
        } else{
            var requestData = {email: emailInput};
            var url = window.location.href;
            var urlSplit = url.split("/")
            var tripId = urlSplit[urlSplit.length - 1];
            $.post("/api/trip/addtrip/" + tripId,requestData, function(res){
                console.log(res);
                if(res.error){
                    $("#EmailMessage").text(res.message)
                } else{
                    $("#EmailMessage").text("User added to invite list");    
                }
            })        
        }
        
    }
})