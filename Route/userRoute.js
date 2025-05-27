const User = require('../modles/userModule');
const express = require('express');
const router = express.Router();


router.post("/addNewUser", async (req, res) => {

    try {
        const { name, email, age, createdAt } = req.body;
        const user = new User({ name, email, age, createdAt });
        await user.save();
        res.status(201).json("User Added Successfully");
    }
    catch (error) {
        res.status(400).json(" Error Occured");
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json("Error Occured");
    }
})


router.get('/getUserId/:_id', async (req, res) => {
    try {
        const users = await User.findById(req.params._id);

        if (!users) {
            return  res.status(404).json("User Not Found");
        }
    
            res.status(200).json(users);
    
    }
    catch (error) {
        res.status(400).json({message:Error.message});
    }
})

router.get('/getUserEmail/:email', async (req, res) => {
    try {
        const users = await User.findOne({ email: req.params.email });
        res.status(200).json(users);

    }
    catch (error) {
        res.status(400).json("Error Occured");
    }
})

router.get("/getAllusers", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json("Error Occured");
    }
})

router.put('/updateUser/:_id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!user) {
            return res.status(404).json("User Not Found");
        }

        res.status(200).json(user);
    }
    catch (error)
    {
        res.status(400).json({ message: Error.message });
    }
})

router.delete('/deleteUser/:_id', async (req, res) => {
    try {
    
    const user = await User.findByIdAndDelete(req.params._id);
        if (!user) {
            return res.status(404).json("User Deleted Successfully");
        }

        res.status(200).json(user);
    }
    catch (error)
    {
        res.status(400).json({ message: Error.message });
    }
})

//sort by email id :- 


router.get('/sortByEmail', async (req, res) => {
    try {
    
        const users = await User.find().sort({ email:1 }); // 1 for ascending, -1 for descending
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json("Error Occurred");
    }
});



module.exports = router;
