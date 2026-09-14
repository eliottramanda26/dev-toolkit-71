# dev-toolkit-71

A comprehensive collection of performance-optimized TypeScript utilities designed to streamline common development workflows. This toolkit eliminates boilerplate by providing type-safe abstractions for data transformation, async orchestration, and environment configuration.

## Features

*   **Type-Safe Collection Helpers:** Advanced array and object manipulation methods with full TypeScript inference support.
*   **Async Orchestrator:** Robust wrappers for retry logic, exponential backoff, and concurrent execution limits.
*   **Env-Manager:** A zero-dependency utility for strictly typed environment variable validation and schema enforcement.
*   **Performance Benchmarking:** Built-in decorators to track function execution time and memory usage in development.

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

```typescript
import { retry, validateEnv } from 'dev-toolkit-71';

// Validate environment variables against a schema
const config = validateEnv({
  API_KEY: { type: 'string', required: true },
  PORT: { type: 'number', default: 3000 }
});

// Execute async functions with automatic retries
const result = await retry(async () => {
  return await fetch('/api/data');
}, { retries: 3, delay: 1000 });

console.log(result);
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.