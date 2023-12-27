class ApiResponce{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400;        // according to company and respective error the value will be change
    }
}

export { ApiResponce } 