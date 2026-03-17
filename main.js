// Import the database instance from our firebase-config
import { db } from './firebase-config.js';
// Import the necessary functions from the Firestore SDK
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Get references to the DOM elements
const subscriptionForm = document.getElementById('subscription-form');
const subscriptionList = document.getElementById('subscription-list');
const totalSpendElement = document.getElementById('total-spend');

// --- READ (R) ---
// Set up a real-time listener to fetch and display subscriptions
const subscriptionsCol = collection(db, 'subscriptions');
const q = query(subscriptionsCol, orderBy('name')); // Order by name

onSnapshot(q, (snapshot) => {
    let subscriptions = [];
    snapshot.docs.forEach((doc) => {
        subscriptions.push({ ...doc.data(), id: doc.id });
    });

    // Clear the current list
    subscriptionList.innerHTML = '';

    // Calculate total spend and render subscriptions
    let totalSpend = 0;
    subscriptions.forEach(sub => {
        totalSpend += Number(sub.price);
        const div = document.createElement('div');
        div.className = 'bg-gray-800 p-4 rounded-lg flex justify-between items-center';
        div.innerHTML = `
            <div>
                <h4 class="text-xl font-bold">${sub.name}</h4>
                <p class="text-gray-400">${sub.category} - $${sub.price}</p>
            </div>
            <button class="delete-btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-id="${sub.id}">
                Delete
            </button>
        `;
        subscriptionList.appendChild(div);
    });

    // Update total spend in the UI
    totalSpendElement.textContent = totalSpend.toFixed(2);
});

// --- CREATE (C) ---
// Add a new subscription when the form is submitted
subscriptionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = subscriptionForm.name.value;
    const price = subscriptionForm.price.value;
    const category = subscriptionForm.category.value;

    try {
        await addDoc(subscriptionsCol, {
            name: name,
            price: Number(price),
            category: category
        });
        subscriptionForm.reset(); // Clear the form
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});


// --- DELETE (D) ---
// Delete a subscription when a delete button is clicked
subscriptionList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        try {
            await deleteDoc(doc(db, 'subscriptions', id));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    }
});
