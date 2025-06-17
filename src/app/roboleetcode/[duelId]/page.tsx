"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SignalMessage {
  type: "offer" | "answer" | "ice";
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
  timestamp?: number;
}

async function postSignal(room: string, payload: SignalMessage): Promise<void> {
  await fetch(`/api/signaling?room=${room}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  });
}

async function pollSignals(room: string): Promise<SignalMessage[]> {
  const res = await fetch(`/api/signaling?room=${room}`);
  const data = (await res.json()) as SignalMessage[];
  return data;
}

export default function RoboLeetcodeDuelPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const duelId = params.duelId as string;
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const processedMessagesRef = useRef<Set<number>>(new Set());
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const isPollingActiveRef = useRef<boolean>(true);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [error, setError] = useState<string | null>(null);
  const [isOfferer, setIsOfferer] = useState<boolean>(false);
  const [hasReceivedOffer, setHasReceivedOffer] = useState<boolean>(false);
  const [dataChannelStatus, setDataChannelStatus] =
    useState<string>("Not connected");
  const [receivedMessage, setReceivedMessage] = useState<string>("");
  const [isPolling, setIsPolling] = useState<boolean>(true);
  const pollingStartTimeRef = useRef<number>(Date.now());
  const [pollingTimeRemaining, setPollingTimeRemaining] = useState<number>(30);

  // Convert searchParams to a plain object for display
  const queryParamsObject: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

  useEffect(() => {
    const stopPolling = () => {
      if (pollingIntervalRef.current) {
        console.log(
          "Stopping signaling server polling - connection established",
        );
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        isPollingActiveRef.current = false;
        setIsPolling(false);
      }
    };

    const stopPollingWithReason = (reason: string) => {
      if (pollingIntervalRef.current) {
        console.log(`Stopping signaling server polling - ${reason}`);
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
        isPollingActiveRef.current = false;
        setIsPolling(false);
      }
    };

    const initWebRTC = async () => {
      try {
        setError(null);
        setConnectionStatus("Connecting...");

        // Create peer connection
        const peer = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        peerRef.current = peer;

        // Handle connection state changes
        peer.onconnectionstatechange = () => {
          setConnectionStatus(peer.connectionState);

          // Stop polling if connection is established or failed
          if (peer.connectionState === "connected") {
            stopPollingWithReason("WebRTC connection established");
          } else if (peer.connectionState === "failed") {
            stopPollingWithReason("WebRTC connection failed");
          }
        };

        // Handle ICE connection state changes
        peer.oniceconnectionstatechange = () => {
          console.log("ICE connection state:", peer.iceConnectionState);
        };

        // Handle data channel from remote peer
        peer.ondatachannel = (event) => {
          const channel = event.channel;
          dataChannelRef.current = channel;

          channel.onopen = () => {
            console.log("Data channel opened");
            setDataChannelStatus("Connected");
            // Send a test message
            channel.send("Hello from peer!");
            // Stop polling since connection is established
            stopPolling();
          };

          channel.onmessage = (event) => {
            console.log("Data channel message:", event.data);
            setReceivedMessage(String(event.data));
          };

          channel.onclose = () => {
            console.log("Data channel closed");
            setDataChannelStatus("Disconnected");
          };
        };

        // When we get local ICE candidates
        peer.onicecandidate = async (event) => {
          if (event.candidate) {
            try {
              await postSignal(duelId, {
                type: "ice",
                candidate: event.candidate,
              });
            } catch (error) {
              console.error("Failed to send ICE candidate:", error);
            }
          }
        };

        // Check if there's already an offer in the room
        const existingMessages = await pollSignals(duelId);
        const existingOffer = existingMessages.find(
          (msg) => msg.type === "offer",
        );

        if (existingOffer?.sdp) {
          // We're the answerer
          console.log("Found existing offer, becoming answerer");
          setIsOfferer(false);
          setHasReceivedOffer(true);

          await peer.setRemoteDescription(
            new RTCSessionDescription(existingOffer.sdp),
          );
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          await postSignal(duelId, { type: "answer", sdp: answer });
        } else {
          // We're the offerer
          console.log("No existing offer found, becoming offerer");
          setIsOfferer(true);

          // Create data channel as offerer
          const dataChannel = peer.createDataChannel("test", { ordered: true });
          dataChannelRef.current = dataChannel;

          dataChannel.onopen = () => {
            console.log("Data channel opened (offerer)");
            setDataChannelStatus("Connected");
            // Send a test message
            dataChannel.send("Hello from offerer!");
            // Stop polling since connection is established
            stopPolling();
          };

          dataChannel.onmessage = (event) => {
            console.log("Data channel message (offerer):", event.data);
            setReceivedMessage(String(event.data));
          };

          dataChannel.onclose = () => {
            console.log("Data channel closed (offerer)");
            setDataChannelStatus("Disconnected");
          };

          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          await postSignal(duelId, { type: "offer", sdp: offer });
        }

        // Start polling for responses
        pollingIntervalRef.current = setInterval(async () => {
          // Stop polling if connection is established
          if (!isPollingActiveRef.current) {
            return;
          }

          // Stop polling after 30 seconds if no connection is established
          const pollingDuration = Date.now() - pollingStartTimeRef.current;
          if (pollingDuration > 30000) {
            // 30 seconds
            stopPollingWithReason("timeout - no peer joined within 30 seconds");
            return;
          }

          try {
            const messages = await pollSignals(duelId);

            for (const msg of messages) {
              // Skip if we've already processed this message
              if (
                msg.timestamp &&
                processedMessagesRef.current.has(msg.timestamp)
              ) {
                continue;
              }

              if (
                msg.type === "answer" &&
                msg.sdp &&
                peer.signalingState === "have-local-offer"
              ) {
                console.log("Received answer, setting remote description");
                await peer.setRemoteDescription(
                  new RTCSessionDescription(msg.sdp),
                );
                if (msg.timestamp)
                  processedMessagesRef.current.add(msg.timestamp);
              } else if (
                msg.type === "ice" &&
                msg.candidate &&
                peer.remoteDescription
              ) {
                console.log("Adding ICE candidate");
                await peer.addIceCandidate(new RTCIceCandidate(msg.candidate));
                if (msg.timestamp)
                  processedMessagesRef.current.add(msg.timestamp);
              } else if (
                msg.type === "offer" &&
                msg.sdp &&
                peer.signalingState === "stable" &&
                !hasReceivedOffer
              ) {
                // Handle incoming offer (for the answering peer)
                console.log(
                  "Received new offer, setting remote description and creating answer",
                );
                setHasReceivedOffer(true);
                await peer.setRemoteDescription(
                  new RTCSessionDescription(msg.sdp),
                );
                const answer = await peer.createAnswer();
                if (answer) {
                  await peer.setLocalDescription(answer);
                  await postSignal(duelId, { type: "answer", sdp: answer });
                }
                if (msg.timestamp)
                  processedMessagesRef.current.add(msg.timestamp);
              }
            }
          } catch (error) {
            console.error("Error polling signals:", error);
          }
        }, 1000);
      } catch (error) {
        console.error("Failed to initialize WebRTC:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setConnectionStatus("Failed");
      }
    };

    void initWebRTC();

    // Cleanup function
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (peerRef.current) {
        peerRef.current.close();
      }
    };
  }, [duelId, hasReceivedOffer]);

  // Update countdown timer
  useEffect(() => {
    if (!isPolling) return;

    const countdownInterval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - pollingStartTimeRef.current) / 1000,
      );
      const remaining = Math.max(0, 30 - elapsed);
      setPollingTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [isPolling]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Robo Leetcode Duel</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Duel ID:</h2>
        <p className="rounded bg-gray-100 p-2">{duelId}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Connection Status:</h2>
        <p
          className={`rounded p-2 ${
            connectionStatus === "connected"
              ? "bg-green-100 text-green-800"
              : connectionStatus === "connecting"
                ? "bg-yellow-100 text-yellow-800"
                : connectionStatus === "failed"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {connectionStatus}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Role:</h2>
        <p className="rounded bg-blue-100 p-2 text-blue-800">
          {isOfferer
            ? "Offerer (initiated connection)"
            : "Answerer (joined connection)"}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Data Channel Status:</h2>
        <p
          className={`rounded p-2 ${
            dataChannelStatus === "Connected"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {dataChannelStatus}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Signaling Status:</h2>
        <p
          className={`rounded p-2 ${
            isPolling
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isPolling
            ? `Polling signaling server... (${pollingTimeRemaining}s remaining)`
            : "Direct P2P connection established"}
        </p>
        {isPolling && (
          <p className="mt-2 text-sm text-gray-600">
            Waiting for another peer to join this duel room...
          </p>
        )}
      </div>

      {receivedMessage && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Last Received Message:</h2>
          <p className="rounded bg-purple-100 p-2 text-purple-800">
            {receivedMessage}
          </p>
        </div>
      )}

      {dataChannelStatus === "Connected" && (
        <div className="mb-4">
          <button
            onClick={() => {
              if (
                dataChannelRef.current &&
                dataChannelRef.current.readyState === "open"
              ) {
                const message = `Test message from ${isOfferer ? "offerer" : "answerer"} at ${new Date().toLocaleTimeString()}`;
                dataChannelRef.current.send(message);
              }
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Send Test Message
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-red-600">Error:</h2>
          <p className="rounded bg-red-100 p-2 text-red-800">{error}</p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold">Query Parameters:</h2>
        {Object.keys(queryParamsObject).length > 0 ? (
          <pre className="overflow-auto rounded bg-gray-100 p-2">
            {JSON.stringify(queryParamsObject, null, 2)}
          </pre>
        ) : (
          <p>No query parameters found.</p>
        )}
      </div>
    </div>
  );
}
