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
