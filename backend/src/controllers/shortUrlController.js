import {ShortURL} from "../models/shorturl.model.js"
import {nanoid} from "nanoid";

export const createShortURL = async(req, res) => {
    const { originalUrl, title, customUrl } = req.body;
    if(!originalUrl){
        return res.status(401).json({message: "Original URL is required"});
    } 
    try{
        let shortCode;
        if(customUrl){
            const present = await ShortURL.findOne({ shortCode: customUrl });
            console.log(present);
            if(present){
                return res.status(400).json({message: "CustomUrl already in use, Use a different one"});
            }
            shortCode = customUrl;
        }

        else{
            shortCode = nanoid(7);
            let present = await ShortURL.findOne({ shortCode });
            while(present){
                shortCode = nanoid(7);
                present = await ShortURL.findOne({ shortCode });
            }
        }

        const newUrl = await ShortURL.create({originalUrl, shortCode, title, userId: req.user.id})
        return res.status(200).json(newUrl);
    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error !"});
    }
}

export const redirect = async (req, res) => {
   try {
       const { shortCode } = req.params;
       const record = await ShortURL.findOne({ shortCode });
       if (!record) {
           return res.status(404).json({ message: "Invalid ShortCode" });
       }
       res.redirect(record.originalUrl);
   } catch (error) {
       return res.status(500).json({ message: "Internal Server Error" });
   }
}


export const updateShortURL = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const { originalUrl, title } = req.body;
        const record = await ShortURL.findOneAndUpdate(
            { shortCode, userId: req.user.id },
            { originalUrl, title },
            { new: true }
        );
        if (!record) return res.status(404).json({ message: "Not found" });
        return res.status(200).json(record);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteShortURL = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const record = await ShortURL.findOneAndDelete({ shortCode, userId: req.user.id });
        if (!record) return res.status(404).json({ message: "Not found" });
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default createShortURL;
