import { EventDto } from "../dto/index.dto";

export const validateEventDto = (event: unknown): event is EventDto => {
  if (!event || typeof event !== "object") return false;
  const typedEvent = event as EventDto;
  return (
    typeof typedEvent.topic === "string" &&
    typedEvent.topic.trim().length > 0 &&
    typeof typedEvent.payload === "object" &&
    typedEvent.payload !== null
  );
};
