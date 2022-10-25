const Product = require("../Models/products");

exports.getProductService = async () => {
    //const products = await Product.find({ status: { $ne: "out-of-stock" } });

    //$in operator
    //const products = await Product.find({ name: { $in: ['Monitor', "Type C"] } });

    //projection(we can send selected object property) also if we use - before property name send we can also send object without this property
    //const products = await Product.find({},'name quantity');

    // const products = await Product.find({}).where("name").equals("Monitor")

    // const product = await Product.findById(undefined);

    const products = Product.find({});

    return products;
};


exports.addProductService = async(data) => {
    const product = await Product.create(data);
    return product
}

exports.updateProductService = async(req) => {
    const {id} = req.params

    const updateInfo = await Product.updateOne({_id: id}, { $inc : req.body },{
        runValidators: true
    })

    // const product = await Product.findById(id);

    // const result= await product.set(req.body).save()
    
    return updateInfo;
}
exports.bulkUpdateProductService = async (req) => {
    // const updateInfo = await Product.updateMany(
    //     { _id: req.body.ids }, req.body.data, {
    //         runValidators: true
    //     }
    // );

    // const product = await Product.findById(id);

    // const result= await product.set(req.body).save()

    const products = []
    req.body.products.forEach((product) => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    });

    const result = await Promise.all(products)


    return result;
};