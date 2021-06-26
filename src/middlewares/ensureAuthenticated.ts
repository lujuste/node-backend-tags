import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response:Response, next:NextFunction) {

    // receber o token 
    const authToken= request.headers.authorization;

    // validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ")
    // validar se token é válido
    
    try {
        const {sub}  = verify( token, "1c5c7896b55a1d863d3376659cb3780c") as IPayload;

        //// recuperar informações do usuário
        request.user_id = sub
        return next();
    } catch(err) {
        return response.status(401).end();
    }

    


}