import { PlayerStat } from ".";
import { findDocument, insertDocument, updateDocument } from "../../infrastructure/mongo";

export async function getPlayerStatByGameAndPlayerId(playerId: string, gameId: number): Promise<PlayerStat | null> {
    const playerStat = await findDocument<PlayerStat>("player-stats", { playerId, gameId });
    return playerStat;
}

export async function persistPlayerStat(playerStat: PlayerStat): Promise<void> {
    const existingPlayerStat = await getPlayerStatByGameAndPlayerId(playerStat.playerId, playerStat.gameId);
    if (!existingPlayerStat) {
        await insertDocument("player-stats", playerStat);
    } else {
        await updateDocument("player-stats", { playerId: playerStat.playerId, gameId: playerStat.gameId }, playerStat);
    }
}