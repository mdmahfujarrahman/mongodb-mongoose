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