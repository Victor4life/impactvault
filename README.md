# 💚 ImpactVault

> Turning DeFi yield into Public Good funding.

ImpactVault is a decentralized web application that allows users to deposit stablecoins (mock DAI), simulate yield generation, and donate that yield to public good causes — all powered by blockchain technology.

Built for the **Somnia Mini Hackathon**, this project demonstrates how DeFi and Web3 tools can be used to make financial systems transparent, impactful, and socially responsible.

---

## 🚀 Features

- 💰 **Deposit Stablecoins (mDAI)** — Users can deposit test tokens and simulate real DeFi deposits.  
- ⚡ **Simulate Yield** — Visualize how yield accumulates over time.  
- 💚 **Harvest & Donate** — Convert simulated yield into public good donations.  
- 🧱 **Smart Contracts** — Built using Solidity and deployed with [Thirdweb](https://thirdweb.com).  
- 🌐 **Simple Frontend** — Built using HTML, CSS, and JavaScript for fast and easy interaction.  
- 🔗 **Runs on Base Sepolia Testnet** — Enables safe testing without spending real ETH.  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Smart Contracts** | Solidity, OpenZeppelin, Thirdweb SDK |
| **Blockchain Network** | Base Sepolia Testnet |
| **Tools** | Thirdweb CLI, pnpm, ethers.js |
| **Hosting** | Vercel (Frontend) + Thirdweb Dashboard (Contracts) |

---

## 🏗️ Project Structure

```

impactvault/
│
├── contracts/              # Solidity smart contracts
│   └── ImpactVault.sol
│
├── frontend/               # Static frontend files
│   ├── index.html
│   ├── style.css
│   └── style.js
│
├── README.md
└── ...

````

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Victor4life/impactvault.git
cd impactvault
````

### 2️⃣ Open the frontend

If you’re running locally, simply open `frontend/index.html` in your browser.
You can also use a simple local server:

```bash
npx serve frontend
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🧩 Smart Contract Details

**Contract Name:** `ImpactVault.sol`
**Network:** Base Sepolia Testnet
**Framework:** Thirdweb + OpenZeppelin

### Key Functions

| Function                   | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `deposit(uint256 amount)`  | Deposit stablecoins to start yield generation      |
| `simulateYield()`          | Simulate yield accumulation for demonstration      |
| `harvestAndDonate()`       | Convert generated yield into public good donations |
| `getBalance(address user)` | View the user’s token balance                      |

---

## 🔐 Deployment

### Smart Contract

Deployed using Thirdweb CLI:

```bash
pnpm exec thirdweb deploy -k <RITyCEElWNpCCDGLghVt249Qp3OE0bTGR3DEBynOPxZdUYmvNCXziI1R5INmTOj776lcZ1kHWO_rtcwWOFQC4w>
```

### Frontend

Deploy via [Vercel](https://vercel.com):

1. Push your project to GitHub.
2. Import the repo to Vercel.
3. Set root directory to `/frontend`.
4. Click **Deploy**.

Live URL will look like:
👉 `https://impactvault.vercel.app`

---

## 🧠 Concept Inspiration

DeFi generates billions in yield daily — **ImpactVault** aims to redirect a portion of that value to fund public goods.
It’s finance with purpose: combining blockchain transparency with social responsibility.

---

## 🧾 Example Flow

1. Connect your wallet via Thirdweb.
2. Deposit test mDAI tokens.
3. Simulate yield growth.
4. Harvest and donate your simulated yield.

All transactions are executed on **Base Sepolia Testnet**, so no real funds are required.

---

## 👨‍💻 Contributor

**Victor Emeka**

* GitHub: [@Victor4life](https://github.com/Victor4life)
* Email: *optional for submission*

---

## 🛡️ License

This project is licensed under the **MIT License**.
Feel free to use, remix, or extend for educational or hackathon purposes.

---

## 🌍 Live Demo

Once deployed:
🔗 [https://impactvault.vercel.app](https://impactvault.vercel.app)

---

> 💚 *“Finance with Purpose — Empowering public goods through decentralized yield.”*

```
