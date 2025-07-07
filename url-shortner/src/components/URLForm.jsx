import { useState } from "react";
import { log } from "../utils/log.js";

export default function URLForm() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState(30);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("YOUR_API_ENDPOINT/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortcode, validity })
      });

      const data = await response.json();

      if (!response.ok) {
        await log("frontend", "error", "api", data.message || "Shorten failed");
      } else {
        await log("frontend", "info", "api", "Short URL created successfully");
        alert(`Shortened URL: ${data.shortUrl}`);
      }
    } catch (err) {
      await log("frontend", "fatal", "api", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" required />
      <input value={shortcode} onChange={(e) => setShortcode(e.target.value)} placeholder="Optional Shortcode" />
      <input type="number" value={validity} onChange={(e) => setValidity(e.target.value)} placeholder="Validity (min)" />
      <button type="submit">Shorten</button>
    </form>
  );
}
