import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for body parsing
app.use(express.json());

// Initialize Gemini Client safely (Lazy check on API endpoints to prevent startup crashes)
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Route: Custom Itinerary generator using Gemini 3.5 Flash
app.post('/api/plan-itinerary', async (req, res) => {
  const { destination, duration, budgetStyle, activitiesStyle } = req.body;

  if (!destination || !duration) {
    return res.status(400).json({ error: 'Destination and duration parameters are required' });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `Create a premium, highly detailed travel itinerary for a trip to ${destination}.
    - Duration: ${duration} Days
    - Spending details: ${budgetStyle}
    - Travel Activity Interest Focus: ${activitiesStyle}
    Include specific authentic attractions from the location, timing, descriptions, estimated localized costs in PKR or USD, and recommendations for high-quality stays fitting the theme.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        destination: { type: Type.STRING },
        duration: { type: Type.NUMBER },
        budgetStyle: { type: Type.STRING },
        activitiesStyle: { type: Type.STRING },
        accommodationSuggestion: { type: Type.STRING, description: 'Best premium lodging or hotel fit for this duration & budget' },
        packingMustHaves: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        days: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              title: { type: Type.STRING, description: 'Daily focus theme' },
              tips: { type: Type.STRING, description: 'Explorer tip for this day' },
              activities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING, description: 'Timings (e.g., 09:00 AM, 02:00 PM, 07:00 PM)' },
                    activity: { type: Type.STRING, description: 'Creative custom activity' },
                    description: { type: Type.STRING, description: 'Vivid description of what the visitor will encounter' },
                    costEstimate: { type: Type.STRING, description: 'Localized cost or "Free"' }
                  },
                  required: ['time', 'activity', 'description']
                }
              }
            },
            required: ['day', 'title', 'activities']
          }
        }
      },
      required: ['destination', 'duration', 'days', 'accommodationSuggestion', 'packingMustHaves']
    };

    const result = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        systemInstruction: 'You are an authority on premium Pakistan tourism. Create rich, luxurious, authentic schedules. Provide only real operational attractions.'
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error('Gemini returned an empty text string');
    }

    const jsonItinerary = JSON.parse(text.trim());
    res.json({ itinerary: jsonItinerary });

  } catch (err: any) {
    console.error('Error in /api/plan-itinerary:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// Configure Vite integration or static file serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Mount Vite middleware
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve HTML page
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Discover Pakistan Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
