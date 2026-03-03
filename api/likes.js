export default async function handler(req, res) {
    try {
        const PLACE_ID = "76207848507298";

        const universeResponse = await fetch(
            `https://apis.roblox.com/universes/v1/places/${PLACE_ID}/universe`
        );

        const universeData = await universeResponse.json();
        const universeId = universeData.universeId;

        const voteResponse = await fetch(
            `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`
        );

        const voteData = await voteResponse.json();

        res.status(200).json({
            likes: voteData.data[0].upVotes,
            dislikes: voteData.data[0].downVotes
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch likes" });
    }
}
