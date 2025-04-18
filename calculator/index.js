const express = require("express");
require("dotenv").config();

const { fetchNumbers } = require("./services/numberService");
const { updateWindow, getWindowState } = require("./utils/slidingWindow");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/numbers/:type", async (req, res) => {
  const { type } = req.params;

  if (!["p", "f", "e", "r"].includes(type)) {
    return res.status(400).json({ error: "Invalid type. Use p, f, e, or r" });
  }

  const prevWindow = getWindowState();
  const fetchedNumbers = await fetchNumbers(type);
  const currWindow = updateWindow(fetchedNumbers);

  const avg =
    currWindow.length > 0
      ? parseFloat(
          (currWindow.reduce((sum, val) => sum + val, 0) / currWindow.length).toFixed(2)
        )
      : 0;

  res.json({
    windowPrevState: prevWindow,
    windowCurrState: currWindow,
    numbers: fetchedNumbers,
    avg
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
