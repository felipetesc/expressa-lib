import { Expressa, AppConfigs, AppContext, Handler } from "../mod.ts";

class Get_HandlerTest extends Handler{
    
  handlerFn(request: Request): Response {
      
      return new Response(request.method.toString(), { status: 200 });
  }
}
class Post_HandlerTest extends Handler{
    
  handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Put_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Head_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Delete_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Patch_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Options_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Connect_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
  class Trace_HandlerTest extends Handler {
    
    handlerFn(request: Request): Response {
        
        return new Response(request.method.toString(), { status: 200 });
      }
  }
const configs = new AppConfigs();
configs.port = 3000;

const appCtx = new AppContext();

appCtx.addRouteHandler("get", "/", new Get_HandlerTest());
appCtx.addRouteHandler("post", "/", new Post_HandlerTest());
appCtx.addRouteHandler("put", "/", new Put_HandlerTest());
appCtx.addRouteHandler("delete","/", new Delete_HandlerTest());
appCtx.addRouteHandler("head","/", new Head_HandlerTest());
appCtx.addRouteHandler("patch","/", new Patch_HandlerTest());
appCtx.addRouteHandler("options","/", new Options_HandlerTest());
appCtx.addRouteHandler("connect","/", new Connect_HandlerTest());
appCtx.addRouteHandler("trace","/", new Trace_HandlerTest());

Expressa.run(configs, appCtx);

