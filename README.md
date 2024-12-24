This is the frontend application for the OCR (Optical Character Recognition) project. It is built using modern web technologies and frameworks to provide a seamless user experience for uploading and processing documents.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Hook Form**: A library for managing form state and validation in React.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Sonner**: A library for displaying toast notifications.
- **Radix UI**: A set of accessible and customizable UI components.

## Project Structure

- `app/`: Contain app routes.
- `components/`: Contains reusable UI components, as well as key components.
- `lib/`: Contains utility functions, API utils and typings.
- `pages/`: Contains Next.js pages.
- `providers/`: Contains context providers for managing global auth state.

## Getting Started

### Prerequisites

- npm or yarn
- setup of OcrBackend, up and running locally

##   ```sh
   git clone <repository-url>
   cd ocr_front# Installation

1. Clone the repository:
   ```sh
   git@github.com/aq-simei/ocr_front.git
   cd ocr_front
  2.1 create a .env file containing API_URL key (api url, defaults to http://localhost:3000)
  Set .env file (same as port on backend)
