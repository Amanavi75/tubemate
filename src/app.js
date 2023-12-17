import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"; 
//* cookieParser is  used to access the browser cookie of server and also use to set it 

const app = express();

app.use(cors({     
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
//* using cors middleware ( cross origin resourse sharing)
//* app.use is used for middlewares and configuaration

app.use(express.json({limit:"16kb"}))  
//used to configure json
// in earlier time we have to use to body parser 

app.use(express.urlencoded({extended:true, limit:"16kb"}))  
// extended is true means we can give objects inside the objects 

app.use(cookieParser())
//* cookieParser is  used to access the browser cookie of server and also use to set it 


app.use(express.static("public"))  // used to acess the public folder or files from the local 




//router import

import useRouter from './routes/user.routes.js'   
// importing user route 

export {app}