import { Request, Response, NextFunction } from 'express';

class TokenService  {
    className: string;
    constructor() {
        this.className = this.constructor.name;
    }

    getUserInfoFromToken(req : Request){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1] || "";
        return token;
    }
}

export default new TokenService();