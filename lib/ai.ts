export async function analyzeReviews(reviews: any[]) {
  const prompt = `
Analyze the following movie audience reviews.

Return a JSON response with:
1. A short summary (3–4 sentences)
2. Overall sentiment: Positive, Mixed, or Negative

Return ONLY valid JSON like this:

{
  "summary": "...",
  "sentiment": "Positive | Mixed | Negative"
}

Reviews:
${reviews.map((r) => r.content).join("\n\n")}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
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

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Invalid Gemini response");
  }

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch {
    return {
      summary: text,
      sentiment: "Mixed",
    };
  }
}
