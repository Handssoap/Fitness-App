import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClerkService {
  constructor(private prisma: PrismaService) {}

  /**
   * Handles the webhook events from clerk
   * @param evt is the event object from clerk
   * @returns a response
   */

  async handleWebhook(evt: any, res: Response) {
    const { id } = evt.data;
    const eventType = evt.type;
    // console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    // console.log('Webhook body:', evt.data);
    try {
      if (evt.type == 'user.created' || evt.type == 'user.updated') {
        await this.handleUserCreatedOrUpdated(evt);
      } else if (evt.type == 'user.deleted') {
        await this.handleUserDeleted(evt);
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json([]);
    }

    return res.status(HttpStatus.OK).json([]);
  }

  private async handleUserCreatedOrUpdated(evt: any) {
    // return await this.prisma.
    const data = evt.data;
    await this.prisma.profile.upsert({
      where: {
        userId: data.id,
      },
      create: {
        userId: data.id,
        email: data.email_addresses[0].email_address,
        name: data.first_name,
        imageUrl: data.image_url || "",
      },
      update: {
        userId: data.id,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url || "",
      },
    });
  }
  private async handleUserDeleted(evt: any) {
    const data = evt.data;
    // return await this.prisma.
    await this.prisma.profile.delete({
      where: {
        userId: data.id!,
      },
    });
  }
}
