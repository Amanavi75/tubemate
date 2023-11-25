const asyncHandler = (requestHandler) =>{
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}
//* using promise method 


export {asyncHandler};


//const asyncHandler = (fn) => async(req,res,next) => {
// try {
//   await fn(req,res,next)
    
//} catch (error) {
//   res.status(err.code || 500).json({ //* .json will be helpful for frontend developer 
//  success: false,
//  message: err.message
//         })
//     }
//  }
//* try catch method to use asyncHandler 


