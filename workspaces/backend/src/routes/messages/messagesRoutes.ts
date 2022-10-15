import MessageItem from "@chatapp/shared"
import express, { Request, Response, Router } from "express"

const messagesRouter = express.Router()

const MESSAGES: MessageItem[] = [
    { id: "123", text: "Hello", timeStamp: new Date(), user: "Theo" }
]

// API that returns MessageItem as an object
messagesRouter.get("/", (req: Request, res: Response<MessageItem[]>) => {
    res.send(MESSAGES)
})

messagesRouter.post("/", (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
    const messageItem = req.body
    MESSAGES.push(messageItem)
    res.send(MESSAGES)
})

export default messagesRouter