import { OptionalId, Document, WithId } from "mongodb";
import { MongoClient } from "mongodb";

function getConfig() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set");
    }
    if (!process.env.MONGO_DB_NAME) {
        throw new Error("MONGO_DB_NAME is not set");
    }
	return {
		uri: process.env.MONGO_URI,
		dbName: process.env.MONGO_DB_NAME,
	};
}

let client: MongoClient;
export function getMongoClient() {
    if (!client) {
        throw new Error("MongoClient is not initialized. Call initMongoClient first.");
    }
    return client.db(getConfig().dbName);
}

export async function initMongoClient() {
    const config = getConfig();
    console.log("initializing mongo with: ", config);
    if (client) {
        return client.db(config.dbName);
    }
    client = new MongoClient(config.uri);
    await client.connect();
    console.log("MongoDB connected successfully");
    return client.db(config.dbName);
}

export async function insertDocument<T extends OptionalId<Document>>(collectionName: string, document: T) {
    const db = getMongoClient();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(document);
    return result;
}

export async function findDocument<T extends Document>(collectionName: string, query: object): Promise<WithId<T> | null> {
    const db = getMongoClient();
    const collection = db.collection<T>(collectionName);

    const result = await collection.findOne(query);
    return result;
}

export async function findDocuments<T extends Document>(collectionName: string, query: object): Promise<WithId<T>[]> {
    const db = getMongoClient();
    const collection = db.collection<T>(collectionName);

    const result = await collection.find(query).toArray();
    return result;
}

export async function updateDocument<T extends Document>(collectionName: string, query: object, update: Partial<T>) {
    const db = getMongoClient();
    const collection = db.collection<T>(collectionName);

    const result = await collection.updateOne(query, { $set: update });
    return result;
}

export async function deleteDocument<T extends Document>(collectionName: string, query: object) {
    const db = getMongoClient();
    const collection = db.collection<T>(collectionName);

    const result = await collection.deleteOne(query);
    return result;
}



