const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  "function deposit(uint256,address) external",
  "function simulateYield(uint256) external",
  "function harvest() external",
  "function donationWallet() view returns (address)",
];

let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) return alert("Please install MetaMask.");
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);
  document.getElementById("connectButton").innerText = "✅ Connected";
  updateDashboard();
}

async function deposit() {
  const amount = document.getElementById("depositAmount").value;
  if (!amount) return alert("Enter an amount");
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
  const tx = await contract.simulateYield(ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  animateStatus("⚡ Yield simulated");
  updateDashboard();
}

async function harvest() {
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

function updateDashboard() {
  const bal = (Math.random() * 100).toFixed(2);
  const donated = (Math.random() * 50).toFixed(2);

  document.getElementById("userBalance").innerText = bal;
  document.getElementById("totalDonated").innerText = donated;

  document.getElementById("balanceBar").style.width = `${bal}%`;
  document.getElementById("donationBar").style.width = `${donated}%`;
}

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("depositButton").onclick = deposit;
document.getElementById("yieldButton").onclick = simulateYield;
document.getElementById("harvestButton").onclick = harvest;

function showToast(message, duration = 3000) {
  const toast = document.getElementById("statusToast");
  toast.textContent = message;
  toast.style.opacity = "1";
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => (toast.style.opacity = "0"), duration);
}
