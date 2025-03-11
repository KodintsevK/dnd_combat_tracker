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

    static badRequest(message: string, point?:string): ApiError {
        const status = 400;
        return new ApiError(status, message, point);
    }

    static internal(message: string, point?:string): ApiError {
        const status = 500;
        return new ApiError(status, message, point);
    }

    static unauthorized(message: string, point?:string): ApiError {
        const status = 401;
        return new ApiError(status, message, point);
    }

    static forbidden(message: string, point?:string): ApiError {
        const status = 403;
        return new ApiError(status, message, point);
    }

    static notFound(message: string, point?:string): ApiError {
        const status = 404;
        return new ApiError(status, message, point);
    }

    static notImplemented(message: string, point?:string): ApiError {
        const status = 501;
        return new ApiError(status, "Не реализовано", point);
    }
}

export default ApiError;