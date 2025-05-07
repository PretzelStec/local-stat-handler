export * from "./league-client";

export interface MatchDetails {
    gameCreationDate: number;
    gameDuration: number;
    gameId: number;
    participantIdentities: ParticipantIdentity[];
    participants: Participant[];
}

export interface Participant {
    championId: number;
    highestAchievedSeasonTier: string;
    participantId: number;
    spell1Id: number;
    spell2Id: number;
    stats: Stats;
    teamId: number;
    timeline: Timeline;
}

export interface Stats {
    assists: number;
    causedEarlySurrender: boolean;
    champLevel: number;
    combatPlayerScore: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    doubleKills: number;
    earlySurrenderAccomplice: boolean;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstInhibitorAssist: boolean;
    firstInhibitorKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    gameEndedInEarlySurrender: boolean;
    gameEndedInSurrender: boolean;
    goldEarned: number;
    goldSpent: number;
    inhibitorKills: number;
    killingSprees: number;
    kills: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicalDamageTaken: number;
    neutralMinionsKilled: number;
    neutralMinionsKilledEnemyJungle: number;
    neutralMinionsKilledTeamJungle: number;
    objectivePlayerScore: number;
    participantId: number;
    pentaKills: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    quadraKills: number;
    sightWardsBoughtInGame: number;
    teamEarlySurrendered: boolean;
    timeCCingOthers: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalMinionsKilled: number;
    totalPlayerScore: number;
    totalScoreRank: number;
    totalTimeCrowdControlDealt: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
}

export type Lane = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM";
export type Role = "SOLO" | "SUPPORT" | "CARRY" | "NONE";

export interface Timeline {
    creepsPerMinDeltas: { [key: string]: number };
    csDiffPerMinDeltas: { [key: string]: number };
    damageTakenDiffPerMinDeltas: { [key: string]: number };
    damageTakenPerMinDeltas: { [key: string]: number };
    goldPerMinDeltas: { [key: string]: number };
    lane: Lane;
    role: Role;
    laneType: string;
    participantId: number;
}


export interface ParticipantIdentity {
    participantId: number;
    player: Player;
}

export interface Player {
    accountId: number;
    currentAccountId: number;
    currentPlatformId: string;
    gameName: string;
    matchHistoryUri: string;
    platformId: string;
    profileIcon: number;
    puuid: string;
    summonerId: number;
    summonerName: string;
    tagLine: string;
}
