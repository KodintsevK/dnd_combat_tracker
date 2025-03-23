class BaseService {
    className: string;
    constructor() {
        this.className = this.constructor.name;
    }
}

export default new BaseService();