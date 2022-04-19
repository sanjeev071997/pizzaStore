const Menu = require('../../../models/menu');
const cloudinary = require('cloudinary');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

function homeController() {
    return {
        async index(req, res) {
            const pizzas  = await Menu.find()
            return res.render('pages/home', { pizzas: pizzas })
        },
        async postIndex(req, res) {
            const result =await cloudinary.v2.uploader.upload(req.file.path)
            const {name, price, size} = req.body 
            const image = req.file.filename
          // Validate request
          if (!name && !image && !price && !size) {
             req.flash('error', 'All fields are required');
             req.flash('name', name);
             req.flash('image', image);
             req.flash('price', price);
             req.flash('size', size);
             return res.redirect('/admin/product');
         }
           // Create product 
           const menus = new Menu({
             name: name,
             image: result.secure_url,
             price: price,
             size: size,
         })
         menus.save().then((menus) => {
             req.flash('error', 'Create product! ');
             return res.redirect('/login')
         }).catch(err => {
             req.flash('error', 'Something went wrong')
             return res.redirect('/login')
         })
            
        }
    }
}

module.exports = homeController;
