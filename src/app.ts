import { syncPlayers, syncPlayerStats } from "./domain";
import { getMatchDetails } from "./infrastructure/league-client/league-client";
import { initMongoClient } from "./infrastructure/mongo";
import minimist from "minimist";

import { config } from "dotenv";
config();

const args = minimist(process.argv.slice(2), {
    alias: {
        m: "match",
    },
});
console.log('Parsed args:', args);

(async () => {
    try {
        await initMongoClient();
        console.log("Starting application...");

        const match = await getMatchDetails(args.match);
        if (!match) {
            console.error("Match not found");
            process.exit(1);
        }
        const syncPlayerResult = await syncPlayers(match);
        if (syncPlayerResult.type === "failure") {
            console.error("Failed to sync players: ", syncPlayerResult.error);
            process.exit(1);
        }
        console.log("sync player result: ", syncPlayerResult);

        const syncPlayerStatResult = await syncPlayerStats(match);
        if (syncPlayerStatResult.type === "failure") {
            console.error("Failed to sync player stats: ", syncPlayerStatResult.error);
            process.exit(1);
        }
        console.log("sync player stat result: ", syncPlayerStatResult);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();