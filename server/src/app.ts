import { config } from "@root/config";
import setupdb from "@root/db";
import Server from "@root/server";
import express from 'express';

class Application {
  public init(): void {
    this.loadConfig();
    setupdb();
    const app: express.Application = express();
    const server: Server = new Server(app);
    server.start();
  }
  private loadConfig(): void {
    config.validateConfig()
  }
}

const application: Application = new Application();
application.init();
