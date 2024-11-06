const option = ["✊", "🖐", "✌"];

const pRock = document.querySelector(".games .rock");
const pPaper = document.querySelector(".games .paper");
const pScissor = document.querySelector(".games .scissor");

const bothOption = document.querySelector("p.bothOption");
const result = document.querySelector("p.result");

// Game Rules
function matchRules(player, bot) {
  if (player == bot) return "Draw";
  if (player == "✊") return bot == "✌" ? "Win" : "Lose";
  if (player == "🖐") return bot == "✊" ? "Win" : "Lose";
  if (player == "✌") return bot == "🖐" ? "Win" : "Lose";
}

pRock.addEventListener("click", function () {
  const bot = option[Math.round(Math.random() * 2)];
  const player = "✊";
  const hasil = matchRules(player, bot);
  bothOption.textContent = "...";
  result.textContent = "...";
  setTimeout(() => {
    bothOption.textContent = `Player : ${player} VS Comp : ${bot}`;
    result.textContent = `You ${hasil}`;
  }, 1000);
});

pPaper.addEventListener("click", function () {
  const bot = option[Math.round(Math.random() * 2)];
  const player = "🖐";
  const hasil = matchRules(player, bot);

  bothOption.textContent = "...";
  result.textContent = "...";
  setTimeout(() => {
    bothOption.textContent = `Player : ${player} VS Comp : ${bot}`;
    result.textContent = `You ${hasil}`;
  }, 1000);
});

pScissor.addEventListener("click", function () {
  const bot = option[Math.round(Math.random() * 2)];
  const player = "✌";
  const hasil = matchRules(player, bot);
  bothOption.textContent = "...";
  result.textContent = "...";
  setTimeout(() => {
    bothOption.textContent = `Player : ${player} VS Comp : ${bot}`;
    result.textContent = `You ${hasil}`;
  }, 1000);
});
