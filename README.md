# dev-toolkit-71

A lightweight, high-performance TypeScript utility library designed to streamline common development tasks. It provides a robust set of type-safe helpers for data manipulation, environment management, and asynchronous flow control.

## Features

*   **Type-Safe Utilities:** Built with strict TypeScript generics to ensure type integrity during deep object merging and schema validation.
*   **Async Queue Manager:** A concurrency-limited task runner that prevents overloading system resources during batch API processing.
*   **Env Validator:** A zero-dependency utility to enforce required environment variables at startup with clear, actionable error reporting.
*   **Performance Benchmarking:** Integrated decorators for easy method execution time tracking and memory footprint analysis.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-71
# or
yarn add dev-toolkit-71
```

## Usage

Import the utilities directly into your TypeScript project to immediately leverage optimized helper functions.

```typescript
import { AsyncQueue, validateEnv } from 'dev-toolkit-71';

// Validate environment variables
validateEnv(['API_KEY', 'DATABASE_URL']);

// Execute tasks with concurrency limits
const queue = new AsyncQueue(5);

const tasks = [1, 2, 3, 4, 5].map(id => () => console.log(`Processing task ${id}`));
queue.run(tasks);
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.