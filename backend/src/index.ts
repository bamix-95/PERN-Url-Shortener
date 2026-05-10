import app from "./app";
import { Env } from "./config/env.config";
import { logger } from "./config/logger";
import "./workers/email.worker";

const PORT = Env.PORT;

app.listen(PORT, () => {
  logger.info(`⚡ Server running on port ${PORT}`);
  logger.info(`🌍 Environment: ${Env.NODE_ENV}`);
  logger.info(`🔗 Base URL: ${Env.BASE_URL}`);
});
