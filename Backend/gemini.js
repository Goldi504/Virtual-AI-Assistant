import axios from "axios";

const geminiResponse = async (prompt) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL; 
    
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
