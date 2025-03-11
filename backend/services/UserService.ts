import User from "../database/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ApiError from "../errorHandler/errorHandler";

class UserService {
    JWT_SECRET = process.env.JWT_SECRET as string;
    className: string;
    constructor() {
        this.className = this.constructor.name;
    }

    validateEmail(email: string){
        return email.trim().toLowerCase()
    }

    async getUserFromToken(token: string | undefined){
        if (!token) {
            throw ApiError.forbidden("token is empty", this.className)
        }
        jwt.verify(token, this.JWT_SECRET, (err, user) => {
            console.log(user);
            
            if (err) throw ApiError.forbidden("token is not valid", this.className) // Если токен невалиден
            return user
        });
    }

    async registration(email : string, password : string) {

        let candidate = await User.findOne({where: {email}})

        if (candidate){
            throw ApiError.badRequest("email is already registered", this.className)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });

        const token = jwt.sign({ userId: user.id }, this.JWT_SECRET , { expiresIn: '1h' });
        return {
            token: token,
            email: user.email 
        }
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (!user){
            throw ApiError.notFound("user not found", this.className)
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, this.JWT_SECRET , { expiresIn: '1h' });
            return { token: token, email: user.email };
        }
        
        throw ApiError.badRequest("wrong password", this.className)
        
    }
}

export default new UserService();