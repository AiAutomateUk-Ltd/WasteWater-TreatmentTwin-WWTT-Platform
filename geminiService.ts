import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generatePlantInsight(prompt: string): Promise<string> {
  if (!ai) {
    return 'Gemini API key not configured. Set GEMINI_API_KEY to enable AI insights.';
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text ?? 'No response generated.';
}

export async function explainMaintenanceForecast(
  assetName: string,
  failureRisk: number,
  context: string
): Promise<string> {
  const prompt = `You are an industrial wastewater treatment maintenance advisor. Asset "${assetName}" has a predicted failure risk of ${failureRisk}%. Context: ${context}. In 2-3 sentences, explain the likely cause and recommend a concrete next action for a plant operator.`;
  return generatePlantInsight(prompt);
}
