import { AppConfigs, DatabaseConfigs } from "../utils/configs.ts";


type DBConn = Promise<Record<string, unknown>>;

interface IDatabase{
    connect(dbConfig : DatabaseConfigs) : Promise<DBConn>;
}

class Database implements IDatabase{
    
    // deno-lint-ignore require-await
    async connect(_dbConfig : AppConfigs): Promise<DBConn> {
        throw new Error("Method not implemented.");
    } 
}
export { Database};
export type { DBConn, IDatabase };
