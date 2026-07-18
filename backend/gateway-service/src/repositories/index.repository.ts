// The gateway service currently does not persist data locally.
// This file is reserved for future gateway-specific state management or caching.

export const noopRepository = () => {
  return null;
};
