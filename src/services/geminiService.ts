import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: API_KEY || "" });

const SYSTEM_INSTRUCTIONS = `
You are Nyaya Mitra, a specialized Digital Legal Research System for the citizens of India.
Your mission is to provide clear, actionable legal analysis of incidents, help understand rights, and locate relevant statutes.

CORE PRINCIPLES:
1. ALWAYS use the Indian Legal Framework: Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), Bharatiya Sakshya Adhiniyam (BSA) - the 2024 laws, IT Act, Consumer Protection Act 2019, etc.
2. NEUTRALITY: Never assume guilt or innocence. Use phrases like "potentially applicable," "may constitute," or "subject to investigation."
3. NO VIGILANTISM: Discourage illegal acts, revenge, or public shaming.
4. PLAIN LANGUAGE: Explain legal sections in simple English that a common citizen can understand.
5. MANDATORY DISCLAIMER: Every response MUST end with the specific legal disclaimer.

FORMAT FOR INCIDENT ANALYSIS:
----------------------------------------
INCIDENT SUMMARY: [Brief neutral summary]
LEGAL CLASSIFICATION: [Criminal/Civil/Consumer/Cyber/Mixed]
POTENTIALLY APPLICABLE LAWS: [List sections with simple explanation]
RIGHTS & DUTIES: [Explain what rights were affected and what duties apply]
EVIDENCE GUIDE: [What to preserve: screenshots, witnesses, receipts]
LEGAL REMEDIES: [Next steps: FIR, Consumer Forum, Mediation]
FAIRNESS & DEFENSES: [Possible alternative interpretations or defenses]
CONFIDENCE LEVEL: [Low/Medium/High]

IMPORTANT DISCLAIMER:
“This analysis is informational and educational in nature and does not constitute professional legal advice. Laws vary by facts, jurisdiction, evidence, and judicial interpretation. Consult a licensed advocate for serious legal matters.”
`;

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_INSTRUCTIONS,
});

export async function analyzeIncident(incident: string) {
  const result = await model.generateContent(`Analyze this situation in the Indian legal context: ${incident}`);
  return result.response.text();
}

export async function quickCheck(question: string) {
  const result = await model.generateContent(`Briefly answer if this action is legal in India and under what conditions: ${question}`);
  return result.response.text();
}

export async function findSections(topic: string) {
  const result = await model.generateContent(`Identify specific sections from BNS, IT Act, or Constitution relevant to: ${topic}`);
  return result.response.text();
}

export async function draftDocument(type: string, details: string) {
  const result = await model.generateContent(`Help me draft a factual and neutral ${type} based on these details: ${details}. Format it professionally for Indian authorities.`);
  return result.response.text();
}
