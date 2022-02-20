const mongoose = require('mongoose')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kqyom.mongodb.net/millenivisionDatabase?retryWrites=true&w=majority`;

const connectDb = async (req, res) => {
    try {
        const connectionDb = await mongoose.connect(uri, {
            useNewUrlParser: true, useUnifiedTopology: true}
        );
        console.log(`MongoDB Seccesfully Connected: ${connectionDb.connection.host}`)
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }

}
module.exports = connectDb;