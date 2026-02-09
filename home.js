const heroInput = document.getElementById("heroAIInput");
const heroSend = document.getElementById("heroAISend");

if(heroSend){

heroSend.addEventListener("click", async () => {

const text = heroInput.value.trim();
if(!text) return;

heroSend.innerText = "Thinking...";

try{

const response = await fetch("http://localhost:3000/ask-ai",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
message:text
})
});

const data = await response.json();

alert(data.reply);

}catch(err){

alert("AI failed. Is server running?");

}

heroSend.innerText = "Generate Strategy";

});

}


