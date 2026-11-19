# dev-toolkit-71

`dev-toolkit-71` is a robust collection of TypeScript-based utility functions designed to streamline daily development workflows. It eliminates boilerplate code by providing optimized, type-safe helpers for common formatting, validation, and object manipulation tasks.

## Features

*   **Type-Safe Object Diffing:** Generate precise recursive differences between two objects with full TypeScript inference.
*   **Performance-Optimized Debouncer:** A high-precision debounce utility supporting immediate execution and trailing edge cancellation.
*   **Schema-Agnostic Sanitizers:** Rapidly strip sensitive keys or sanitize complex nested data structures without schema definition.
*   **Fluent Path Utilities:** Simplify filesystem path generation and normalization across cross-platform environments.

## Installation

Install the package via npm or yarn:

```bash
npm install dev-toolkit-71
# or
yarn add dev-toolkit-71
```

## Usage

Import the utilities directly into your TypeScript project:

```typescript
import { debounce, diffObjects } from 'dev-toolkit-71';

// Example: Debouncing a search input handler
const handleSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

// Example: Finding changes in state
const oldState = { id: 1, name: 'Alice' };
const newState = { id: 1, name: 'Bob' };
const changes = diffObjects(oldState, newState);

console.log(changes); // { name: 'Bob' }
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Distributed under the MIT License. See `LICENSE` for more information.