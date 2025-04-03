import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to NutriBuddy's Server");
});

app.get("/api/nutrition/:food", async (req, res) => {
  const food = req.params.food;
  const appId = "bc4d9c7d"; // Your Edamam app_id
  const appKey = "9332ac029c4d852405addb17e3872e62"; // Your Edamam app_key
  const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
    food
  )}`;

  console.log("Sending request to:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Full Edamam response:", JSON.stringify(data, null, 2));

    // Check if we have parsed nutrient data
    const nutrients = data.ingredients?.[0]?.parsed?.[0]?.nutrients;
    if (response.ok && nutrients && nutrients.ENERC_KCAL) {
      res.send({
        calories: nutrients.ENERC_KCAL.quantity || 0,
        protein: nutrients.PROCNT?.quantity || 0,
        carbs: nutrients.CHOCDF?.quantity || 0,
        fat: nutrients.FAT?.quantity || 0,
        fiber: nutrients.FIBTG?.quantity || 0,
        notes: "Powered by Edamam",
      });
    } else {
      console.log("No valid nutrient data found in response:", data);
      res.status(404).send({
        message: `Sorry, I couldn’t find nutrition data for '${food}'!`,
      });
    }
  } catch (error) {
    console.log("Fetch error:", error);
    res
      .status(500)
      .send({ message: "Oops! Something went wrong with the server." });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
