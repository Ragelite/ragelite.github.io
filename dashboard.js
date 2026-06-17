import { protectPage, logout } from "./auth.js";

/* ✅ Protect the dashboard */
protectPage("index.html");


/* ================================
   USER DATA
================================ */
document.addEventListener("user-ready", (e) => {
  const { user, data } = e.detail;

  const userName = document.getElementById("userName");
  const userAvatar = document.getElementById("userAvatar");
  const greeting = document.getElementById("greeting");

  const displayName = data.username || user.email;
  const firstName = displayName.split("@")[0];

  if (userName)
    userName.innerText = displayName;

  if (userAvatar)
    userAvatar.src =
      data.avatar ||
      `https://api.dicebear.com/7.x/identicon/svg?seed=${user.email}`;

  if (greeting)
    greeting.innerText = `Good to see you, ${firstName} 👋`;
});

/* ================================
   LOGOUT
================================ */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await logout();
  });
}


/* ================================
   PROFILE DROPDOWN
================================ */

const profileBtn = document.getElementById("profileBtn");
const dropdown = document.getElementById("profileDropdown");

if (profileBtn && dropdown) {

  profileBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
}


/* ===============================
   ELITE COPILOT
=============================== */

const copilotBtn = document.getElementById("copilotBtn");
const copilotPanel = document.getElementById("copilotPanel");
const closeCopilot = document.getElementById("closeCopilot");
const sendBtn = document.getElementById("sendCopilot");
const input = document.getElementById("copilotInput");
const body = document.getElementById("copilotBody");

copilotBtn?.addEventListener("click", () => {
  copilotPanel.classList.toggle("show");
});

closeCopilot?.addEventListener("click", () => {
  copilotPanel.classList.remove("show");
});

sendBtn?.addEventListener("click", sendMessage);

input?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage(){

  const text = input.value.trim();
  if(!text) return;

  // show user message
  body.innerHTML += `
    <div class="user-msg">
      <span>${text}</span>
    </div>
  `;

  input.value="";
  body.scrollTop = body.scrollHeight;

  // show thinking
  body.innerHTML += `
    <div class="ai-msg" id="thinking">
       Thinking...
    </div>
  `;

  body.scrollTop = body.scrollHeight;

  try{

    const reply = await askAI(text);

    document.getElementById("thinking").remove();

    body.innerHTML += `
      <div class="ai-msg">
         ${reply}
      </div>
    `;

    body.scrollTop = body.scrollHeight;

  }catch(err){

    document.getElementById("thinking").remove();

    body.innerHTML += `
      <div class="ai-msg">
         Something went wrong — please try again.
      </div>
    `;

  }
}
/* Client-side growth strategist — works on the static site with no backend. */
async function askAI(message) {
  // small, human-feeling delay
  await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

  const m = message.toLowerCase();

  if (m.includes("roas") || m.includes("return"))
    return "To lift ROAS, start with warm traffic — site visitors and past engagers convert 3–5× better than cold audiences. As Ragelite learns your data, it shifts budget toward the segments that actually buy. 📈";
  if (m.includes("budget"))
    return "A solid starting split is 70/30 between Meta and Google: Meta drives discovery, Google captures intent. Ragelite rebalances automatically as performance data comes in. 💰";
  if (m.includes("audience") || m.includes("target"))
    return "The best targeting starts with your own customers. Upload a customer list and Ragelite builds lookalikes — typically 40–60% lower CPL than interest-based targeting. 🎯";
  if (m.includes("copy") || m.includes("ad") || m.includes("creative"))
    return "Lead with the pain, not the feature. Try: \"Still burning budget on ads that don't convert?\" then show the fix. Ragelite A/B tests variants and scales the winner. 📣";
  if (m.includes("hi") || m.includes("hello") || m.includes("hey"))
    return "Hey! 👋 I'm your growth co-pilot. Ask me about strategy, targeting, budgets, or creative — what's the biggest challenge right now?";

  return "Good question! Once your ad accounts are connected, I'll tailor this to your live numbers. For now, ask me about strategy, targeting, budgets, or creative. ✦";
}
