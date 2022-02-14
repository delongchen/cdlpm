import CdlKoa from "cdl-koa";

const app = new CdlKoa({
  cors: true,
  async interceptor(ctx, next): Promise<void> {
    await next()
  }
})

export {
  app
}
