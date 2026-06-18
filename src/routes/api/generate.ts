import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { system, prompt } = (await request.json()) as {
            system?: string;
            prompt?: string;
          };
          if (!prompt) {
            return new Response("Missing prompt", { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          }
          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-3-flash-preview"),
            system,
            prompt,
          });
          return Response.json({ text });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          const status = msg.includes("429") ? 429 : msg.includes("402") ? 402 : 500;
          return Response.json({ error: msg }, { status });
        }
      },
    },
  },
});
