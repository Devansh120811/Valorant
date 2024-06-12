import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import userrouter from './routes/user.routes.js'
import teamsRegisrouter from './routes/teamRegis.routes.js'
const app = express()
app.use(cors({
    origin: process.env.CORS_URL,
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
}))
app.use(express.json({
    limit: "1gb"
}))
app.use(express.urlencoded({
    limit: "1gb",
    extended: true
}))
app.use(cookieParser())
app.use(express.static("public"))
app.use("/", userrouter)
app.use("/", teamsRegisrouter)
export default app