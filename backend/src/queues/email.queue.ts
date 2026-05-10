import { Queue } from "bullmq";
import { redis } from "../config/redis.config";
import { QUEUE_NAMES } from "./queueName";
import { logger } from "../config/logger";

export type EmailJobData =
  | {
      type: "verification";
      name: string;
      email: string;
      token: string;
      clientUrl: string;
    }
  | {
      type: "password-reset";
      name: string;
      email: string;
      token: string;
      clientUrl: string;
    };

export const emailQueue = new Queue<EmailJobData>(QUEUE_NAMES.EMAIL, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export const addVerificationEmailJob = async (
  data: Extract<EmailJobData, { type: "verification" }>,
): Promise<void> => {
  await emailQueue.add("send-verification-email", data);
  logger.info(`Verification email job added for ${data.email}`);
};

export const addPasswordResetEmailJob = async (
  data: Extract<EmailJobData, { type: "password-reset" }>,
): Promise<void> => {
  await emailQueue.add("send-password-reset-email", data);
  logger.info(`Password reset email job added for ${data.email}`);
};
