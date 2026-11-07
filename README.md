# dev-toolkit-71

`dev-toolkit-71` is a robust collection of TypeScript-based utility functions designed to streamline repetitive development tasks in modern Node.js environments. This toolkit focuses on type-safety and performance to ensure reliable data manipulation and environment configuration across your projects.

## Features

*   **Type-Safe Environment Parsing**: Effortlessly validate and cast `.env` variables with strict interface definitions.
*   **Object Transformation Suite**: High-performance utilities for deep-merging, pruning, and flattening complex configuration objects.
*   **Async Queue Management**: A lightweight concurrency-limited execution engine for batching API requests.
*   **Zero-Dependency Core**: Built with minimal overhead, ensuring your dependency tree remains slim and secure.

## Installation

Install the toolkit via your preferred package manager:

```bash
# Using npm
npm install dev-toolkit-71

# Using yarn
yarn add dev-toolkit-71

# Using pnpm
pnpm add dev-toolkit-71
```

## Usage

Import the desired utilities directly into your TypeScript source files. The library is fully tree-shakable.

```typescript
import { env, objectUtils } from 'dev-toolkit-71';

// Validate environment variables
const config = env.parse({
  PORT: env.number(),
  API_KEY: env.string()
});

// Deep merge utility example
const defaultConfig = { theme: 'dark', retry: 3 };
const userConfig = { theme: 'light' };

const finalConfig = objectUtils.deepMerge(defaultConfig, userConfig);
console.log(finalConfig); // { theme: 'light', retry: 3 }
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Distributed under the MIT License. See `LICENSE` for more information.