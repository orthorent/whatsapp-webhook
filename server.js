const express = require("express");
const app = express();

app.use(express.json());

// ✅ Verifica del webhook (Meta ti manda un GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "orthorent2025"; // scegli tu il token segreto

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Ricezione dei messaggi (Meta manda un POST qui)
app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log("Messaggio ricevuto:", JSON.stringify(body, null, 2));

  if (body.object) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// ✅ Avvio server (Render assegna la porta via variabile d'ambiente)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server in ascolto sulla porta " + PORT));
