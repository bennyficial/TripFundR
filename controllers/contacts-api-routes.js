var db = require('../models');

module.exports = function(app){
    // NEW TRIP
    app.post('/api/contact/new',function(req,res){
        var new_contact = req.body;
        db.Contact.create(new_contact).then(data =>{
            var id = data.id;
            db.Contact.findOne({
                where: {id:id}
            }).then(dbContact => {
                var returnData = {
                    contactInfo: dbContact
                };
                res.render("index");
            })
        })
    })

    }