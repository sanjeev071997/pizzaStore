const homeController = require('../app/http/controllers/pages/homeController');
const aboutController = require('../app/http/controllers/pages/aboutController');
const authController = require('../app/http/controllers/auth/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');
const contactController = require("../app/http/controllers/pages/contactController");
const productController = require('../app/http/controllers/admin/productController');

// Middlewares
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');

const multer = require('multer');

const storage = multer.diskStorage({
    // destination for files
    destination:function(req, file, callback){
        callback(null, "./public/uploads/");
    },
    //add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
// upload parameters for multer
const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*3
    },
});


function initRoutes(app) {
    // Pages
    app.get('/', homeController().index); 

    app.get('/about',aboutController().about);

    app.get('/contact',contactController().contact);
    app.post('/contact', contactController().postContact);
    
    // Cart
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);
    
    // Auth
    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);
    
    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    app.post('/logout', authController().logout);
    app.get('/logout', authController().logout);

    // Customer routes
    app.post('/orders',auth, orderController().store); 
    app.get('/customers/orders',auth, orderController().index) 
    app.get('/customers/orders/:id',auth, orderController().show)

    
    // Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index); 
    app.post('/admin/order/status', admin, statusController().update); 
    app.get('/admin/product', admin,productController(). product);
    app.post('/admin/product',upload.single('image'), admin,homeController().postIndex);


     
}
module.exports = initRoutes;
