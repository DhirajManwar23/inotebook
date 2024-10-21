var jwt = require('jsonwebtoken');
const JWT_SECRET = 'SecretKey@123';

const fethcuser =  (res,req,next) =>{

    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    console.log({token})

    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        
        req.user = data.user;
        next();
    } catch (error) {
      
        console.log("Please authenticate using a valid token")
    }
}

module.exports= fethcuser;