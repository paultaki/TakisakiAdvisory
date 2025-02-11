document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("sales-quiz");
  const quizResults = document.getElementById("quiz-results");

  if (quizForm) {
      quizForm.addEventListener("submit", async function (event) {
          event.preventDefault();
          const teamSize = document.getElementById("team-size").value;
          const challenge = document.getElementById("biggest-challenge").value;

          const prompt = `I am a sales consultant. A user with a ${teamSize} sales team is struggling with ${challenge}. Provide a 3-sentence AI-driven recommendation.`;

          try {
              const response = await fetch("/api/generate", {  // 🔥 Calls your Vercel function!
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ prompt })
              });

              const data = await response.json();
              quizResults.innerHTML = `<p><strong>AI Insights:</strong> ${data.choices[0].text.trim()}</p>`;
              quizResults.classList.remove("hidden");
          } catch (error) {
              console.error("Error fetching AI insights:", error);
              quizResults.innerHTML = `<p><strong>Error:</strong> Unable to fetch AI insights at this time.</p>`;
              quizResults.classList.remove("hidden");
          }
      });
  }
});
