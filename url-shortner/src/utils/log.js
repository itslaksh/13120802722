const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5sYWtzaGF5MDA3QGdtYWlsLmNvbSIsImV4cCI6MTc1MTg3MTA4NCwiaWF0IjoxNzUxODcwMTg0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGIwNzE1NTEtYTkzOS00ZGJkLThkNzEtNDBkZDAyNzFjYzNiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibGFrc2hheSBjaGF1ZGhhcnkiLCJzdWIiOiJlNzdjNjNlOS1jNzI3LTRkZTEtODUyMi00ZGUxNzBiZTEzMWUifSwiZW1haWwiOiJjaC5sYWtzaGF5MDA3QGdtYWlsLmNvbSIsIm5hbWUiOiJsYWtzaGF5IGNoYXVkaGFyeSIsInJvbGxObyI6IjEzMTIwODAyNzIyIiwiYWNjZXNzQ29kZSI6InpDUnZ1TiIsImNsaWVudElEIjoiZTc3YzYzZTktYzcyNy00ZGUxLTg1MjItNGRlMTcwYmUxMzFlIiwiY2xpZW50U2VjcmV0IjoiZ3ZyWHJIWnlRelBQZlNDdSJ9.KD-8kqLTU_4KW9z4pwyqlZOvVkDDyNhSQS4VnPEqjZE`;

export async function log(stack, level, pkg, message) {
    const payload = {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message
    };

    try {
        const response = await fetch(LOG_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error("Log failed:", errData);
        } else {
            const data = await response.json();
            console.log("Log success:", data.message);
        }
    } catch (err) {
        console.error("Log error:", err.message);
    }
}