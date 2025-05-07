import { MatchDetails } from "../infrastructure/league-client";
import { Player, PlayerStat, persistPlayer, persistPlayerStat } from "../repository";

type SyncPlayersResult = SyncPlayersSuccess | SyncPlayersFailure;
interface SyncPlayersSuccess {
    type: "success";
}

interface SyncPlayersFailure {
    type: "failure";
    error: string;
}

export async function syncPlayers(matchDetails: MatchDetails): Promise<SyncPlayersResult> {
    try {
        const players = extractPlayersFromMatch(matchDetails);
        for (const player of players) {
            await persistPlayer(player);
        }
        return { type: "success" };
    } catch (err) {
        if (err instanceof Error) {
            return { type: "failure", error: err.message };
        }
        return { type: "failure", error: "Unknown error" };
    }
}

function extractPlayersFromMatch(match: MatchDetails): Player[] {
    const players: Player[] = [];

    match.participantIdentities.forEach(participant => {
        const player: Player = {
            playerId: participant.player.puuid,
            displayName: participant.player.gameName,
            profileIcon: participant.player.profileIcon,
            tagLine: participant.player.tagLine,
        };
        players.push(player);
    });

    return players;
}

type SyncPlayerStatsResult = SyncPlayerStatsSuccess | SyncPlayerStatsFailure;
interface SyncPlayerStatsSuccess {
    type: "success";
}

interface SyncPlayerStatsFailure {
    type: "failure";
    error: string;
}
export async function syncPlayerStats(matchDetails: MatchDetails): Promise<SyncPlayerStatsResult> {
    try {
        const players = extractPlayerStatsFromMatch(matchDetails);
        for (const player of players) {
            await persistPlayerStat(player);
        }
        return { type: "success" };
    } catch (err) {
        if (err instanceof Error) {
            return { type: "failure", error: err.message };
        }
        return { type: "failure", error: "Unknown error" };
    }
}

function extractPlayerStatsFromMatch(match: MatchDetails): PlayerStat[] {
    const playerStats: PlayerStat[] = [];

    const participantIdToPlayerIdMap: Record<number, string> = {};
    match.participantIdentities.forEach(participant => {
        participantIdToPlayerIdMap[participant.participantId] = participant.player.puuid;
    });

    match.participants.forEach(participant => {
        const stat: PlayerStat = {
            playerId: participantIdToPlayerIdMap[participant.participantId],
            championId: participant.championId,
            kills: participant.stats.kills,
            deaths: participant.stats.deaths,
            assists: participant.stats.assists,
            visionScore: participant.stats.visionScore,
            goldEarned: participant.stats.goldEarned,
            damageDealt: participant.stats.totalDamageDealtToChampions,
            damageTaken: participant.stats.totalDamageTaken,
            wardsPlaced: participant.stats.wardsPlaced,
            wardsCleared: participant.stats.wardsKilled,
            gameDate: new Date(match.gameCreationDate),
            gameId: match.gameId,
            gameDuration: match.gameDuration,
            position: (() => {
                switch (participant.timeline.lane) {
                    case "TOP":
                        return "TOP";
                    case "JUNGLE":
                        return "JUNGLE";
                    case "MIDDLE":
                        return "MID";
                    case "BOTTOM":
                        return participant.timeline.role === "CARRY" ? "ADC" : "SUPPORT";
                    default:
                        return "ADC";
                }
            })(),


        };
        playerStats.push(stat);
    });

    return playerStats;
}