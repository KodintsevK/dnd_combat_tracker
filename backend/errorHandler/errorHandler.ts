class ApiError extends Error {
    status: number;
    message: string;
    point: string | null;

    constructor(status: number, message: string, point?: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.point = point ? point : null;
    }

    /**
     * Плохой запрос 400
     * @param message 
     * @param point 
     * @returns 
     */
    static badRequest(message: string, point?:string): ApiError {
        const status = 400;
        return new ApiError(status, message, point);
    }

    /**
     * Проблема сервера 500
     * @param message 
     * @param point 
     * @returns 
     */
    static internal(message: string, point?:string): ApiError {
        const status = 500;
        return new ApiError(status, message, point);
    }

    /**
     * Неавторизован 401
     * @param message 
     * @param point 
     * @returns 
     */
    static unauthorized(message: string, point?:string): ApiError {
        const status = 401;
        return new ApiError(status, message, point);
    }
    /**
     * Нет доступа 403
     * @param message 
     * @param point 
     * @returns 
     */
    static forbidden(message: string, point?:string): ApiError {
        const status = 403;
        return new ApiError(status, message, point);
    }
    /**
     * Не найден 404
     * @param message 
     * @param point 
     * @returns 
     */
    static notFound(message: string, point?:string): ApiError {
        const status = 404;
        return new ApiError(status, message, point);
    }

    /**
     * Не реализован 501
     * @param message 
     * @param point 
     * @returns 
     */
    static notImplemented(message: string, point?:string): ApiError {
        const status = 501;
        return new ApiError(status, "Не реализовано", point);
    }
}

export default ApiError;