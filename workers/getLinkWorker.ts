import { Job } from "bullmq";
const { linkPreview } = require(`link-preview-node`); // no types provided
import { redisCache } from '../cache'
import { createHash } from 'crypto';
import { environment } from "../environment";

async function getLinkWorker(job: Job) {
    const res = await linkPreview(job.data.url)
    await redisCache.set('link:' + createHash('sha256').update(job.data.url).digest('base64'), JSON.stringify(res), 'EX', environment.cacheLinkExpiryTime)
    return res;
}

export { getLinkWorker }