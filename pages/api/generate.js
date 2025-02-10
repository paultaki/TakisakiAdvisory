export default async function handler(req, res) {
    console.log("✅ DEBUG: OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Loaded" : "MISSING");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("❌ ERROR: Missing API Key!");
        return res.status(500).json({ error: "Missing API key" });
    }

    try {
        const { prompt } = req.body;
        console.log("✅ DEBUG: Received Prompt:", prompt);

        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4",
                prompt: prompt,
                max_tokens: 150
            })
        });

        console.log("✅ DEBUG: OpenAI Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ ERROR: OpenAI API Error:", errorText);
            throw new Error(`OpenAI API error: ${errorText}`);
        }

        const data = await response.json();
        console.log("✅ DEBUG: OpenAI Response Data:", data);

        return res.status(200).json(data);
    } catch (error) {
        console.error("❌ ERROR: Server Crash:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
