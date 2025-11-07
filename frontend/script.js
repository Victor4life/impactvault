// ImpactVault Frontend Logic (Mock + Real Compatible)

// ✅ If you deploy later, just replace this with your real contract address
const contractAddress = "0x0000000000000000000000000000000000000000";

// ✅ Same ABI structure (for compatibility later)
const abi = [
  "function deposit(uint256,address) external",
  "function simulateYield(uint256) external",
  "function harvest() external",
  "function donationWallet() view returns (address)",
];

let provider, signer, contract;

// Detect MetaMask
async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask.");
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    // 💡 In fallback mode, skip contract init
    if (contractAddress === "0x0000000000000000000000000000000000000000") {
      document.getElementById("connectButton").innerText = "✅ Mock Connected";
      mockUpdateDashboard();
      return;
    }

    contract = new ethers.Contract(contractAddress, abi, signer);
    document.getElementById("connectButton").innerText = "✅ Connected";
    updateDashboard();
  } catch (error) {
    console.error(error);
    alert("Wallet connection failed.");
  }
}

// Mock Fallbacks
async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if (!amount) return alert("Enter an amount");

  if (contractAddress === "0x0000000000000000000000000000000000000000") {
    animateStatus(`💰 Mock deposit of ${amount} ETH successful`);
    mockUpdateDashboard();
    return;
  }

  const tx = await contract.deposit(
    ethers.utils.parseUnits(amount, 18),
    await signer.getAddress()
  );
  await tx.wait();
  animateStatus("💰 Deposit successful");
  updateDashboard();
}

async function simulateYield() {
  const amount = document.getElementById("yieldAmount").value;
  if (!amount) return alert("Enter yield amount");

  if (contractAddress === "0x0000000000000000000000000000000000000000") {
    animateStatus(`⚡ Simulated ${amount} ETH yield`);
    mockUpdateDashboard();
    return;
  }

  const tx = await contract.simulateYield(ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  animateStatus("⚡ Yield simulated");
  updateDashboard();
}

async function harvest() {
  if (contractAddress === "0x0000000000000000000000000000000000000000") {
    animateStatus("💚 Mock harvest complete — Donation simulated!");
    mockUpdateDashboard();
    return;
  }

  const tx = await contract.harvest();
  await tx.wait();
  animateStatus("💚 Harvest complete — Donation sent!");
  updateDashboard();
}

function animateStatus(message) {
  const el = document.createElement("div");
  el.className = "status-toast";
  el.innerText = message;
  document.body.appendChild(el);
  setTimeout(() => (el.style.opacity = "0"), 2000);
  setTimeout(() => el.remove(), 2600);
}

// 🧮 Mock Data Simulation (for frontend demo)
function mockUpdateDashboard() {
  const bal = (Math.random() * 100).toFixed(2);
  const donated = (Math.random() * 50).toFixed(2);

  document.getElementById("userBalance").innerText = bal;
  document.getElementById("totalDonated").innerText = donated;
  document.getElementById("balanceBar").style.width = `${bal}%`;
  document.getElementById("donationBar").style.width = `${donated}%`;
}

function updateDashboard() {
  // You’ll use actual contract calls here later
  mockUpdateDashboard();
}

// Button bindings
document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("depositButton").onclick = deposit;
document.getElementById("yieldButton").onclick = simulateYield;
document.getElementById("harvestButton").onclick = harvest;

// Toast helper
function showToast(message, duration = 3000) {
  const toast = document.getElementById("statusToast");
  toast.textContent = message;
  toast.style.opacity = "1";
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => (toast.style.opacity = "0"), duration);
}

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuToggle.textContent = navbar.classList.contains("active") ? "✕" : "☰";
});
