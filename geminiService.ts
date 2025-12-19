
import { GoogleGenAI, Type } from "@google/genai";

// Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePredictiveMaintenance = async (sensorData: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following industrial sensor data for potential maintenance issues. 
    Data: ${JSON.stringify(sensorData)}
    Provide a concise report including prediction, confidence level (0-100), and specific recommendations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          prediction: { type: Type.STRING, description: "A summary of the maintenance prediction." },
          confidence: { type: Type.NUMBER, description: "Confidence percentage." },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of recommended actions."
          }
        },
        required: ["prediction", "confidence", "recommendations"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};

export const analyzeEngineeringDesign = async (params: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Act as a Senior Automation & Control Engineer. Validate the following Digital Twin simulation parameters for potential engineering mistakes, commissioning risks, or physics violations.
    Parameters: ${JSON.stringify(params)}
    Return a DesignValidation object focusing on avoiding costly mistakes.`,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 2000 },
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, enum: ["Safe", "At Risk", "Violation"] },
          efficiencyScore: { type: Type.NUMBER },
          conflicts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                severity: { type: Type.STRING },
                description: { type: Type.STRING },
                mitigation: { type: Type.STRING }
              },
              required: ["type", "severity", "description", "mitigation"]
            }
          }
        },
        required: ["status", "efficiencyScore", "conflicts"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Design validation failed", e);
    return null;
  }
};

export const configureAutomationSolution = async (requirements: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `As an industrial automation consultant, suggest a custom solution based on these client requirements: "${requirements}".
    Provide a solution name, detailed description, list of key hardware/software components, and estimated ROI analysis.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          components: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedROI: { type: Type.STRING }
        },
        required: ["title", "description", "components", "estimatedROI"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return null;
  }
};
