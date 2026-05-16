import {User} from "../models/user/user.model.js";
import {ShortURL} from "../models/shorturl.model.js";

export const getUserDetails = async(req, res) => {
    try{
        const { id } = req.user;
        const record = await User.findById(id);
        return res.status(200).json(record);
    }
    catch(error){
        return res.status(500).json({ message : "Internal Server Error"});
    }
}

export const getUserURLs = async(req, res) => {
    try{
        const { id } = req.user;
        const shortURLs = await ShortURL.find({ userId: id });
        return res.status(200).json({ shortURLs });
    }
    catch(error){
        return res.status(500).json({ message : "Internal Server Error"});
    }
}