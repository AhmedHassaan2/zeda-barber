# JavaScript ES2017+ — Knowledge Reference

## Purpose

Reference for modern JavaScript (ES2017+) features essential for production development. Covers async patterns, closures, prototypes, event loop mechanics, modules, advanced data structures, and newer APIs like WeakRef and FinalizationRegistry.

## Core Concepts

### Async/Await

`async/await` is syntactic sugar over Promises. An `async` function always returns a Promise. `await` pauses execution until a Promise settles. Error handling uses `try/catch`. Async functions enable sequential-looking asynchronous code without callback nesting.

### Promises

Promises represent eventual completion/failure of an asynchronous operation. Three states: pending, fulfilled, rejected. `Promise.all()` runs concurrently and rejects on first failure. `Promise.allSettled()` waits for all to settle regardless of outcome. `Promise.race()` returns first settled. `Promise.any()` returns first fulfilled, ignores rejections until all reject.

### Closures

A closure is a function that retains access to its lexical scope even when executed outside that scope. Closures are fundamental to module patterns, callbacks, event handlers, and functional programming. Every function in JavaScript forms a closure over its surrounding variables.

### Prototypes

JavaScript uses prototypal inheritance. Every object has an internal `[[Prototype]]` link. `Object.create()` sets the prototype. `class` syntax is syntactic sugar over prototype-based inheritance. `__proto__` is deprecated; use `Object.getPrototypeOf()` and `Object.setPrototypeOf()`.

### Event Loop

JavaScript is single-threaded with an event loop. Call stack executes synchronous code. Microtasks (Promises, `queueMicrotask`) run after each task. Macrotasks (`setTimeout`, `setImmediate`, I/O callbacks) run between task batches. `process.nextTick()` (Node.js) runs before other microtasks.

### ES Modules

ESM is the standard module system. `import`/`export` syntax. Static analysis enables tree-shaking. Modules are deferred by default. `import()` enables dynamic imports. Named exports vs default exports — prefer named exports for better refactoring and tree-shaking.

### Iterators and Generators

Iterator protocol: `next()` method returning `{ value, done }`. Generator functions (`function*`) yield values lazily. `for...of` consumes iterators. Generators enable custom iteration, lazy evaluation, and coroutine-like patterns.

### Proxy and Reflect

`Proxy` intercepts operations on objects (get, set, has, deleteProperty, apply, construct). `Reflect` provides default operations matching each Proxy trap. Used for validation, logging, reactive systems, and metaprogramming.

### WeakRef and FinalizationRegistry

`WeakRef` holds a weak reference to an object, allowing garbage collection. `FinalizationRegistry` registers callbacks for when objects are garbage collected. Used for caches, resource management, and memory-sensitive applications. Unreliable for timing-critical operations.

## Best Practices

1. **Use `async/await` over raw Promises** — sequential async code is more readable; chain `.then()` only for independent parallel operations
2. **Always handle Promise rejections** — unhandled rejections crash Node.js processes; use `try/catch` or `.catch()` on every Promise chain
3. **Prefer `const` over `let`** — immutability by default prevents accidental reassignment; use `let` only when reassignment is genuinely needed
4. **Use arrow functions for callbacks, regular functions for methods** — arrow functions capture `this` lexically; regular functions have dynamic `this`
5. **Use `Map`/`Set` over plain objects for collections** — `Map` preserves key types, supports non-string keys, and has O(1) lookup; `Set` for unique values
6. **Leverage destructuring for clean parameter extraction** — `function createUser({ name, email, role = 'user' })` is cleaner than manual property access
7. **Use template literals over string concatenation** — better readability, multi-line support, and tagged template literals for advanced use cases
8. **Prefer `for...of` over `for` loops for iteration** — `for...of` is cleaner, works with iterables, and avoids off-by-one errors

## Anti-Patterns

1. **`var` usage** — function-scoped instead of block-scoped; causes hoisting bugs; always use `const`/`let`
2. **Deep Promise chains without `await`** — nested `.then()` callbacks defeat the purpose of Promises; use `async/await`
3. **Using `==` instead of `===`** — loose equality performs type coercion with unexpected results; always use strict equality
4. **Mutating function parameters** — side effects make code unpredictable; treat parameters as immutable
5. **Creating new arrays/objects in hot loops** — allocation pressure causes GC pauses; reuse or pre-allocate when performance matters
6. **Using `arguments` object** — not available in arrow functions, array-like but not an array; use rest parameters (`...args`)
7. **Synchronous I/O in async contexts** — blocking the event loop with `fs.readFileSync` degrades throughput; use async alternatives
8. **Not using optional chaining for deeply nested access** — `a?.b?.c?.d` prevents TypeError; nullish coalescing (`??`) provides defaults

## Common Mistakes

1. **Forgetting that `async` functions return Promises** — `const result = await asyncFn()` is correct; `await` unwraps the Promise
2. **`this` binding confusion in callbacks** — arrow functions capture `this` from enclosing scope; regular functions get `this` from call site
3. **Stale closure in `useEffect`** — the closure captures variables at creation time; use dependency arrays or functional updates
4. **Not understanding Promise microtask timing** — `Promise.resolve().then(fn)` runs before `setTimeout(fn, 0)`
5. **Overwriting `Array.prototype` or `Object.prototype`** — prototype pollution breaks all code sharing the same prototype chain
6. **Using `Array.includes` for objects** — `includes` checks reference equality, not structural equality; use `.find()` with a predicate
7. **Ignoring `Symbol` for unique identifiers** — `Symbol()` creates truly unique values; useful for private properties and well-known symbols
8. **Not using `finally` for cleanup** — `try/catch/finally` ensures cleanup runs regardless of success or failure

## Decision Guidelines

| Scenario | Approach |
|---|---|
| Sequential async operations | `async/await` |
| Independent parallel async | `Promise.all()` / `Promise.allSettled()` |
| First settled wins | `Promise.race()` |
| First fulfilled wins | `Promise.any()` |
| Key-value collection | `Map` |
| Unique values | `Set` |
| Weak references for caches | `WeakMap` / `WeakRef` |
| Lazy iteration | Generator function |
| Metaprogramming | `Proxy` + `Reflect` |
| Dynamic imports | `import()` |

## References

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info)
- [ECMAScript Specification](https://tc39.es/ecma262)
- [Node.js API Documentation](https://nodejs.org/api)

## Practical Notes

- `WeakRef` and `FinalizationRegistry` are not widely used in application code; they're for library authors and memory-sensitive systems
- `Promise.allSettled()` was introduced in ES2020; polyfill for older environments
- `structuredClone()` (ES2022) performs deep cloning including circular references; replaces manual JSON parse/stringify cloning
- `Array.at()` (ES2022) enables negative indexing: `arr.at(-1)` returns the last element
- `Object.hasOwn()` (ES2022) replaces `obj.hasOwnProperty()` which can be overridden
- `using` keyword (ES2022/explicit resource management) is experimental; check runtime support before adopting
