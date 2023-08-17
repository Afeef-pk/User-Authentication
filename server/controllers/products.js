const Product = require('../models/product')

module.exports = {
    addProduct: async (req, res, next) => {
        try {
            const { productName, productPrice, productCategory } = req.body
            const productImage = req.file;
            await Product.create({
                name: productName,
                price: productPrice,
                category: productCategory,
                image: productImage?.filename
            })
            res.status(201).json({ message: 'Product added' })
        } catch (error) {
            next(error)
        }
    },
    getProducts: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const productPerPage = 4
            const skip = (page - 1) * productPerPage
            const category = req.query.category
            const priceSortOrder = parseInt(req.query.priceSortOrder);
            const query = {};
            if (category) {
                query.category = category
            }
            const totalProducts = await Product.countDocuments(query)
            let productsQuery = Product.find(query).skip(skip).limit(productPerPage);
            if (priceSortOrder === 1) {
                productsQuery = productsQuery.sort({ price: 1 });
            } else if (priceSortOrder === -1) {
                productsQuery = productsQuery.sort({ price: -1 });
            }

            const products = await productsQuery.exec();
            res.status(201).json({ products, totalProducts })
        } catch (error) {
            next(error)
        }
    }
}
