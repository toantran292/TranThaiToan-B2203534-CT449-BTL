import * as http from "http";

import configs from "./config";
import App from "./app";
import logger from "./utils/logger";

const port = configs.portNumber;
const server = http.createServer(App);

server.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

export default server;
