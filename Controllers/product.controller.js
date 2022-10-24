const { getProductService, addProductService } = require("../Services/product.services");


exports.getProducts = async (req, res, next) => {
    try {
        
        const products = await getProductService(req.body);

        res.status(200).json({
            status: "success",
            message: "All products get",
            result: products,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get product",
            error: error.message,
        });
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        const result = await addProductService(req.body);

        // const product = await Product(req.body);
        // const result = await product.save();

        result.logger();


        res.status(200).json({
            status: "success",
            message: "Product saved successfully",
            result: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product not saved",
            error: error.message,
        });
    }
};