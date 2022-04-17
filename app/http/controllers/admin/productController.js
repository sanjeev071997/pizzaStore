function productController() {
    return {
        product(req, res) {
            res.render('admin/product')
        }
    }
}

module.exports = productController;