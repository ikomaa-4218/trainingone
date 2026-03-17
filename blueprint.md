# Subscription Tracker Application Blueprint

## Overview

This document outlines the plan for building a single-page Subscription Tracker application. The application will allow users to manage their subscriptions, track monthly spending, and interact with a Firebase backend for data storage.

## Features

*   **Subscription Form:** A form to add new subscriptions with details like name, price, and category.
*   **Subscription List:** A real-time updated list of all subscriptions.
*   **Total Monthly Spend:** A calculation of the total monthly cost of all subscriptions.
*   **Delete Functionality:** The ability to remove subscriptions.
*   **Dark Mode UI:** A modern and professional user interface with a dark theme using Tailwind CSS.

## Project Structure

*   `index.html`: Main application file.
*   `style.css`: For base styles and customizations.
*   `main.js`: Core application logic for DOM manipulation and event handling.
*   `firebase-config.js`: Firebase SDK initialization.

## Plan

1.  **Setup Firebase:** Configure the project to use Firebase services by updating `.idx/mcp.json` and creating a `firebase-config.js` file.
2.  **HTML Structure:** Design the main layout in `index.html` including the form, subscription list, and total spend elements.
3.  **Styling:** Apply a dark-mode, responsive UI using Tailwind CSS.
4.  **JavaScript Logic:**
    *   Implement form submission to add data to Firestore.
    *   Fetch and display subscription data in real-time.
    *   Calculate and display the total monthly spend.
    *   Implement delete functionality.
    *   Add comments to explain the Firebase interactions.
