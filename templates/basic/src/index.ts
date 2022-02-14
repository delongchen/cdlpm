import { appConfig } from "./config";
import { app } from "./app";

async function start() {
  console.log(appConfig)
  console.log(app)
}

start().catch(reason => {
  console.log(reason)
})
