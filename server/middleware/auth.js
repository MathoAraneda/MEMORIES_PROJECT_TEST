import Jwt from "jsonwebtoken";

//el middleware, confirma o deniega una accion 
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if(token && isCustomAuth){
            decodedData = Jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }else{
            decodedData = Jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log("error", error);
    }
}

export default auth;