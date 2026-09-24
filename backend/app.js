import express  from "express"
import { startDb } from "./config/database.js"

const app=express()

app.use(express.json())

const port=3005

app.listen(port, async()=>{
        await startDb()
        console.log('corriendo en el puerto ', port)
    })