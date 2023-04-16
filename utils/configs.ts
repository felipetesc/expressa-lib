class AppConfigDefaults{
    
    readonly port : number = 3000;
    readonly name : string = "expressa";
    readonly version : string = "0.0.5";
    readonly author : string =  "expressa";
    readonly license : string = "Mit";
    readonly database : DatabaseConfigs | undefined;

}

class AppConfigs{
    
    private _port = 3000;
    public get port(): number {
        return this._port;
    }
    public set port(value: number) {
        this._port = value;
    }
    
    private _name = "eXpressa";
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    private _version = "0.0.5";
    public get version(): string {
        return this._version;
    }
    public set version(value: string) {
        this._version = value;
    }
    
    private _author = "expressa";
    public get author(): string {
        return this._author;
    }
    public set author(value: string) {
        this._author = value;
    }
    
    private _license = "Mit";
    public get license(): string {
        return this._license;
    }
    public set license(value: string) {
        this._license = value;
    }

    private _database: DatabaseConfigs | undefined;
    public get database(): DatabaseConfigs | undefined {
        return this._database;
    }
    public set database(value: DatabaseConfigs | undefined) {
        this._database = value;
    }



    

}

class DatabaseConfigs{
    
    public name? : string;
    public host? : string;
    public port? : number;
    public user? : string;
    public pass? : string;
  
}

export { AppConfigs, AppConfigDefaults, DatabaseConfigs };
