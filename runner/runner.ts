import { format } from "../deps/deps.ts";
import { AppConfigDefaults, AppConfigs } from "../utils/configs.ts";
import { AppContext, DefaultErrHandler, FaviconHandler } from "../handlers/handlers.ts";

function ServerBuilder(configs: AppConfigs | AppConfigDefaults): Deno.Listener {
  if (configs instanceof AppConfigs) {
    configs.port = configs.port !== undefined ? configs.port : 3000;
  }
  const server = Deno.listen({ port: configs.port });
  const getUTCDate = new Date();
  const NOW = format(getUTCDate, "dd-MM-yyyy");
  console.log(`Starting server at port: ${configs.port} at ${NOW}`);
  return server;
}

async function RunForever(configs: AppConfigs | AppConfigDefaults, ctx: AppContext, _safeExit = true) {

  const errHandler = new DefaultErrHandler();

  const server = ServerBuilder(configs);

  for await (const conn of server) {
    (async () => {
      const favicon = new FaviconHandler();
      const httpConn = Deno.serveHttp(conn);
      for await (const requestEvent of httpConn) {
        const req = requestEvent.request;
        const url = new URL(req.url).pathname;
        console.log(`URL is  ${url}`);
        const method = req.method.toUpperCase();
        console.log(`req method  ${method}`);

        if (method === "GET" && url === "/favicon.ico") {
          requestEvent.respondWith(favicon.handlerFn(req));
        } else {
          const handler = ctx.getHandlers().getHandlerIfExists(method, url)!;

          if (handler !== undefined) {
            requestEvent.respondWith(handler.handlerFn(req));
          }
          else {
            console.log(`Route doesn't exists`);
            console.log(`Create your custom handlers to deal the issue.`);
            requestEvent.respondWith(
              errHandler.handlerFn(req)
            );
          }
        }
      }
    })();
  }
}

class Expressa {
  private static create(port: number): Deno.Listener {
    const PORT = port;
    const server = Deno.listen({ port: PORT });
    const getUTCDate = new Date();
    const NOW = format(getUTCDate, "dd-MM-yyyy");
    console.log(`Starting server at port: ${PORT} at ${NOW}`);
    return server;
  }
  static async run(configs: AppConfigs | AppConfigDefaults, ctx: AppContext, safeExit = true) {
    await RunForever(configs, ctx, safeExit);
  }
}

export { Expressa, ServerBuilder, RunForever };