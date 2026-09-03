# dev-toolkit-71

A lightweight, high-performance TypeScript utility library designed to streamline common development tasks. It provides a robust set of type-safe helpers to minimize boilerplate code in modern web applications.

## Features

*   **Type-Safe Object Manipulation:** Advanced utility functions for deep merging, schema validation, and object sanitization without external dependencies.
*   **Async Flow Control:** Built-in wrappers for batching promises and handling retries with configurable exponential backoff.
*   **Performance Metrics:** Integrated decorators to track execution time and memory usage of critical functions in development environments.
*   **String/Date Sanitization:** Pre-configured formatters for ISO 8601 parsing and complex string slugification.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-71
# or
yarn add dev-toolkit-71
```

## Usage

Import the necessary modules directly to leverage tree-shaking and maintain a small bundle size:

```typescript
import { batchRetry, deepMerge } from 'dev-toolkit-71';

// Deep merge objects with type safety
const config = deepMerge(defaultSettings, userSettings);

// Execute an async task with built-in retry logic
const data = await batchRetry(fetchUserData, {
  attempts: 3,
  delay: 1000
});

console.log(data);
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Distributed under the MIT License. See `LICENSE` for more information.