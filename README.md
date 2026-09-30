# Vue Task Manager

A task management application built with Vue 3 and TypeScript as a hands-on learning project.

## Features

* Create, edit, delete, and complete tasks
* Filter tasks by all, active, or completed
* Task counters
* Clear completed tasks
* Form validation
* Task details page
* Vue Router navigation
* Persistent local tasks using `localStorage`
* API integration with loading and error states
* Runtime validation of API responses
* Mapping external API data to the application's task model

## Technologies

* Vue 3
* TypeScript
* Pinia
* Vue Router
* Vite
* REST API
* Git & GitHub

## Project Structure

```text
src/
├── components/
├── services/
│   └── taskApi.ts
├── stores/
│   └── tasks.ts
├── views/
├── types.ts
└── router/
```

The project separates responsibilities between:

* **Views** — page-level UI and user interactions
* **Components** — reusable UI pieces
* **Pinia Store** — application state and actions
* **API Service** — communication with the external API
* **Types** — shared TypeScript models

## API

The project uses JSONPlaceholder as a demo API for loading task data.

API data is validated at runtime before being mapped into the application's internal `Task` model.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the production build:

```bash
npm run build
```

## Purpose

This project was built as a practical learning project to gain hands-on experience with Vue 3, TypeScript, state management, routing, local storage, API integration, and Git-based development.
