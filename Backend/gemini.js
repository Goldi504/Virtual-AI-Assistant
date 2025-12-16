import axios from "axios";

const geminiResponse = async (command,assistantName,userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL; 
    const prompt =`You are a virtual assistant named ${assistantName} create by ${userName}.
    You are not Google . You will now behave like a voice-enabled assistant.
    
    Your task is to understand the user's natural language input and respond with a JSON object like this:
    {
    "type":"general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | 
    "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
     "userInput": "<original user input> " {only remove your name from userinput if exists}  and agar kisi ne google ya youtube pe kuch 
     serch karne ko bola hai to userInput me only serch bala text jaye , 
     "response":"<a spoken response to red out lound to the user >"
     }
      Instructions:
      - "type":determine the intent of the user.
      - "userinput": original sentence the user spoke.
      - "response": A short voice-friendly reply , e.g. , " Sure,playing it now " , "Here,s what I found " , " Today is Tuesday" , etc.
      
      Type meaning:
      - "general": if its a factual or informational question.
      - " google-search": if user wants to search somthing on Google.
      - " youtuble-search":  if user wants to search somthing on Youtube.
      - " youtube-play" : if user wants to directly play a video or song.
      - "calculate-open": if user want to open calculator.
      - " instagram-open":  if user want to search somthing onopen instagram.
      - " facebook-open": if user want to open facebook.
      - " weather-show":  if user want to know weather.
      - " get-time": if user want to current time.
      - "get-date": if user want to Today date.
      - "get-day": if user asks what day it is.
      -"get-month": if user asks for the current month.
      
      Important:
      - Use ${userName} agar koi puche tum kisne bnaya 
      - Only respond with the JSON object , nothing else.
       now your userInput-${command}`
    
    // FIX 1: variable name should match below

    const result = await axios.post(
      apiUrl, // FIX 2: apiURl !== apiUrl (capitalization mistake)
      {
        "contents": [
          {
            "parts": [
              {
                "text": prompt   // FIX 3: use parameter, not static text
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY   // FIX 4: Gemini requires API key header
        }
      }
    );

    console.log(result.data);
    return result.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export default geminiResponse;
