const Contact = require("../../../models/contact");

function contactController() {
    return {
        contact(req, res) {
            res.render('pages/contact')
        },
        postContact(req, res) {
           const {name, email, phone, message} = req.body
         // Validate request
         if (!name && !email && !phone && !message) {
            req.flash('error', 'All fields are required');
            req.flash('name', name);
            req.flash('email', email);
            req.flash('phone', phone);
            req.flash('message', message);
            return res.redirect('/contact');
        }
          // Create a contact user 
          const contacts = new Contact({
            name: name,
            email: email,
            phone: phone,
            message: message,
        })
        contacts.save().then((contacts) => {
            req.flash('error', 'Thank You For Your Time! ');
            return res.redirect('/contact')
        }).catch(err => {
            req.flash('error', 'Something went wrong')
            console.log(err);
            return res.redirect('/contact')
        })
           
       }
    }
}




module.exports = contactController;
