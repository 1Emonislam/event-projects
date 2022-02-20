require('dotenv').config();
const express = require('express');
const bp = require('body-parser')
const cors = require('cors'); 
const connectDb = require('./config/DB');
const port = process.env.PORT || 5000;
const app = express()
//db connected
connectDb();
//import Custom Routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes')
const communityEventRoutes = require('./routes/communityEventRoutes')
const adminOtpRoutes = require('./routes/adminOtpRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
//middleware
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
//api calling
app.use('/users',userRoutes)
app.use('/api/events',eventRoutes)
app.use('/api/community-events',communityEventRoutes);
app.use('/',adminOtpRoutes)
app.get('/',(req,res) =>{
    res.send("server running")
})

//not found routes
app.use(notFound)
app.use(errorHandler)

app.listen(port,() =>{
    console.log(`listening on http://localhost:${port}`)
})