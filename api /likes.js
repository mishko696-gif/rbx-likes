export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const universeId = 76207848507298;

    try {
        const response = await fetch(
            `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`
        );

        const data = await response.json();

        if (!data.data || !data.data[0]) {
            return res.status(500).json({ error: "Invalid Roblox response" });
        }

        return res.status(200).json({
            likes: data.data[0].upVotes
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
