# Subscription Tracker Application Blueprint

## Overview

This application is a simple subscription tracker that allows users to manage their monthly subscriptions. It uses Firebase for authentication and database storage, and is built with modern, framework-less web technologies.

## Core Features

- **Google Authentication:** Users can sign in securely with their Google account.
- **Subscription Management:** Users can add, view, and delete their subscriptions.
- **Real-time Updates:** The subscription list updates in real-time thanks to Firestore.
- **Total Spend Calculation:** The application automatically calculates and displays the total monthly spend.

## Project Structure

- `index.html`: The main HTML file, containing the structure for both the login and dashboard pages.
- `style.css`: Custom CSS for additional styling.
- `main.js`: The core application logic, including authentication and Firestore interactions.
- `firebase-config.js`: Firebase configuration and SDK initialization.
- `build.sh`: A build script for generating the Firebase config on deployment.
- `.gitignore`: To exclude sensitive files from version control.

## Design and Styling

- **Layout:** A clean, modern, single-page application design.
- **Styling:** Tailwind CSS is used for utility-first styling.
- **Components:** The application is divided into two main views: a login page and a dashboard.

## Current Plan: Authentication and View Switching

- **Objective:** Implement a secure login flow and separate the application into a login page and a dashboard.
- **Steps:**
    1.  **Update `firebase-config.js`:** Add the Firebase Authentication SDK.
    2.  **Restructure `index.html`:** Create separate `<section>` elements for the login and dashboard views.
    3.  **Refactor `main.js`:**
        - Implement `onAuthStateChanged` to toggle view visibility.
        - Create a `showDashboard` function that initializes the dashboard only after a successful login.
        - Associate subscriptions with the logged-in user by adding a `userId` field to each subscription document.
