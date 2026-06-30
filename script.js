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
