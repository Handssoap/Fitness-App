
import { Webhook } from "svix";
import { extendedClient } from "../../lib/prisma";

/**
 * Webhook endpoint used by clerk to sync clerk user info
 * to the database
 * @param req
 */
export async function POST(req: Request, res: Response) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET =
    process.env.EXPO_PUBLIC_WEBHOOK_SECRET ||
    "whsec_lBsk5TklMVI7Lfap4ujbLmt7zZBenTUu";
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Get the headers and body
  const headers = req.headers;
  const payload = await req.text();

  // Get the Svix headers for verification
  const svix_id = headers.get("svix-id");
  const svix_timestamp = headers.get("svix-timestamp");
  const svix_signature = headers.get("svix-signature");

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err: any) {
    console.log("Error verifying webhook:", err.message);

    return new Response(err.message, {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", evt.data);
  const data = evt.data;

  const createOrUpdateProfile = async () => {
    return await extendedClient.profile.upsert({
      where: {
        userId: data.id,
      },
      create: {
        userId: data.id,
        name: data.first_name,
        imageUrl: data.image_url,
        email: data.email_addresses[0].email_address,
      },
      update: {
        userId: data.id,
        name: data.first_name,
        imageUrl: data.image_url,
        email: data.email_addresses[0].email_address,
      },
    });
  };

  const deleteProfile = async () => {
    await extendedClient.profile.delete({
      where: {
        userId: data.id,
      },
    });
  };

  try {
    switch (eventType) {
      case "user.created":
        return await createOrUpdateProfile();
      case "user.update":
        return await createOrUpdateProfile();
      case "user.deleted":
        return await deleteProfile();
      default:
        break;
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return new Response("User Creation failed", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", {
    status: 200,
  });
}
