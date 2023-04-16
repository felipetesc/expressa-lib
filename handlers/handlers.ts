// deno-lint-ignore-file
import { AppConfigs } from "../utils/configs.ts";
import {log} from "../deps/deps.ts";
import { AssetsBufferizer } from "../utils/data.ts";

interface IHandlerFactory{
  handlerFn(request: Request): Response;
}


function HandlerFn(request: Request): Response{
  return new Response("", { status: 200 });
}

class Handler implements IHandlerFactory{
  handlerFn(request: Request): Response{
    return new Response("", { status: 200 });
  }
}
class DefaultErrHandler extends Handler{

  handlerFn(request: Request, message = "Error: 403 Forbidden\n Your identity is known"): Response { 
    log.critical(message);
    return new Response(message, { status: 403 });
  }
}
class FaviconHandler extends Handler{

  handlerFn(request: Request): Response { 
    const body = AssetsBufferizer.getDataFromRelPath("../assets/favicon.ico");
    return new Response(body, { status: 200 });
  }
}
type HttpMethod = string;
type Url = string;
type SharedState = Map<string, Record<string, unknown>>;

class MethodUrlHandler{
  public method? : HttpMethod;
  public url? : Url;
  public handler? : Handler;
  public static state: SharedState;
}


class MappedHandlers extends Array<MethodUrlHandler> {
  
  constructor(){
    super();
  }

  hasUrl(url : string) : boolean{
    
    if(this.length === 0) return false;
    for(var index in this){
      if(url === this[index].url){
        return true;
      }
    }
    return false;
  }
  hasHandler(method:HttpMethod, url : string) : boolean{
    
    if(this.length === 0) return false;
    for(var index in this){
      if(url === this[index].url && method === this[index].method){
        return true;
      }
    }
    return false;
  }

  getHandlerIfExists( method: HttpMethod, url : string) : Handler | undefined{
    

    for (let index = 0; index < this.length; index++) {
      if(url === this[index].url && method.toUpperCase() === this[index].method!.toUpperCase()){
        const bufHandlerFn  = this.at(index)!.handler;
        return bufHandlerFn;
      }
    }
    return undefined;
  }

  getHandler( method: HttpMethod, url : string) : Handler | undefined{
    if(this.length > 0) {
      this.forEach((element)=>{
        if(url === element.url && method === element.method){
          return element.handler;
        }
      });
    }
    return undefined;
  }
}

class AppContext{
  
  static #sharedObjects : SharedState = new Map();
  
  #mappedHandlers : MappedHandlers;
  
  #configs : AppConfigs | undefined;
  
  constructor(configs? : AppConfigs | undefined )
  { 
    this.#configs = configs ? configs : undefined;
    this.#mappedHandlers = new MappedHandlers();
  }

  addRouteHandler(method: HttpMethod, url : Url, handler : Handler){
    
    console.log(`Trying to add new handler for the method ${method} and url ${url}`);
    
    if(this.#mappedHandlers.hasHandler(method.toUpperCase(), url)){
      
      throw Error(`Method ${method} for url ${url} already in use.`);
    
    }else{
      const newMappedHandler = new MethodUrlHandler();
      console.log(`Created new handler: ${newMappedHandler.toString()}.`);
      newMappedHandler.method = method.toUpperCase();
      newMappedHandler.url = url;
      newMappedHandler.handler = handler;
      console.log(`Handler method: ${newMappedHandler.method}.`);
      console.log(`Handler url: ${newMappedHandler.url}.`);
      console.log(`Handler handler: ${newMappedHandler.handler}.`);
      this.#mappedHandlers.push(newMappedHandler);
      console.log(`Current handlers number is ${this.#mappedHandlers.length}`);
    }
  }
  getHandlers() : MappedHandlers{
    return this.#mappedHandlers!;
  }
  hasMiddleware(objectKey : string) : boolean {
    return AppContext.#sharedObjects.has(objectKey);
  }
  
  registerMiddleware(objectKey : string, obj : Record<string, unknown>){
    
    if(this.hasMiddleware(objectKey)){
      
      const id = AppContext.#sharedObjects.get(objectKey)!;
      new Error(`Object with the same name already exists. Object id is ${ id.toString() }`);
      
    }else{
      
      AppContext.#sharedObjects.set(objectKey, obj);
    }
  }
  
  getMiddleware(objectKey : string) : Record<string, unknown> | undefined{
    if(this.hasMiddleware(objectKey)){
      return AppContext.#sharedObjects.get(objectKey);
    }
    return undefined;
  }
}
export type {IHandlerFactory,  SharedState, HttpMethod, Url};
export { FaviconHandler, DefaultErrHandler, Handler, HandlerFn, AppContext, MethodUrlHandler};