import User from "../database/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ApiError from "../errorHandler/errorHandler";
import validator from 'validator';

class UserService {
    JWT_SECRET = process.env.JWT_SECRET as string;
    className: string;
    constructor() {
        this.className = this.constructor.name;
    }

    validateEmail(email: string) {
        if (!email) {
            throw ApiError.badRequest("email is empty", this.className);
        }

        const isValid = validator.isEmail(email.trim().toLowerCase());
        if (isValid) {
            return email.trim().toLowerCase();
        }
        throw ApiError.badRequest("email is not valid", this.className);
    }

    validatePassword(password: string) {
        if (password.length >= 5 && password.length <= 16){
            // Проверка на наличие хотя бы одной заглавной буквы (A-Z)
            const hasUpperCase = /[A-Z]/.test(password);

            // Проверка на наличие хотя бы одной строчной буквы (a-z)
            const hasLowerCase = /[a-z]/.test(password);

            // Проверка на наличие хотя бы одной цифры (0-9)
            const hasNumber = /[0-9]/.test(password);

            // Проверка на отсутствие специальных символов
            const hasSpecialChar = /[!@#$%^&*()]/.test(password);

            // Проверка на отсутствие пробелов
            const hasSpace = /\s/.test(password);

            const hasNonLatin = /[^A-Za-z0-9]/.test(password);

            // Пароль должен соответствовать всем требованиям и не содержать специальных символов
            if (
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                !hasSpecialChar &&
                !hasSpace &&
                !hasNonLatin
            )  {
                return password
            }
            throw ApiError.badRequest("Пароль Должен содержать цифру, строчную и заглавную букву латинского алфавита и быть от 5 до 16 символов", this.className);
        }
        throw ApiError.badRequest("Пароль Должен содержать цифру, строчную и заглавную букву латинского алфавита и быть от 5 до 16 символов", this.className);
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
    async getUserIdFromToken(token: string): Promise<string | null> {
        try {
          // Верифицируем токен
          const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      
          // Возвращаем userId из payload токена
          return decoded.userId;
        } catch (error) {
          // Если токен невалидный (истек срок действия или подпись неверна)
          console.error('Invalid token:', error);
          return null;
        }
      }

    async registration(email : string, password : string) {

        let candidate = await User.findOne({where: {email}})

        if (candidate){
            throw ApiError.badRequest("email is already registered", this.className)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });

        const token = jwt.sign({ userId: user.uid }, this.JWT_SECRET , { expiresIn: '1h' });
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
            const token = jwt.sign({ userId: user.uid }, this.JWT_SECRET , { expiresIn: '1h' });
            return { token: token, email: user.email };
        }
        
        throw ApiError.badRequest("wrong password", this.className)
        
    }
}

export default new UserService();