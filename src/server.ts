import "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors" //p tratar os erros vindo dos controllers
import {router} from "./routes"; //importando rotas


import "./database"

const app = express();

// precisamos dizer p/ express que irá receber um JSON então app.use

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next:NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    })
})

app.listen(3000, () => console.log("Server is running."));