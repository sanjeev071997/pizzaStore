const Menu = require('../../../models/menu');

function homeController() {
    return {
        async index(req, res) {
            const pizzas  = await Menu.find()
            // console.log(pizzas) 
            return res.render('pages/home', { pizzas: pizzas })
        }
    }
}

module.exports = homeController
