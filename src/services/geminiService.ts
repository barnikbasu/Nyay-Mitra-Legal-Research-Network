import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY || "" });
const MODEL = "gemini-3-flash-preview";

const INSTRUCTIONS = `
You are Nyaya Mitra, a digital legal research system for citizens of India.
Your mission is to help people understand Indian laws using clear, simple language while promoting ethical behavior.

PRINCIPLES:
- Factual and neutral.
- Never assume guilt.
- Use current frameworks (BNS, BNSS, BSA 2024).
- Distinguish between different legal spheres (Criminal, Civil, Consumer, etc.).
- Always include the mandatory disclaimer at the end.

RESPONSE FORMAT (FOR ANALYSIS):
----------------------------------------
INCIDENT SUMMARY
LEGAL CLASSIFICATION
POTENTIALLY APPLICABLE LAWS
RIGHTS & DUTIES
EVIDENCE GUIDE
LEGAL REMEDIES
FAIRNESS & DEFENSES
CONFIDENCE LEVEL
IMPORTANT DISCLAIMER
----------------------------------------
“This analysis is informational and educational in nature and does not constitute professional legal advice. Laws vary by facts, jurisdiction, evidence, and judicial interpretation. Consult a licensed advocate for serious legal matters.”
`;

async function callModel(prompt: string) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: { systemInstruction: INSTRUCTIONS }
  });
  return response.text || "Output failed.";
}

export const analyzeIncident = (incident: string) => 
  callModel(`Deeply analyze this incident within India's legal framework: ${incident}`);

export const quickCheck = (question: string) => 
  callModel(`Briefly answer if this action is legal in India: ${question}`);

export const findSections = (topic: string) => 
  callModel(`Identify specific legal sections (BNS, IT Act, etc) relevant to: ${topic}`);

export const draftDocument = (type: string, details: string) => 
  callModel(`Draft a factual ${type} based on: ${details}. Professional and neutral.`);
