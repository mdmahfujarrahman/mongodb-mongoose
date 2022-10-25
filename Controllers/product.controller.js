const { getProductService, addProductService, updateProductService, bulkUpdateProductService, deleteProductService, deleteProductByIdService, bulkDeleteProductService, findById, updateProductByIdService } = require("../Services/product.services");


exports.getProducts = async (req, res, next) => {
    try {
        
        const products = await getProductService(req.body);

        res.status(200).json({
            status: "success",
            message: "All products get",
            result: products,
            total: products.length,
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
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product not saved",
            error: error.message,
        });
    }
};

exports.updateProductById= async (req, res, next) => {
    try {
        const findProduct = await findById(req.params.id);
        if(!findProduct) {
            res.status(404).json({
                status: "fail",
                error: "Product not found",
            })
        }
        const updateInfo = await updateProductByIdService(req);
        
        res.status(200).json({
            status: "success",
            message: "Product update successfully",
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product not updated",
            error: error.message,
        });
        
    }
}
exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        
        const updateInfo = await bulkUpdateProductService(req);

        res.status(200).json({
            status: "success",
            message: "Product update successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product not updated",
            error: error.message,
        });
    }
};

exports.deleteProductById = async (req, res, next) => {
    try {
        const findProduct = await findById(req.params.id);
        if (!findProduct) {
            res.status(404).json({
                status: "fail",
                error: "Product not found",
            });
        }

        const deleteInfo = await deleteProductByIdService(req);


        if(!deleteInfo.deletedCount){
            return res.status(404).json({
                status: 'Fail',
                message: "Could't delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Product delete successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product not delete",
            error: error.message,
        });
    }
};

exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const deleteInfo = await bulkDeleteProductService(req);

        res.status(200).json({
            status: "success",
            message: "successfully deleted the given Products",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't delete the given Product",
            error: error.message,
        });
    }
};