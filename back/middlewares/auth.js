const jwt = require('jsonwebtoken');
 
module.exports.checkAuth = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       if(userId){
        req.auth = {
            userId: userId
        };
        next();
       }else{
        res.status(401).json({error});
       }
   } catch(error) {
    res.status(401).json({error});
   }
};