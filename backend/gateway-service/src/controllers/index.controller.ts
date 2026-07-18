import { Request, Response } from "express";
import { publishEvent } from "../events/producer";
import { EventDto } from "../dto/index.dto";

const publishEventHandler = async (req: Request, res: Response) => {
  const event: EventDto = req.body;

  if (!event || !event.topic || !event.payload) {
    return res.status(400).json({ success: false, message: "Invalid event payload" });
  }

  try {
    await publishEvent(event.topic, event.payload);
    return res.status(202).json({ success: true, message: "Event published" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Failed to publish event", details: error.message });
  }
};

export const gatewayController = {
  publishEvent: publishEventHandler,
};
