// OPEN AI PANEL FROM HERO BUTTON

const launchBtn = document.getElementById("launchCopilot");
const copilotPanel = document.getElementById("copilotPanel");
const closeCopilot = document.getElementById("closeCopilot");
const sendBtn = document.getElementById("sendCopilot");
const input = document.getElementById("copilotInput");
const body = document.getElementById("copilotBody");

launchBtn?.addEventListener("click", () => {
  copilotPanel.classList.toggle("show");
});

closeCopilot?.addEventListener("click", () => {
  copilotPanel.classList.remove("show");
});

sendBtn?.addEventListener("click", sendMessage);

input?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});


// AI FUNCTION
async function sendMessage(){

  const text = input.value.trim();
  if(!text) return;

  body.innerHTML += `
    <div class="user-msg">
      <span>${text}</span>
    </div>
  `;

  input.value="";

  body.innerHTML += `
    <div class="ai-msg" id="thinking">
       Thinking...
    </div>
  `;

  body.scrollTop = body.scrollHeight;

  try{

    const reply = await askAI(text);

    document.getElementById("thinking")?.remove();

    body.innerHTML += `
      <div class="ai-msg">
        ${reply}
      </div>
    `;

  }catch(err){

    document.getElementById("thinking")?.remove();

    body.innerHTML += `
      <div class="ai-msg">
        ⚠️ AI server not responding.
      </div>
    `;
  }
}


// SERVER CALL
async function askAI(message){

  const response = await fetch("http://127.0.0.1:3000/ask-ai",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({message})
  });

  const data = await response.json();

  return data.reply;
}

