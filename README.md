# dev-toolkit-71

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`dev-toolkit-71` is a high-performance TypeScript utility library designed to streamline common data transformation, async control flow, and runtime validation tasks. It provides lightweight, zero-dependency helpers that ensure strict type safety across modern Node.js and browser environments.

## Features

- **Type-Safe Object Manipulation**: Deep merging, immutable property pruning, and key remapping with full inferred TypeScript types.
- **Resilient Async Flow**: Configurable retry mechanisms with exponential backoff, concurrence limiters, and timeout wrappers.
- **Environment Schema Parsing**: Lightweight runtime environment variable validation and casting without bulky external schemas.
- **Structured Result Types**: Functional `Result<T, E>` monads for explicit, predictable error handling without `try/catch` bloat.

## Installation

Install via your preferred package manager:

```bash
npm install dev-toolkit-71
```

Or using `pnpm` / `yarn`:

```bash
pnpm add dev-toolkit-71
# or
yarn add dev-toolkit-71
```

## Basic Usage

```typescript
import { retryAsync, parseEnv, deepMerge } from 'dev-toolkit-71';

// 1. Parse and validate environment variables
const env = parseEnv(process.env, {
  PORT: { type: 'number', default: 8080 },
  API_URL: { type: 'string', required: true }
});

// 2. Execute async operations with automatic retries
async function fetchConfig() {
  return retryAsync(
    async () => {
      const response = await fetch(`${env.API_URL}/config`);
      if (!response.ok) throw new Error('Fetch failed');
      return response.json();
    },
    { maxAttempts: 3, delayMs: 500, backoffFactor: 2 }
  );
}

// 3. Immutably merge configuration objects
const defaultConfig = { timeout: 3000, features: { logging: true } };
const userConfig = { features: { analytics: false } };

const finalConfig = deepMerge(defaultConfig, userConfig);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
Created by Developer.