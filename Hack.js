let completed = 0;

function showPage(page){

document.querySelectorAll(".page").forEach(function(p){
p.style.display="none";
});

document.getElementById(page).style.display="block";

}

function completeTask(btn){

let card = btn.parentElement;

let status = card.querySelector(".status");

if(status.innerText === "Pending"){

status.innerText="Completed";

status.classList.add("completed");

completed++;

updateProgress();

}

}

function updateProgress(){

let total = document.querySelectorAll(".activity-card").length;

let percent = (completed/total)*100;

document.getElementById("progressFill").style.width = percent+"%";

document.getElementById("progressText").innerText =
completed + " / " + total + " completed";

}

showPage("home");
