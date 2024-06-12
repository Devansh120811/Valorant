import dotenv from 'dotenv'
import app from './app.js'
import connection from './db/DBConnection.js'
dotenv.config({
    path: './.env'
})
connection().then(() => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...`)
    })
}).catch((err) => {
    console.log("Error:", err)
});


