require('dotenv').config(); // Loads .env

const mongoose = require('mongoose');

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    return mongoose.connection.db.listCollections().toArray();
})
.then(collections => {
    console.log("Collections in your database:", collections.map(c => c.name));
    process.exit(0); // Exit script
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
});
