---
title: Nodejs
description: Nodejs reference documentation
---

# Nodejs

# Node.js 20+ — Knowledge Reference

## Purpose

Reference for modern Node.js development covering event loop mechanics, streams, buffers, child processes, worker threads, module systems, package management, and core APIs. Focused on production patterns for scalable server-side applications.

## Core Concepts

### Event Loop

Node.js runs on a single-threaded event loop with libuv. The loop phases: timers (`setTimeout`, `setInterval`), pending callbacks, idle/prepare, poll (I/O), check (`setImmediate`), close callbacks. Microtasks (Promises, `queueMicrotask`) run after each phase. Understanding the event loop prevents blocking and race conditions.

### Streams

Streams process data incrementally rather than loading entire buffers. Four types: `Readable` (source), `Writable` (destination), `Duplex` (both), `Transform` (modify). Use `pipe()` for stream composition. `pipeline()` handles errors and cleanup. Backpressure prevents memory exhaustion.

### Buffers

`Buffer` represents fixed-size memory chunks for binary data. Created from arrays, strings, or other buffers. `Buffer.from()`, `Buffer.alloc()`, `Buffer.allocUnsafe()` are constructors. Essential for file I/O, network operations, and binary protocol handling.

### Child Process

`child_process` module enables spawning child processes. `exec()` runs shell commands with buffer output. `spawn()` launches processes with streaming output. `fork()` creates Node.js child processes with IPC communication. `execFile()` runs executables without shell.

### Worker Threads

`worker_threads` module enables true parallel execution. Each worker has its own V8 instance, event loop, and memory. `Worker` class creates threads. `postMessage()` communicates between threads. `SharedArrayBuffer` and `Atomics` enable shared memory.

### ES Modules

ESM is the official module system. `.mjs` extension or `"type": "module"` in `package.json`. Static `import`/`export` enables tree-shaking. `import.meta.url` provides the module's URL. Dynamic `import()` loads modules on demand. Top-level `await` is supported.

### CommonJS

Legacy module system using `require()` and `module.exports`. Synchronous loading. Widely supported but declining in favor of ESM. Many npm packages still use CJS. Interop: ESM can import CJS via default import; CJS cannot `require()` ESM directly.

### Package Management

- **npm** — default Node.js package manager; `npm install`, `npm run`, `npm publish`
- **yarn** — alternatives with workspaces, offline installs; `yarn add`, `yarn workspaces`
- **pnpm** — content-addressable storage, strict dependency resolution; `pnpm add`, `pnpm install`
- All support monorepo workspaces. Lock files (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) ensure reproducible installs.

### package.json

Project manifest: name, version, dependencies, scripts, engines, type. `scripts` define executable commands. `dependencies` vs `devDependencies` separate runtime from build-time. `engines` specifies Node.js version requirements. `type: "module"` enables ESM.

### fs and path Modules

`fs` provides file system operations: `readFile`, `writeFile`, `readdir`, `stat`, `mkdir`. Async versions (`fs/promises`) return Promises. `path` handles cross-platform path operations: `path.join()`, `path.resolve()`, `path.dirname()`, `path.extname()`. Never construct paths with string concatenation.

## Best Practices

1. **Never block the event loop** — offload CPU-intensive work to Worker Threads or child processes; use `setImmediate()` for breaking up long tasks
2. **Use streams for large data** — process files and network data with streams; never `readFile()` entire multi-GB files into memory
3. **Always handle stream errors** — use `pipeline()` instead of manual `pipe()` to ensure proper error handling and cleanup
4. **Use `fs/promises` over callback-based `fs`** — Promise-based APIs work with `async/await` for cleaner code
5. **Prefer `path.join()` over string concatenation** — handles platform-specific separators and resolves `..` correctly
6. **Use `worker_threads` for CPU-bound tasks** — image processing, data transformation, and cryptographic operations benefit from true parallelism
7. **Pin Node.js version in `engines` field** — specify minimum version: `"engines": { "node": ">=20.0.0" }`
8. **Use environment variables for configuration** — `process.env` for secrets, feature flags, and deployment-specific values; validate with `zod` or similar

