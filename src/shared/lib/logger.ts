type LogContext = Record<string, unknown>;

function serializeError(error: unknown): unknown {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return error;
}

/** Minimal structured server logger; swap the sink here when observability is added. */
export const logger = {
  error(message: string, error?: unknown, context?: LogContext): void {
    console.error(
      JSON.stringify({ level: "error", message, error: serializeError(error), ...context }),
    );
  },
  warn(message: string, context?: LogContext): void {
    console.warn(JSON.stringify({ level: "warn", message, ...context }));
  },
};
