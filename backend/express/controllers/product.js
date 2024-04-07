const rootDir=require('../util/path');
const path=require('path');
const fs = require('fs');
const Product=require('../modules/product')

exports.getAddProduct=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'));
} 

exports.postAddProduct=(req,res,next) => { 
    const product=new Product(req.body.title);
    product.save();
    res.redirect("/")
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        const filePath = path.join(__dirname, '..', 'views', 'shop.html');

        fs.readFile(filePath, 'utf-8', (err, fileContent) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }

            // Create HTML list items for each product
            const productListHtml = products.map(product => `<li>${product.title} <a href="/product/${product.id}" >Details</a></li>`).join('');

            // Inject the product list into the shop.html file
            const modifiedHtml = fileContent.replace('<!-- Product items will be dynamically inserted here -->', productListHtml);

            // Send the modified HTML as the response
            res.status(200).send(modifiedHtml);
        });
    });
};