## Anti-Patterns

1. **Using `JSON.parse(fs.readFileSync(...))` synchronously** — blocks the event loop; use `fs.promises.readFile()` with `JSON.parse()` asynchronously
2. **Storing credentials in code** — never hardcode secrets; use environment variables, `.env` files (with `dotenv`), or secret managers
3. **Ignoring backpressure in streams** — not checking `writable.write()` return value causes memory exhaustion under load
4. **Using `process.exit()` for graceful shutdown** — abrupt exit loses data; use signal handlers (`SIGTERM`, `SIGINT`) for cleanup
5. **Not using `--max-old-space-size` for memory-heavy apps** — default heap (1.5GB) may be insufficient; tune for your workload
6. **Using `exec()` for user input** — `exec()` runs through shell and is vulnerable to injection; use `spawn()` with array arguments
7. **Not separating concerns in `package.json` scripts** — monolithic scripts are unmaintainable; compose smaller scripts
8. **Using global variables for state** — Node.js shares global state across requests; use request-scoped state or a database

## Common Mistakes

1. **Confusing `__dirname` and `__filename` in ESM** — these CJS globals do not exist in ESM; use `import.meta.dirname` (Node.js 21+) or `path.dirname(fileURLToPath(import.meta.url))`
2. **Forgetting `await` on async operations** — unawaited Promises fail silently; always `await` or `.catch()` async calls
3. **Not handling uncaught exceptions** — add `process.on('uncaughtException')` and `process.on('unhandledRejection')` handlers for logging
4. **Using `require()` in ESM modules** — ESM uses `import`; `require()` is not available without `createRequire()`
5. **Ignoring memory leaks in long-running processes** — event listeners, closures, and global arrays accumulate; monitor with `process.memoryUsage()`
6. **Not checking file existence before operations** — use `fs.access()` or `fs.stat()` with try/catch; never assume files exist
7. **Using `new Buffer()`** — deprecated since Node.js 6; always use `Buffer.from()`, `Buffer.alloc()`, or `Buffer.allocUnsafe()`
8. **Not respecting `NODE_ENV`** — production environments should disable debug logging, enable caching, and minimize error output

## Decision Guidelines

| Scenario | Approach |
|---|---|
| CPU-intensive computation | Worker Threads |
| Shell command execution | `child_process.execFile()` with args array |
| File streaming | `fs.createReadStream()` + `pipeline()` |
| Large file processing | Streams with backpressure handling |
| Parallel I/O operations | `Promise.all()` with async functions |
| Shared memory between threads | `SharedArrayBuffer` + `Atomics` |
| IPC between processes | `child_process.fork()` with `send()`/`on('message')` |
| Module system | ESM for new projects; CJS for legacy compatibility |
| Package management | pnpm for performance and strictness; npm for compatibility |
| Path construction | `path.join()` + `path.resolve()` |

## References

- [Node.js Documentation](https://nodejs.org/api)
- [Node.js Guides](https://nodejs.org/en/learn)
- [libuv Documentation](https://docs.libuv.org)
- [npm Documentation](https://docs.npmjs.com)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Practical Notes

- Node.js 20+ includes built-in test runner (`node:test`) — no need to install Jest for simple unit tests
- `--experimental-strip-types` (Node.js 22+) enables native TypeScript execution without compilation
- `node --watch` provides file watching and auto-restart without `nodemon`
- `process.kill(process.pid, 'SIGTERM')` triggers graceful shutdown handlers
- `EventEmitter` is the foundation of Node.js async patterns; understanding it is essential for streams, HTTP, and child processes
- Use `util.promisify()` to convert callback-based functions to Promise-based ones for older APIs
- `node:sqlite` (Node.js 22+) provides built-in SQLite support without external dependencies

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
