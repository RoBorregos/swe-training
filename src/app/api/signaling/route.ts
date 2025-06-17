import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface SignalMessage {
  type: "offer" | "answer" | "ice";
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
  timestamp: number;
}

const messageStore: Record<string, SignalMessage[]> = {}; // Use Redis in production

export async function POST(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get("room");

  if (!roomId) {
    return NextResponse.json({ error: "Room ID required" }, { status: 400 });
  }

  if (!messageStore[roomId]) {
    messageStore[roomId] = [];
  }

  const body = (await request.json()) as { payload: SignalMessage };
  const { payload } = body;

  // Add timestamp to the message
  const messageWithTimestamp = { ...payload, timestamp: Date.now() };

  // For offers and answers, replace any existing ones (only keep the latest)
  if (payload.type === "offer") {
    messageStore[roomId] = messageStore[roomId].filter(
      (msg) => msg.type !== "offer",
    );
  } else if (payload.type === "answer") {
    messageStore[roomId] = messageStore[roomId].filter(
      (msg) => msg.type !== "answer",
    );
  }

  messageStore[roomId].push(messageWithTimestamp);

  // Clean up old ICE candidates (keep only last 10)
  const iceMessages = messageStore[roomId].filter((msg) => msg.type === "ice");
  if (iceMessages.length > 10) {
    messageStore[roomId] = messageStore[roomId]
      .filter((msg) => msg.type !== "ice")
      .concat(iceMessages.slice(-10));
  }

  return NextResponse.json({ status: "ok" });
}

export async function GET(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get("room");

  if (!roomId) {
    return NextResponse.json({ error: "Room ID required" }, { status: 400 });
  }

  const messages = messageStore[roomId] ?? [];

  // Don't clear messages immediately - let them persist for connection establishment
  // Clean up messages older than 5 minutes
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  messageStore[roomId] = messages.filter(
    (msg) => msg.timestamp > fiveMinutesAgo,
  );

  return NextResponse.json(messages);
}
