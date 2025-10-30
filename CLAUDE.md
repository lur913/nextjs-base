# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Architecture

This is a Next.js 16 application using the App Router pattern with the following key characteristics:

### Project Structure
- Uses `src/` directory for all application code
- App Router located in `src/app/`
- Path alias configured: `@/*` maps to `./src/*`

### Tech Stack
- **Framework**: Next.js 16.0.1 with React 19.2.0
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **TypeScript**: Strict mode enabled
- **Fonts**: Geist Sans and Geist Mono from next/font/google

### Key Features
- Dark mode support via CSS custom properties and `prefers-color-scheme`
- Responsive design with mobile-first approach
- Component-based architecture with TypeScript
- Modern Tailwind CSS v4 configuration using `@theme inline`

### Development Notes
- The application uses the modern App Router pattern (not Pages Router)
- Global styles are in `src/app/globals.css` with Tailwind v4 syntax
- Layout configuration in `src/app/layout.tsx` includes font optimization
- Main page component is located in `src/app/page.tsx`

### Styling System
- CSS custom properties for theme colors (background/foreground)
- Automatic dark/light mode switching
- Tailwind utility classes with custom theme integration
- Font variables configured for Geist font family