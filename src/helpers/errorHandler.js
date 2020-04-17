exports.invalidOperationError = (code, message) => {
    let error = new Error(message)
    
    error.httpStatusCode = code

    return error
}