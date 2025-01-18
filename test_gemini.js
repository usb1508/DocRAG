
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
import fs from "fs";
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Does this cookie look store-bought or homemade?";
const image = {
  inlineData: {
    data: Buffer.from(fs.readFileSync("cookie.jpg")).toString("base64"),
    mimeType: "image/jpg",
  },
};

const result = await model.generateContent([prompt, image]);
console.log(result.response.text());