import express, { Application, json, Request, Response } from "express"
import cors from "cors"
import MessageItem from "@chatapp/shared"

const app: Application = express()
app.use(cors())
app.use(json())
const port: number = parseInt(process.env.SERVER_PORT || "3001")

// API that returns MessageItem as an object
app.get("/messages", (req: Request, res: Response<MessageItem>) => {
    res.send({
        id: "123",
        text: "Hello",
        timeStamp: new Date(),
        user: "get user by id" // TODO - get user information with a function
    })
})

app.listen(port, function () {
    console.log(`App is listening on port ${port}`)
})