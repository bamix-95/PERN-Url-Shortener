import { Worker } from "bullmq";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/sendEmail";
import { logger } from "../config/logger";
import type { EmailJobData } from "../queues/email.queue";
import { QUEUE_NAMES } from "../queues/queueName";
import { redis } from "../config/redis.config";

export const emailWorker = new Worker<EmailJobData>(
  QUEUE_NAMES.EMAIL,
  async (job) => {
    logger.info(`Processing email job: ${job.name}`, { jobId: job.id });

    switch (job.data.type) {
      case "verification":
        await sendVerificationEmail(
          job.data.name,
          job.data.email,
          job.data.token,
          job.data.clientUrl,
        );
        break;

      case "password-reset":
        await sendPasswordResetEmail(
          job.data.name,
          job.data.email,
          job.data.token,
          job.data.clientUrl,
        );
        break;

      default:
        throw new Error(`Unknown email job type`);
    }
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

emailWorker.on("completed", (job) => {
  logger.info(`Email job completed`, { jobId: job.id, type: job.data.type });
});

emailWorker.on("failed", (job, err) => {
  logger.error(`Email job failed`, {
    jobId: job?.id,
    type: job?.data.type,
    error: err.message,
  });
});
