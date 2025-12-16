import { response } from "express"
import geminiResponse from "../gemini.js"
import User from "../models/user.model.js"
import moment from "moment/moment.js"

export const getCurrentUser = async (res, req) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({ message: "get current user error" })

    }
}

export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body
        let assistantImage;
        if (req.file) {
            assistantImage = await uploadOnCloudinary(req.file.path)
        }
        else {
            assistantImage = imageUrl
        }
        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName, assistantImage
        }, { new: true }).select("-password")
        console.log(`user`, user);

        return res.status(200).json(user)

    } catch (error) {
        console.log('update error: ', error);

        return res.status(400).json({ message: "updateAssistant error" })

    }
}

export const askToAssistant = async (req, res)=>{
    try {
        const user = await User.findById(req.userId);
        const{command} = req.body
        const userName = user.name
        const assistantImage = user.assistantImage
        const assistantName = user.assistantName
        const result  = await geminiResponse(command , assistantName, userName  )
        const jsonMatch= result.match(/{[\s\S]*}/)
        if(!jsonMatch){
            return res.status(400).json({response:"Sorry, i cant understand"})
        } 
        const gemResult = JSON.parse(jsonMatch[0])
        const type = gemResult.type

        switch(type){
            case 'get-date' :
                return res.json({
                    type,
                    userInput : gemResult.userInput, 
                    response:`current date is ${moment() . format("YYYY-MM-DD")}`
                });
                 case 'get-time' :
                return res.json({
                    type,
                    userInput : gemResult.userInput, 
                    response:`current time is ${moment() . format("hh:mmA")}`
                });
                case 'get-day' :
                return res.json({
                    type,
                    userInput : gemResult.userInput, 
                    response:`today is ${moment() . format("dddd")}`
                });
                 
                case 'get-month' :
                return res.json({
                    type,
                    userInput : gemResult.userInput, 
                    response:`today is ${moment() . format("MMMM")}`
                });
            
                
                case 'google-search':
                 case 'youtube-search':
                case 'youtube-play':
                case 'general':
                case 'calculator-open':
                 case 'instagram-open':
                case 'facebook-open':
                 case'weather-show':
                 return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:gemResult.response,
                 })
                 default :
                 return res.status(400).json({response:" i didn,t understand that command."})

                };
                                            
            

        
    } catch (error) {
         return res.status(500).json({response:" ask assistant error"})
        
    }
}