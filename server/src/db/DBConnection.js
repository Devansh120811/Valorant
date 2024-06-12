import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'
const connection = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log(`MongoDB Connected Successfully ${connect.connection.host}.`)
    } catch (error) {
        throw new Error("Error while connecting to database.")
    }
}

export default connection