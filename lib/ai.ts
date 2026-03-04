export async function analyzeReviews(reviews: any[]) {
  const prompt = `
Analyze the following audience movie reviews.

Return JSON in this format:
{
  "summary": "3-4 sentence summary of audience opinion",
  "sentiment": "Positive | Mixed | Negative"
}

Reviews:
${reviews.map((r) => r.content).join("\n\n")}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
    const text = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${text}`);
  }

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return {
      summary: "AI analysis unavailable.",
      sentiment: "Mixed",
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      summary: text,
      sentiment: "Mixed",
    };
  }
}
