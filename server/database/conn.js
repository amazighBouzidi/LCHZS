import mongoose from "mongoose";

async function connect() {
    const localDbUri = "mongodb://localhost:27017/laboratoire"; // Replace with your local MongoDB URI and database name
    mongoose.set('strictQuery', true);

    try {
        const db = await mongoose.connect(localDbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Other mongoose connection options can be added here
        });
        console.log('Database Connected');
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error;
    }
}

export default connect;
