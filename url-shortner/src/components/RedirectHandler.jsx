import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { log } from "./utils/log.js";

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function redirect() {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/resolve/${shortcode}`);
        const data = await response.json();

        if (!response.ok) {
          await log("frontend", "error", "api", `Shortcode ${shortcode} not found`);
          navigate("/");
        } else {
          await log("frontend", "info", "route", `Redirecting ${shortcode} to ${data.originalUrl}`);
          window.location.href = data.originalUrl;
        }
      } catch (err) {
        await log("frontend", "fatal", "route", err.message);
        navigate("/");
      }
    }

    redirect();
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
