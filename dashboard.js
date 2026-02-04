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
