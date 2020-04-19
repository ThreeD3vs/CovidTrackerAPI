exports.invalidOperationError = (code, message) => {
    let error = new Error(message)
    error.httpStatusCode = code
    return error
}

exports.containsHttpStatusCode = (err) => {
    if(!err.httpStatusCode)
        return false
    return true
}

exports.responseErrorFormated = (res, err) => {
    if(this.containsHttpStatusCode(err))
        res.status(err.httpStatusCode).json({ error: err.message })
    else
        res.status(500).json({ error: 'Ocurred a error' })
}