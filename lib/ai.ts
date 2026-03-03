export async function analyzeReviews(reviews: any[]) {
  const prompt = `
You are an AI movie analyst.

Based on the following audience reviews, provide:

1. A concise summary (3-4 sentences)
2. Overall sentiment classification: Positive, Mixed, or Negative

Return the response strictly in this JSON format:

{
  "summary": "...",
  "sentiment": "Positive | Mixed | Negative"
}

Reviews:
${reviews.map((r) => r.content).join("\n\n")}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Invalid Gemini response");
  }

  // Extract JSON safely
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch {
    throw new Error("Failed to parse AI JSON response");
  }
}
