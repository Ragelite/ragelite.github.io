const launchBtn = document.getElementById("launchCopilot");
const copilotPanel = document.getElementById("copilotPanel");
const closeCopilot = document.getElementById("closeCopilot");
const sendBtn = document.getElementById("sendCopilot");
const input = document.getElementById("copilotInput");
const body = document.getElementById("copilotBody");

launchBtn.addEventListener("click", () => {
  copilotPanel.classList.add("show");
});

closeCopilot.addEventListener("click", () => {
  copilotPanel.classList.remove("show");
});

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage(){

  const text = input.value.trim();
  if(!text) return;

  body.innerHTML += `<div class="user-msg">${text}</div>`;
  input.value="";

  const thinking = document.createElement("div");
  thinking.innerText = "Thinking...";
  body.appendChild(thinking);

  const response = await fetch("http://127.0.0.1:3000/ask-ai", {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({message:text})
  });

  const data = await response.json();

  thinking.remove();

  body.innerHTML += `
    <div class="ai-msg">${data.reply}</div>
  `;

  body.scrollTop = body.scrollHeight;
}
