# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build

## Architecture

A minimal React SPA with a single `BuscarCep` component that queries the ViaCEP API (`viacep.com.br`) to look up Brazilian addresses by CEP. State is managed with React hooks (`useState`). No routing, no external state management.

Entry point: `src/main.jsx` → `src/App.jsx` → `BuscarCep.jsx`

## Key Notes

- Uses `@vitejs/plugin-react` with Oxc for fast transforms
- ESLint is configured with flat config (`eslint.config.js`) and React Hooks rules
- `BuscarCep.jsx` performs an async `fetch` to ViaCEP, normalizes the CEP input to 8 digits only, and handles `erro: true` responses from the API
