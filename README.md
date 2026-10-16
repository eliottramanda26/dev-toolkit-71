# dev-toolkit-71

`dev-toolkit-71` is a robust collection of TypeScript utilities designed to streamline common development tasks in Node.js and browser environments. It provides type-safe wrappers for data sanitization, asynchronous flow control, and environment configuration management.

## Features

*   **Async Queue Manager:** A lightweight, promise-based task processor with concurrency limiting capabilities.
*   **Object Transformation Suite:** Deep-merge and flattening utilities built with strict TypeScript generics for type safety.
*   **Env Validator:** A schema-based environment variable loader that prevents runtime errors by validating configuration at startup.
*   **Performance Benchmarker:** A simple, high-resolution timer utility for measuring function execution time in milliseconds.

## Installation

Install the package via npm:

```bash
npm install dev-toolkit-71
```

Or using yarn:

```bash
yarn add dev-toolkit-71
```

## Usage

Import the necessary utilities directly into your TypeScript project:

```typescript
import { AsyncQueue, EnvValidator } from 'dev-toolkit-71';

// Validate environment variables
const config = EnvValidator.parse({
  PORT: process.env.PORT,
  API_KEY: process.env.API_KEY
});

// Manage concurrent tasks
const queue = new AsyncQueue({ concurrency: 2 });
queue.add(async () => {
  console.log("Task executed safely.");
});
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.