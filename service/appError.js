const appError = (httpStatus,errMessage,next)=>{
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOperational = true; // 是否為預期內錯誤
    return error;
}

module.exports = appError;