const SauceModel = require('../models/sauces.model');

/**
 * Gets all sauces from db in an array
 */

module.exports.getAllSauces = async (req,res) => {
    try{
        
        const sauces = await SauceModel.find();

        res.status(200).json(sauces);

    } catch (error) {
    res.status(401).json({ error });
    }
}

/** Get one sauce from db with id requested in params */

module.exports.getOneSauce = async (req,res) => {
    try{
        const id = req.params.id;
        const sauce = await SauceModel.findById(id);
        res.status(200).json(sauce);
    }catch(error){
        res.status(401).json({ error });
    }
}

/** Posts one sauce in the db with a string object for sauce informations and multer for imageUrl */

module.exports.createSauce = async (req,res) => {
    try{
        const sauceObject = JSON.parse(req.body.sauce);

        const sauce = new SauceModel({
            ...sauceObject,
            imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })

        sauce.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })})

    }catch(error){
        res.status(400);
    }
}

/** Deletes one sauce from the db according to the id given in params */

module.exports.deleteSauce = async (req,res) => {
    try{
        await SauceModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Deletion ok"});
    }catch(error){
        res.status(400).json({ error });
    }
}

/** Likes, dislikes or unlikes a given sauce using -1, 0 or 1 in body to
 *  know which kind it is, and userId from auth middleware to know who's 
 *  interacting with the sauce.
 */

module.exports.likeSauce = async (req,res) => {
    try{
        const id = req.params.id;
        const like = req.body.like;
        const userId = req.auth.userId;

        const sauce = await SauceModel.findById(id);

        let likes = sauce.likes;
        let dislikes = sauce.dislikes;
        if(like === 1){
            if(!sauce.usersLiked.includes(userId)){
                sauce.usersLiked.push(userId);
                likes ++;
            }else{
                return res.status(200).json({ message : 'already Liked' });
            }
            sauce.likes = likes
            await sauce.save();
            res.status(200).json({ message : 'sauce liked' });
        }else if(like === 0){
            if(sauce.usersLiked.includes(userId)){
                likes --;
                let arr = [];
                sauce.usersLiked.forEach(user => {
                    if( user != userId){
                        arr.push(userId);
                    }
                });
                sauce.likes = likes;
                sauce.usersLiked = arr;
            }else if(sauce.usersDisliked.includes(userId)){
                dislikes --;
                let arr = [];
                sauce.usersDisliked.forEach(user => {
                    if(user != userId){
                        arr.push(userId);
                    }
                });
                sauce.dislikes = dislikes;
                sauce.usersDisliked = arr;
            }else {
                return res.status(200).json({ message : 'already unliked' });
            }
            await sauce.save();
            res.status(200).json({ message : 'sauce unliked' });
        }else if (like === -1){
            if(!sauce.usersDisliked.includes(userId)){
                sauce.usersDisliked.push(userId);
                dislikes ++;
            }else{
                return res.status(200).json({ message : 'already Disiked' });
            }
            sauce.dislikes = dislikes;
            await sauce.save();
            res.status(200).json({ message : 'sauce disliked' });
        }
        else {
            res.status(400).json({ error : 'error' });
        }
        
    }catch(error){
        res.status(400).json({ error });
    }
}

/** Modifies a given sauce (with params) in a given way, either
 *  with multer and an object, or with the body of the request. 
 */

module.exports.updateSauce = async (req,res) => {
    try{
        const id = req.params.id;
        
        if(req.body.sauce){
            const sauceObject = JSON.parse(req.body.sauce);

            await SauceModel.findByIdAndUpdate(
                id,{
                $set : {
                ...sauceObject,
                imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
            });
            res.status(201).json({ message : 'mise à jour de la sauce effectuée' })
        }
        else if(req.body.userId){
            const {name, manufacturer, description, mainPepper, heat, userId } = req.body;
            await SauceModel.findByIdAndUpdate(id,{
                $set  : {
                    name,manufacturer,description,mainPepper,heat
                }
            })
            res.status(201).json({ message : 'mise à jour de la sauce effectuée' });
        }else{
            res.status(400).json({ error : 'invalid request' });
        }
    }catch(error){
        res.status(400).json({ error });
    }
}