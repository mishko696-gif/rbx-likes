export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const gameId = req.query.gameId || '76207848507298';
    
    try {
        const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${gameId}`);
        const data = await response.json();
        
        if (data.data && data.data[0]) {
            const gameData = data.data[0];
            const votes = {
                upVotes: gameData.voting.upVotes || 0,
                downVotes: gameData.voting.downVotes || 0,
                total: (gameData.voting.upVotes || 0) + (gameData.voting.downVotes || 0)
            };
            
            res.status(200).json(votes);
        } else {
            res.status(404).json({ error: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
