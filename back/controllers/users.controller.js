const UserModel = require('../models/users.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports.postUser = async (req, res) => {
    const {email, password } = req.body;

    try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        email: email,
        password: hashedPassword,
    });

    res.status(201).json({ message: user._id });
    } catch (error) {
    res.status(400).json({ error });
    }
}



module.exports.loginUser = async (req,res) => {

    const { email, password } = req.body;
    try{
      const user = await UserModel.findOne({ email });
      if(!user){
        return res.status(400).send({message : 'Invalid email'});
      }

      const isValidPassword = await user.verifyPassword(password);
      if (!isValidPassword) {
        return res.status(400).send({message : 'Invalid password'});
      }
      
      const token = jwt.sign({ userId: user._id }, jwtSecret,{ expiresIn: '24h' });

      res.status(200).send({token,userId : user._id})
    }catch(error){
      res.status(400).send({message : 'Invalid User or Password'})
    }

};
