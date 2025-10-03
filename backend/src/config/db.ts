import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/apartments_app'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('MongoDB connected')
    } catch (err) {
        console.error(err)
        throw new Error('Mongodb Disconnected...')
    }
}