import { Player } from ".";
import { findDocument, insertDocument, updateDocument } from "../../infrastructure/mongo";

export async function getPlayerById(playerId: string): Promise<Player | null> {
    const player = await findDocument<Player>("players", { playerId });
    return player;
}

export async function persistPlayer(player: Player): Promise<void> {
    const existingPlayer = await getPlayerById(player.playerId);
    if (!existingPlayer) {
        await insertDocument("players", player);
    } else {
        await updateDocument("players", { playerId: player.playerId }, player);
    }
}