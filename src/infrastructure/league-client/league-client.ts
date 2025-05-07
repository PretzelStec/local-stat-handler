import { MatchDetails } from ".";

function getLeagueClientConfig() {
    return {
        baseUrl: process.env.RIOT_CLIENT_ENDPOINT,
        authToken: process.env.RIOT_CLIENT_AUTH,
    };
}

export async function getMatchDetails(matchId: string): Promise<MatchDetails> {
    const config = getLeagueClientConfig();
    const response = await fetch(`${config.baseUrl}/lol-match-history/v1/games/${matchId}`, {
        method: "GET",
        headers: {
            "Authorization": "Basic " + Buffer.from(`riot:${config.authToken}`).toString("base64"),
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching match details: ${response.statusText}`);
    }

    return response.json();
}