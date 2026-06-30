import { db } from "./firebase-config.js";
import { players } from "./players.js";

import {
collection,
getDocs,
doc,
setDoc,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ticketsRef = collection(db,"tickets");

const buyerName=document.getElementById("buyerName");
const buyerPhone=document.getElementById("buyerPhone");

const bookBtn=document.getElementById("bookBtn");
const paidBtn=document.getElementById("paidBtn");

const revealBtn=document.getElementById("revealBtn");

const matchCode=document.getElementById("matchCode");

const myTicket=document.getElementById("myTicket");

const availableCount=document.getElementById("availableCount");
const soldCount=document.getElementById("soldCount");

let bookedTicket=null;

const MATCH_CODE="NEWTICKET";
async function createTickets(){

const snap=await getDocs(ticketsRef);

if(!snap.empty)return;

for(let i=0;i<23;i++){

await setDoc(doc(db,"tickets","ticket"+(i+1)),{

ticket:i+1,

buyer:"",

phone:"",

paid:false,

sold:false,

revealed:false,

portugal:players[i].portugal,

croatia:players[i].croatia

});

}

}

createTickets();onSnapshot(ticketsRef,(snapshot)=>{

let sold=0;

let available=0;

snapshot.forEach(doc=>{

const t=doc.data();

if(t.sold){

sold++;

}else{

available++;

}

});

availableCount.textContent=available;

soldCount.textContent=sold;

});
// ------------------------------
// STEP 5 - BOOK NEXT AVAILABLE TICKET
// ------------------------------

import {
  query,
  orderBy,
  limit,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

bookBtn.addEventListener("click", async () => {

    const name = buyerName.value.trim();
    const phone = buyerPhone.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    const q = query(ticketsRef, orderBy("ticket"), limit(23));
    const snapshot = await getDocs(q);

    let selectedDoc = null;

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (!selectedDoc && data.buyer === "") {
            selectedDoc = docSnap;
        }
    });

    if (!selectedDoc) {
        alert("Sorry! All tickets are sold.");
        return;
    }

    bookedTicket = selectedDoc.id;

    await updateDoc(doc(db, "tickets", bookedTicket), {
        buyer: name,
        phone: phone
    });

    alert(
        "Ticket Booked Successfully!\n\nYour Ticket Number: " +
        selectedDoc.data().ticket +
        "\n\nPlease complete the payment."
    );
// ------------------------------
// STEP 6 - PAYMENT & REVEAL
// ------------------------------

paidBtn.addEventListener("click", async () => {

    if (!bookedTicket) {
        alert("Please book a ticket first.");
        return;
    }

    await updateDoc(doc(db, "tickets", bookedTicket), {

        paid: true,
        sold: true

    });

    alert("Payment recorded successfully!");

});

revealBtn.addEventListener("click", async () => {

    if (!bookedTicket) {
        alert("Book a ticket first.");
        return;
    }

    if (matchCode.value.trim() !== MATCH_CODE) {
        alert("Wrong Match Code.");
        return;
    }

    const snap = await getDocs(ticketsRef);

    snap.forEach((docSnap) => {

        if (docSnap.id === bookedTicket) {

            const ticket = docSnap.data();

            myTicket.innerHTML = `

<div class="ticket">

<h2>🎫 Ticket #${ticket.ticket}</h2>

<p><strong>Name:</strong> ${ticket.buyer}</p>

<p class="${ticket.sold ? "sold" : "available"}">
${ticket.sold ? "🔴 SOLD" : "🟢 AVAILABLE"}
</p>

<hr>

<h3>🇵🇹 Portugal</h3>

<p>
${ticket.portugal.name}
(#${ticket.portugal.jersey})
</p>

<h3>🇭🇷 Croatia</h3>

<p>
${ticket.croatia.name}
(#${ticket.croatia.jersey})
</p>

</div>

`;

        }

    });

});
});
