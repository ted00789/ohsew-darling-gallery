import { createStart } from "@tanstack/react-start";

// The SPA has no server functions or request middleware.
export const startInstance = createStart(() => ({}));
