import { db } from "./firebase-config.js";

import {
    collection,
    onSnapshot,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_PASSWORD = "PORTUGAL2026";
const ticketsRef = collection(db, "tickets");

console.log("Admin Panel Loaded");

onSnapshot(ticketsRef, (snapshot) => {
    console.clear();
    console.log("===== LIVE TICKETS =====");

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        console.log(
            `Ticket ${data.number} | ${data.portugal} vs ${data.croatia} | ${
                data.sold ? "SOLD" : "AVAILABLE"
            }`
        );
    });
});

window.changeStatus = async function(ticketId, currentStatus) {

    const password = prompt("Enter Admin Password");

    if (password !== ADMIN_PASSWORD) {
        alert("Wrong Password");
        return;
    }

    await updateDoc(doc(db, "tickets", ticketId), {
        sold: !currentStatus
    });

    alert("Ticket Updated Successfully");
};
