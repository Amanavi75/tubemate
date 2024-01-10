//* creating the error class so we woild be able to lookout out error in better ways in production grade

class ApiError extends Error {
    constructor(
        statusCode,
        message= "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors


        if (stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}

//* its a custom error class that we have made extending the inbuilt error class in express 
// custom error for api