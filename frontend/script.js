const contractAddress = "0x000000000000000000000000000000000000dEaD";
const abi = [
  "function deposit(uint256,address) external",
  "function simulateYield(uint256) external",
  "function harvest() external",
  "function donationWallet() view returns (address)",
];

let provider, signer, contract;
let MOCK_MODE = true; // default mock mode

// ===== HELPER FUNCTIONS =====
async function fakeTransaction(action) {
  console.log(`Simulating ${action}...`);
  return new Promise((resolve) => setTimeout(resolve, 1200));
}

function shortAddr(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// ===== CONNECT WALLET =====
async function connectWallet() {
  if (!window.ethereum) return alert("Please install MetaMask.");

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  const address = await signer.getAddress();
  const network = await provider.getNetwork();

  document.getElementById("connectButton").innerText = "✅ Connected";
  document.getElementById("walletAddress").innerText = `🔹 ${shortAddr(
    address
  )}`;
  document.getElementById(
    "networkStatus"
  ).innerText = `🌐 Network: ${network.name.toUpperCase()}`;

  updateDashboard();
  updateImpactMetrics(); // refresh impact metrics too
}

// ===== TOGGLE MOCK MODE =====
document.getElementById("mockToggle").addEventListener("click", () => {
  MOCK_MODE = !MOCK_MODE;
  const mockBtn = document.getElementById("mockToggle");
  mockBtn.textContent = MOCK_MODE ? "🧩 Mock Mode: ON" : "🧩 Mock Mode: OFF";
  animateStatus(MOCK_MODE ? "Mock mode enabled" : "Mock mode disabled");
});

// ===== DEPOSIT =====
async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if (!amount) return alert("Enter an amount");

  if (MOCK_MODE) await fakeTransaction("Deposit");
  else {
    const tx = await contract.deposit(
      ethers.utils.parseUnits(amount, 18),
      await signer.getAddress()
    );
    await tx.wait();
  }

  animateStatus("💰 Deposit successful");
  updateDashboard();
  updateImpactMetrics();
}

// ===== SIMULATE YIELD =====
async function simulateYield() {
  const amount = document.getElementById("yieldAmount").value;
  if (!amount) return alert("Enter yield amount");

  if (MOCK_MODE) await fakeTransaction("Simulate Yield");
  else {
    const tx = await contract.simulateYield(
      ethers.utils.parseUnits(amount, 18)
    );
    await tx.wait();
  }

  animateStatus("⚡ Yield simulated");
  updateDashboard();
  updateImpactMetrics();
}

// ===== HARVEST =====
async function harvest() {
  if (MOCK_MODE) await fakeTransaction("Harvest");
  else {
    const tx = await contract.harvest();
    await tx.wait();
  }

  animateStatus("💚 Harvest complete — Donation sent!");
  updateDashboard();
  updateImpactMetrics();
}

// ===== STATUS TOAST =====
function animateStatus(message) {
  const el = document.createElement("div");
  el.className = "status-toast";
  el.innerText = message;
  document.body.appendChild(el);
  setTimeout(() => (el.style.opacity = "0"), 2000);
  setTimeout(() => el.remove(), 2600);
}

// ===== DASHBOARD =====
function updateDashboard() {
  const bal = (Math.random() * 100).toFixed(2);
  const donated = (Math.random() * 50).toFixed(2);

  document.getElementById("userBalance").innerText = bal;
  document.getElementById("totalDonated").innerText = donated;
  document.getElementById("balanceBar").style.width = `${bal}%`;
  document.getElementById("donationBar").style.width = `${donated}%`;
}

// ===== IMPACT METRICS (Step 2) =====
function updateImpactMetrics() {
  const projects = Math.floor(Math.random() * 15) + 5;
  const totalDonations = (Math.random() * 500).toFixed(2);
  const contributors = Math.floor(Math.random() * 100) + 20;

  document.getElementById("impactProjects").innerText = projects;
  document.getElementById("impactDonations").innerText = totalDonations;
  document.getElementById("impactUsers").innerText = contributors;
}

// ===== EVENT HANDLERS =====
document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("depositButton").onclick = deposit;
document.getElementById("yieldButton").onclick = simulateYield;
document.getElementById("harvestButton").onclick = harvest;

// ===== AI CHATBOT =====
const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.getElementById("chatbot-container");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const aiModeToggle = document.getElementById("aiModeToggle");

let REAL_AI_MODE = false;

chatToggle.onclick = () => (chatContainer.style.display = "flex");
closeChat.onclick = () => (chatContainer.style.display = "none");

aiModeToggle.onclick = () => {
  REAL_AI_MODE = !REAL_AI_MODE;
  aiModeToggle.textContent = REAL_AI_MODE ? "🤖 AI: ON" : "🤖 AI: OFF";
  animateStatus(REAL_AI_MODE ? "AI Mode activated" : "AI Mode disabled");
};

// ===== MOCK AI RESPONSES =====
function getMockResponse(input) {
  input = input.toLowerCase();
  if (input.includes("deposit"))
    return "💰 You can deposit mDAI by entering an amount and clicking *Deposit*.";
  if (input.includes("yield"))
    return "⚡ Simulate yield to preview potential returns.";
  if (input.includes("harvest"))
    return "🌿 Harvest sends your simulated yield to public-good projects.";
  if (input.includes("impact"))
    return "🌱 ImpactVault converts DeFi yield into real-world funding for verified projects.";
  if (input.includes("mock"))
    return "🧩 Mock mode lets you test without MetaMask.";
  if (input.includes("hello") || input.includes("hi"))
    return "Hey 👋 I'm your ImpactVault assistant!";
  return "🤖 I'm not sure yet — try asking about deposit, yield, or harvest!";
}

// ===== REAL AI (Optional Online Mode) =====
async function getRealAIResponse(query) {
  try {
    const res = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent("https://api.openrouter.ai/api/v1/chat/completions"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are ImpactVault AI — a DeFi and regenerative finance assistant helping users understand deposits, yields, and impact donations.",
            },
            { role: "user", content: query },
          ],
          max_tokens: 150,
        }),
      }
    );

    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content || "⚠️ No valid response received."
    );
  } catch (err) {
    console.warn("AI fetch failed:", err);
    return "⚠️ I'm having trouble connecting to OpenRouter right now.";
  }
}

// ===== CHAT HANDLER =====
sendBtn.onclick = async () => {
  const msg = userInput.value.trim();
  if (!msg) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = msg;
  chatBody.appendChild(userMsg);

  userInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simulate bot "thinking"
  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = "⏳ Thinking...";
  chatBody.appendChild(botMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Decide AI source
  const response = REAL_AI_MODE
    ? await getRealAIResponse(msg)
    : getMockResponse(msg);

  botMsg.innerText = response;
  chatBody.scrollTop = chatBody.scrollHeight;
};

// ===== NAVBAR TOGGLE =====
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuToggle.textContent = navbar.classList.contains("active") ? "✕" : "☰";
});

// ===== STICKY HEADER SHADOW + AUTO HIDE =====
let lastScrollTop = 0;
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  // Add subtle glow on scroll
  if (scrollTop > 50) {
    header.style.boxShadow = "0 2px 15px rgba(0, 255, 198, 0.25)";
  } else {
    header.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.4)";
  }

  // Auto-hide on scroll down, show on scroll up
  if (scrollTop > lastScrollTop && scrollTop > 80) {
    header.style.transform = "translateY(-120%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});
