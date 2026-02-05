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
   AI STATUS ROTATOR
================================ */

const messages = [
  "AI scanning campaign performance...",
  "Analyzing live traffic...",
  "Detecting high-conversion audience...",
  "Optimizing budget allocation...",
  "Generating growth insights..."
];

let i = 0;

const aiText = document.getElementById("aiText");

if (aiText) {
  setInterval(() => {
    i = (i + 1) % messages.length;
    aiText.innerText = messages[i];
  }, 2500);
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


/* ================================
   REVENUE CHART
================================ */

const ctx = document.getElementById("revenueChart");

if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        label: 'Revenue',
        data: [120,190,300,500,420,610,720],
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,.12)',
        tension: 0.4,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      plugins: {
        legend: { display:false }
      },
      scales: {
        x: {
          grid: { display:false },
          ticks:{ color:'#9fb3d1'}
        },
        y: {
          grid: { color:'rgba(255,255,255,.05)' },
          ticks:{ color:'#9fb3d1'}
        }
      }
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

}
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
         AI failed to respond.
        Check if server is running.
      </div>
    `;

  }
}
async function askAI(message) {

  try{

    const response = await fetch("http://127.0.0.1:3000/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    if(!response.ok){
      throw new Error("Server error");
    }

    const data = await response.json();

    return data.reply;

  }catch(err){

    console.error("AI ERROR:", err);

    return "⚠️ AI server unreachable. Make sure backend is running.";
  }
}
// 🔥 SIMPLE TEST FUNCTION
window.testAI = async function(){

  try{

    const reply = await askAI("Say hello in one line");

    alert(reply);

  }catch(err){

    alert("AI not responding. Check server.");

  }

}
