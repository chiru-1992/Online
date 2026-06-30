import { db } from "./firebase-config.js";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const portugalPlayers = [
"Cristiano Ronaldo",
"Rafael Leão",
"Bernardo Silva",
"Bruno Fernandes",
"João Félix",
"Diogo Jota",
"Pedro Neto",
"Francisco Conceição",
"Gonçalo Ramos",
"Vitinha",
"João Neves",
"Rúben Neves",
"Palhinha",
"Nuno Mendes",
"Diogo Dalot",
"João Cancelo",
"António Silva",
"Gonçalo Inácio",
"Rúben Dias",
"Nelson Semedo",
"Renato Veiga",
"João Mário",
"Geovany Quenda"
];

const croatiaPlayers = [
"Luka Modrić",
"Joško Gvardiol",
"Mateo Kovačić",
"Andrej Kramarić",
"Ivan Perišić",
"Lovro Majer",
"Martin Baturina",
"Mario Pašalić",
"Petar Sučić",
"Luka Sučić",
"Josip Stanišić",
"Borna Sosa",
"Josip Šutalo",
"Duje Ćaleta-Car",
"Josip Juranović",
"Kristijan Jakić",
"Nikola Vlašić",
"Bruno Petković",
"Igor Matanović",
"Marin Pongračić",
"Franjo Ivanović",
"Toni Fruk",
"Marco Pašalić"
];

const ticketsRef = collection(db,"tickets");

async function createTickets(){

const snap = await getDocs(ticketsRef);

if(!snap.empty) return;

for(let i=0;i<23;i++){

await setDoc(doc(db,"tickets","ticket"+(i+1)),{

number:i+1,

portugal:portugalPlayers[i],

croatia:croatiaPlayers[i],

sold:false

});

}

}

createTickets();const ticketContainer = document.getElementById("tickets");

function ticketCard(ticketId,data){

return `

<div class="ticket">

<div class="ticket-top">

<h2>Ticket #${data.number}</h2>

</div>

<div class="ticket-body">

<p><strong>Portugal</strong><br>${data.portugal}</p>

<p><strong>Croatia</strong><br>${data.croatia}</p>

</div>

<div class="status ${data.sold ? "sold":"available"}">

${data.sold ? "🔴 SOLD":"🟢 AVAILABLE"}

</div>

<button onclick="toggleTicket('${ticketId}',${data.sold})">

${data.sold ? "Mark Available":"Mark Sold"}

</button>

</div>

`;

}

onSnapshot(ticketsRef,(snapshot)=>{

ticketContainer.innerHTML="";

snapshot.forEach((docSnap)=>{

ticketContainer.innerHTML+=ticketCard(docSnap.id,docSnap.data());

});

});const ADMIN_PASSWORD = "PORTUGAL2026";

window.toggleTicket = async function(ticketId, currentStatus){

    const password = prompt("Enter Admin Password");

    if(password === null) return;

    if(password !== ADMIN_PASSWORD){

        alert("Wrong Password");
        return;

    }

    await updateDoc(doc(db,"tickets",ticketId),{

        sold: !currentStatus

    });

};// ---------- Part 4D ----------

// Show tickets in order (1–23)
onSnapshot(ticketsRef, (snapshot) => {

    const tickets = [];

    snapshot.forEach((docSnap) => {
        tickets.push({
            id: docSnap.id,
            ...docSnap.data()
        });
    });

    tickets.sort((a, b) => a.number - b.number);

    ticketContainer.innerHTML = "";

    tickets.forEach(ticket => {
        ticketContainer.innerHTML += ticketCard(ticket.id, ticket);
    });

}, (error) => {

    ticketContainer.innerHTML = `
        <div style="padding:20px;text-align:center;color:red;">
            Unable to load tickets.<br>
            Check your Firebase configuration and Firestore rules.
        </div>
    `;

    console.error(error);

});

// Loading message
ticketContainer.innerHTML = `
<div style="padding:30px;text-align:center;color:white;">
Loading Tickets...
</div>
`;

console.log("Portugal vs Croatia Ticket Generator Loaded Successfully");
