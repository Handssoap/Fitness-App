import { Controller, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';

@Controller('clerk')
export class ClerkController {
  constructor(
    private readonly clerk: ClerkService,
    private configService: ConfigService,
  ) {}

  @Post('/webhook')
  webhookEndpooint(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = this.configService.get<string | Uint8Array>(
      'WEBHOOK_SECRET',
    );
    if (!WEBHOOK_SECRET) {
      throw new Error('You need a WEBHOOK_SECRET in your .env');
    }

    // Get the headers and body
    const headers = req.headers;
    const payload = req.rawBody.toString('utf8');

    // Get the Svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id as string,
        'svix-timestamp': svix_timestamp as string,
        'svix-signature': svix_signature as string,
      });
    } catch (err) {
      console.log('Error verifying webhook:', err.message);
      if (err) {
        return new Response(err.message, {
          status: 400,
        });
      }
    }

    return this.clerk.handleWebhook(evt, res);
  }
}
