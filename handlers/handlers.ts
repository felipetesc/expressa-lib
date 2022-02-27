enum RouteType{
  URL, REGEX, 
}

// handlers must to implement IHandler
interface IRoute{
  path(value : string): [string, RouteType];
}
// routes can define how to deal with url requests
// a route can be defined as 
class Route implements IRoute{
  path(value: string): [string, RouteType] {
    throw new Error("Method not implemented.");
  }
}

// handlers must to implement IHandler
interface IHandler{
  handler(request: Request): Response;
}
// We can have several routes and call an undefined number of handlers for each url
class Handler implements IHandler{

  handler(request: Request): Response {
    throw new Error("Method not implemented.");
  }
}

class DefaultErrHandler extends Handler{
  handler(request: Request): Response {
    let body = "Error: 403 Forbidden\n Your identity is known";
    return new Response(body, { status: 403 });
  }
}

class ExpressaApp{
  #routesHandlers : Map<string, Handler>;
  #configs : object | undefined;
  
  constructor(configs? : object | undefined )
  { 
    this.#configs = configs ? configs : undefined;
    this.#routesHandlers = new Map<string, Handler>();
  }
  
  toString() : string {
    let res : string = ""; 
    return res;
  }
  
  instanceOf() : Map<string, Handler>{
    return this.#routesHandlers;
  }
  
  exists(url : string): boolean{
    return this.#routesHandlers.has(url);
  }
  
  getResponseByURL(url : string, req : Request): Response{
    return this.#routesHandlers.get(url)?.handler(req)!; 
  }
  
  addRouteHandlerMap(handlers : Map<string, Handler>){
    handlers.forEach((v,k)=>{
      if(this.exists(k))throw new Error(`URL ${k} already contains handler`);
      else{
        this.#routesHandlers.set(k, v);
      } 
    });
  }

  appendRouteHandler(url : string , route : Handler){
    if(this.exists(url))throw new Error(`URL ${url} already contains handler`);
    else{
      this.#routesHandlers.set(url, route);
    }
    return this;
  }
  
  addRouteHandler(url : string , route : Handler) : void{
    if(this.exists(url))throw new Error(`URL ${url} already contains handler`);
    else{
      this.#routesHandlers.set(url, route);
    } 
  }
}

export {Handler, DefaultErrHandler, ExpressaApp};