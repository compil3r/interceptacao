const phrases = [
  "dados sao importantes para tomar decisoes com base em evidencias",
  "limpar organizar e analisar dados gera conhecimento com valor real",
  "dados crus podem gerar conclusoes erradas sem limpeza ou contexto",
  "visualizar dados ajuda a entender padroes e relacoes complexas facilmente",
  "modelo de machine learning precisa de bons dados para funcionar",
  "estatistica ajuda a compreender comportamentos em bases de dados",
  "sem contexto um dado pode ser enganoso ou inutil totalmente"
];

// const phrases = ["cebola", "manga"]
let currentPhraseIndex = Math.floor(Math.random() * phrases.length); // Seleciona uma frase aleatória
const asciiWords = phrases[currentPhraseIndex].split(" ");
const binaryWords = asciiWords.map(word => word.split("").map(char => char.charCodeAt(0).toString(2)).join(" "));
let correctWords = new Array(binaryWords.length).fill(false);

// Atualiza o título da interceptação com o número da mensagem
document.getElementById('terminal-title').textContent = `INTERCEPTAÇÃO DE MENSAGEM #${currentPhraseIndex + 1}`;

function displayBinaryWords() {
  const container = document.getElementById("binary-container");
  container.innerHTML = "";
  binaryWords.forEach((word, index) => {
    const div = document.createElement("div");
    div.className = "binary-word" + (correctWords[index] ? " correct" : "");
    if (correctWords[index]) {
      div.textContent = asciiWords[index];
    } else {
      div.innerHTML = word.split(" ").map(bin => `<span class="binary-letter">${bin}</span>`).join("");
    }
    container.appendChild(div);
  });
}

function validateWord() {
  const userInput = document.getElementById("user-input").value.trim().toLowerCase();
  const messageDiv = document.getElementById("message");

  const index = asciiWords.indexOf(userInput);
  if (index !== -1 && !correctWords[index]) {
    correctWords[index] = true;
    messageDiv.textContent = "Palavra correta!";
    messageDiv.className = "message success";
    document.getElementById("user-input").value = "";
    displayBinaryWords();

    if (correctWords.every(correct => correct)) {
      showFinalMessage();
    }
  } else {
    messageDiv.textContent = "Palavra incorreta ou já validada. Tente novamente.";
    messageDiv.className = "message error";
  }
}

function showFinalMessage() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";

  // Hide the overlay after 5 seconds and reset the game
  setTimeout(() => {
    overlay.style.display = "none";
    finishGame();
  }, 5000);
}

function finishGame() {
  // Keep the translated message visible and remove input/button
  displayBinaryWords();
  document.querySelector(".input-container").style.display = "none";
}

document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    validateWord();
  }
});

displayBinaryWords();

// Custom cursor logic
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Disable right-click, copy, paste, Ctrl key, and F12 with modal alert
const alertModal = document.getElementById("alert-modal");

function showAlertModal(message) {
  alertModal.querySelector("p").textContent = message;
  alertModal.style.display = "flex";
}

function closeAlertModal() {
  alertModal.style.display = "none";
}

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  showAlertModal("Você está tentando usar artifícios errados para vencer!");
});

document.addEventListener('copy', (e) => {
  e.preventDefault();
  showAlertModal("Copiar está desativado. Use suas habilidades para decifrar a mensagem!");
});

document.addEventListener('paste', (e) => {
  e.preventDefault();
  showAlertModal("Colar está desativado. Insira as palavras manualmente!");
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.key === "F12") {
    e.preventDefault();
    showAlertModal("O uso de atalhos como Ctrl ou F12 está desativado!");
  }
});

// Prevent opening developer tools using keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.shiftKey && e.key === "C") || (e.ctrlKey && e.shiftKey && e.key === "J")) {
    e.preventDefault();
    showAlertModal("Você não pode abrir as ferramentas de desenvolvedor!");
  }
});