import {connect} from "mongoose";
import "dotenv/config"

const connectDb = async ()=>{
    try {
        const connection = await connect(process.env.MONGO_CONNECTION_STRING as string)
        console.log("database connection successful")
    } catch (error) {
        console.log("error",error)
    }
}

export default connectDb