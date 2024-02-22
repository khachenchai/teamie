import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect to DB");
    } catch (e) {
        console.log("error connecting ", e);
    }
}