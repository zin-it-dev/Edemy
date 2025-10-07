import { useEffect, useState, useCallback, type FormEvent } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Generator = () => {
  const WS_URL = import.meta.env.VITE_WS_URL;

  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      let displayMsg: string;
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.type === "status") {
          displayMsg = `[STATUS] ${data.message}`;
        } else if (data.type === "echo_response") {
          displayMsg = `[ECHO] Received: "${data.original_data.message}"`;
        } else {
          displayMsg = `[RAW] ${lastMessage.data}`;
        }
      } catch (e) {
        displayMsg = `[RAW] ${lastMessage.data}`;
        console.error(e);
      }
      setMessageHistory((prev) => [...prev, displayMsg]);
    }
  }, [lastMessage]);

  const getConnectionStatus = (state: ReadyState): string => {
    switch (state) {
      case ReadyState.CONNECTING:
        return "Connecting";
      case ReadyState.OPEN:
        return "Open";
      case ReadyState.CLOSING:
        return "Closing";
      case ReadyState.CLOSED:
        return "Closed";
      default:
        return "Unknown State";
    }
  };

  const connectionStatus = getConnectionStatus(readyState);

  const handleSendTestMessage = useCallback(() => {
    if (readyState === ReadyState.OPEN && inputValue.trim() !== "") {
      const messageToSend = JSON.stringify({ message: inputValue.trim() });
      sendMessage(messageToSend);
      setMessageHistory((prev) => [
        ...prev,
        `[Client] Sent: "${inputValue.trim()}"`,
      ]);
      setInputValue("");
    }
  }, [inputValue, readyState, sendMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendTestMessage();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <p>
        Status:{" "}
        <span
          style={{ color: readyState === ReadyState.OPEN ? "green" : "red" }}
        >
          {connectionStatus}
        </span>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter message..."
          disabled={readyState !== ReadyState.OPEN}
          style={{ width: "70%", padding: "8px" }}
        />
        <button
          type="submit"
          disabled={readyState !== ReadyState.OPEN || inputValue.trim() === ""}
          style={{ padding: "8px 15px", marginLeft: "10px" }}
        >
          Send
        </button>
      </form>

      <h3>Messages History:</h3>
      <ul
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          listStyleType: "none",
          marginTop: "10px",
        }}
      >
        {messageHistory
          .slice()
          .reverse()
          .map((msg, idx) => (
            <li
              key={idx}
              style={{
                color: msg.includes("[STATUS]")
                  ? "blue"
                  : msg.includes("[ECHO]")
                  ? "darkgreen"
                  : "black",
              }}
            >
              {msg}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Generator;
