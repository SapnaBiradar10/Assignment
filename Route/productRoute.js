//product -pid, pname,qty,price,category,orderedDate,---getAllproduct,addProdut

const Product = require('../modles/productModule')
const express = require('express');
const router = express.Router();


// 1. Add new a Product
router.post("/addNewProduct", async (req, res) => {

    try {
        const { pid, pname, qty, price, category, orderDate } = req.body;
        const product = new Product({ pid, pname, qty, price, category, orderDate });
        await product.save();
        res.status(201).json("Product Added Successfully");
    }
    catch (error) {
        res.status(400).json(" Error Occured");
    }
})

// 2. Get All Products
router.post("/products", async (req, res) => {
    try {
        const product = await Product.insertMany(req.body)
        res.status(201).json("Product Added Successfully");
    }
    catch (error) {
        res.status(400).json(" Error Occured");
    }

})
//3.find All Products 
router.get('/getAllProducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json("Error Occured");
    }
})
// 4. Get a Product by ID
router.get('/getProductById/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json("Error Occured");
    }
})
// 5. Update a Product
router.put('/updateProduct/:pid', async (req, res) => {
    try {
        const id = req.params.pid.trim();
        const { pid, pname, qty, price, category, orderDate } = req.body;
        const product = await Product.findByIdAndUpdate(id, { pid, pname, qty, price, category, orderDate }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
});


// 6. Delete a Product
router.delete("/delete/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

router.get('/sortByAnything', async (req, res) => {
    try {
        const products = await Product.find().sort({ pid: 1, pname: 1, category: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error Occurred", error: error.message });
    }
});

// 6. Get Products by Category
router.get("/getByCategory/:category", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

router.get("/getByCategory", async (req, res) => {
    try {
        const products = await Product.find({ category: req.query.category });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

// 7. Get Products by Price Range
router.get("/getByPriceRange", async (req, res) => {
    try {
        const { min, max } = req.query;
        const products = await Product.find({ price: { $gte: min, $lte: max } })
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

// 8. Get Products Sorted by Price
router.get("/sortByPrice", async (req, res) => {
    try {
        const products = await Product.find().sort({ price: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json("Error occurred");
    }

});
// 9. Get Products Sorted by Ordered Date
router.get("/sortByDate", async (req, res) => {
    try {
        const products = await Product.find().sort({ orderedDate: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

// 10. Get Products by Quantity Available
router.get("/getByQuantity", async (req, res) => {
    try {
        const products = await Product.find({ qty: { $gte: req.query.qty } });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

// 11. Search Products by Name
router.get("/searchByName", async (req, res) => {
    try {

        const products = await Product.find({ pname: { $regex: req.query.pname, $options: "i" } });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});

// 12. Get Recently Ordered Products
router.get("/getRecentlyOrdered", async (req, res) => {
    try {
        const products = await Product.find().sort({ orderedDate: -1 }).limit(5);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: "Error occurred" });
    }
});


module.exports = router;