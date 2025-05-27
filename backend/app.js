const  express = require('express');
const  app = express();
const userR= require('./Route/userRoute');
const authRoutes = require('./Route/authRoutes');
const productR= require('./Route/productRoute');
const WishlistR=require('./Route/wishlistRoute');
const cors = require('cors');
app.use(cors());
 
require("./config")

app.use(express.json())


app.use("/",userR)
app.use("/",authRoutes)
app.use("/",productR)
app.use("/",WishlistR)


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

//8yRFsPATNmcfX3Ja   sapnabiradar506     I1MSs08h0SQoezZM
//mongodb+srv://sapnabiradar506:8yRFsPATNmcfX3Ja@sapna.grnyxuz.mongodb.net/?retryWrites=true&w=majority&appName=sapna
//mongodb+srv://sapnabiradar506:I1MSs08h0SQoezZM@inventary-management-db.iuwq4j3.mongodb.net/?retryWrites=true&w=majority&appName=Inventary-management-DB