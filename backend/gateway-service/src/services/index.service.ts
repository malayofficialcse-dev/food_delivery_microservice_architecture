import { EventDto } from "../dto/index.dto";

export const validateEvent = (event: EventDto) => {
  if (!event || typeof event !== "object") return false;
  if (!event.topic || typeof event.topic !== "string") return false;
  if (!event.payload || typeof event.payload !== "object") return false;
  return true;
};
