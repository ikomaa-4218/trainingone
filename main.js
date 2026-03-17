// Import the database and auth instances from our firebase-config
import { db, auth } from './firebase-config.js';
// Import the necessary functions from the Firebase SDKs
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, onSnapshot, doc, deleteDoc, query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- DOM Elements ---
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const loginBtn = document.getElementById('login-btn');
const userProfile = document.getElementById('user-profile');
const subscriptionForm = document.getElementById('subscription-form');
const subscriptionList = document.getElementById('subscription-list');
const totalSpendElement = document.getElementById('total-spend');

// --- Authentication Logic ---
const provider = new GoogleAuthProvider();

// Sign in with Google
loginBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider).catch(error => console.error("Sign in error", error));
});

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        showDashboard(user);
    } else {
        // User is signed out
        showLoginPage();
    }
});

// --- View Switching Logic ---
function showLoginPage() {
    loginPage.style.display = 'flex';
    dashboardPage.style.display = 'none';
}

function showDashboard(user) {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'flex'; // Use flex because it's a flex container
    setupDashboard(user);
}

// --- Dashboard Setup ---
function setupDashboard(user) {
    // Display user profile
    userProfile.innerHTML = `
        <img src="${user.photoURL}" alt="${user.displayName}" class="w-10 h-10 rounded-full mr-4">
        <button id="logout-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    `;

    // Add logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        signOut(auth).catch(error => console.error("Sign out error", error));
    });

    // Initialize Firestore functionality for the logged-in user
    initFirestore(user.uid);
}


// --- Firestore Logic ---
let subscriptionsUnsubscribe = null; // To hold the listener

function initFirestore(userId) {
    const subscriptionsCol = collection(db, 'subscriptions');
    const q = query(subscriptionsCol, where("userId", "==", userId), orderBy('name'));

    // Set up a real-time listener
    subscriptionsUnsubscribe = onSnapshot(q, (snapshot) => {
        let subscriptions = [];
        snapshot.docs.forEach((doc) => {
            subscriptions.push({ ...doc.data(), id: doc.id });
        });

        renderSubscriptions(subscriptions);
    });

    // Handle form submission
    subscriptionForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = subscriptionForm.name.value;
        const price = subscriptionForm.price.value;
        const category = subscriptionForm.category.value;

        await addDoc(subscriptionsCol, {
            name: name,
            price: Number(price),
            category: category,
            userId: userId // Associate subscription with the user
        });
        subscriptionForm.reset();
    };
}

// --- UI Rendering ---
function renderSubscriptions(subscriptions) {
    subscriptionList.innerHTML = '';
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

    totalSpendElement.textContent = totalSpend.toFixed(2);
}

// --- Event Delegation for Deletes ---
subscriptionList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        await deleteDoc(doc(db, 'subscriptions', id));
    }
});

