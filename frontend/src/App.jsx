import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [food, setFood] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNutrition(null);
    setError("");

    axios
      .get(`/api/nutrition/${food}`)
      .then((response) => {
        setNutrition(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong!");
        console.log("Axios error:", err);
      });
  };

  return (
    <main className="main min-h-screen bg-zinc-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="container w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[45%]">
        <h1 className="title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-orange-600 text-center">
          NutriBuddy
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 sm:gap-3">
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="Type a food (e.g., 1 large apple)"
            className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border-2 border-blue-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 sm:p-3 text-sm sm:text-base rounded-lg hover:bg-blue-900"
          >
            Get Nutrition Info
          </button>
        </form>

        {nutrition && (
          <div className="mt-4 sm:mt-6 w-full bg-zinc-800 p-3 sm:p-4 rounded-lg shadow-lg border-2 border-blue-500 text-white">
            <h3 className="font-extrabold text-lg sm:text-xl mb-2 sm:mb-4">{food}</h3>
            <p className="text-sm sm:text-base">Calories: {nutrition.calories} kcal</p>
            <p className="text-sm sm:text-base">Protein: {nutrition.protein}g</p>
            <p className="text-sm sm:text-base">Carbs: {nutrition.carbs}g</p>
            <p className="text-sm sm:text-base">Fat: {nutrition.fat}g</p>
            <p className="text-sm sm:text-base">Fiber: {nutrition.fiber}g</p>
            <p className="mt-2 italic text-sm sm:text-base">{nutrition.notes}</p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-500 text-sm sm:text-xl text-center">{error}</p>
        )}
      </div>
    </main>
  );
};

export default App;