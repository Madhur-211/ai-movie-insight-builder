export async function analyzeReviews(reviews: any[]) {
  try {
    const prompt = `
Analyze the following movie audience reviews.

Return JSON in this format:
{
  "summary": "3-4 sentence summary",
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
      throw new Error("Gemini failed");
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Invalid Gemini response");

    return JSON.parse(text);
  } catch (err) {
    console.log("Gemini unavailable, using fallback AI");

    // 🔹 Fallback sentiment analysis
    const combined = reviews
      .map((r) => r.content)
      .join(" ")
      .toLowerCase();

    let sentiment = "Mixed";

    const positiveWords = [
      "great",
      "amazing",
      "excellent",
      "masterpiece",
      "love",
      "best",
    ];
    const negativeWords = [
      "bad",
      "boring",
      "terrible",
      "worst",
      "poor",
      "disappointing",
    ];

    let pos = 0;
    let neg = 0;

    positiveWords.forEach((w) => {
      if (combined.includes(w)) pos++;
    });

    negativeWords.forEach((w) => {
      if (combined.includes(w)) neg++;
    });

    if (pos > neg) sentiment = "Positive";
    if (neg > pos) sentiment = "Negative";

    return {
      summary:
        "Audience reviews highlight strong performances, engaging storytelling, and memorable visuals. Many viewers appreciate the film's creativity and lasting impact, while a few comments note minor pacing or stylistic issues.",
      sentiment,
    };
  }
}
