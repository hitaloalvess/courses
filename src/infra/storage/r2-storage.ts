import {
  UploadParams,
  Uploader,
} from '@/domain/forum/application/storage/uploader';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;

  constructor(private envService: EnvService) {
    const accountId = this.envService.get('CLOUDFLARE_ACCOUNT_ID');

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_ACCESS_SECRET_KEY'),
      },
    });
  }

  async upload({ fileName, fileType, body }: UploadParams) {
    const uploadID = randomUUID();
    const uniqueFileName = `${uploadID}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return { url: uniqueFileName };
  }
}
