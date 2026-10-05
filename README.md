[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# dev-toolkit-71

`dev-toolkit-71` is a modern, zero-dependency TypeScript utility library designed to streamline common data transformations, async operations, and environment configuration. Built for both Node.js and browser environments, it helps developers write type-safe, boilerplate-free code without introducing heavy bundle bloat.

## Features

* **Type-Safe Env Loader:** Parse and validate process environment variables with strict runtime checks and default fallbacks.
* **Resilient Async Retries:** Execute asynchronous tasks with configurable exponential backoff and custom retry conditions.
* **Deep Object Utilities:** Immutable object merging, type-safe path picking, and recursive key sanitization.
* **Lightweight & Tree-Shakeable:** Zero external dependencies with full ESM and CommonJS support under 3kB minified.

## Installation

Install via npm or your preferred package manager:

```bash
npm install dev-toolkit-71
```

```bash
pnpm add dev-toolkit-71
```

## Usage

Here is a quick example demonstrating environment validation and async retries:

```typescript
import { loadEnv, withRetry } from 'dev-toolkit-71';

// 1. Validate and cast environment configuration
const config = loadEnv({
  PORT: { type: 'number', default: 3000 },
  API_KEY: { type: 'string', required: true },
});

// 2. Perform resilient API calls with backoff
async function fetchUserData(userId: string) {
  return withRetry(
    async () => {
      const response = await fetch(`https://api.example.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${config.API_KEY}` },
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      return response.json();
    },
    { retries: 3, delayMs: 500, backoffFactor: 2 }
  );
}
```

## License

Distributed under the MIT License. See `LICENSE` for more information.