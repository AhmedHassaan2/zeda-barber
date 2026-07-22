---
title: Typescript
description: Typescript reference documentation
---

# Typescript

# TypeScript — Knowledge Reference

## Purpose

Comprehensive reference for TypeScript development in strict mode. Covers type system fundamentals, advanced patterns, generics, utility types, type narrowing, and module organization. Focused on practical type-safe code for production applications.

## Core Concepts

### Strict Mode Configuration

Enable `strict: true` in `tsconfig.json` to activate all strict type-checking options: `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `noImplicitAny`, `noImplicitThis`, `alwaysStrict`, `useUnknownInCatchVariables`, and `exactOptionalPropertyTypes`. This is non-negotiable for production TypeScript.

### Type Inference

TypeScript infers types from usage. Explicit annotation is needed when inference is insufficient or when you want to enforce a contract. Use `satisfies` operator (TS 4.9+) to validate types without widening.

### Generics

Generics create reusable, type-safe components. They accept type parameters that preserve type relationships across function signatures, interfaces, and classes. Constraints via `extends` narrow generic bounds.

### Utility Types

Built-in types that transform other types: `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, `Readonly<T>`, `ReturnType<T>`, `Parameters<T>`, `Extract<T, U>`, `Exclude<T, U>`, `NonNullable<T>`, `Awaited<T>`.

### Type Narrowing

TypeScript narrows types through control flow: `if` checks, `typeof`, `instanceof`, `in`, equality checks, truthiness, and custom type guards (`x is Type`). Discriminated unions narrow via tag properties.

### Discriminated Unions

Sum types where each variant has a common literal property (the discriminant). Pattern matching via switch/if-else on the discriminant gives exhaustive type narrowing.

```typescript
type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
  | { status: 'loading' };
```

### Mapped Types

Transform existing types by iterating over keys: `{ [K in keyof T]: NewType }`. Combine with conditionals, modifiers (`+readonly`, `-readonly`, `+?`, `-?`), and key remapping (`as`).

### Conditional Types

Type-level if/else: `T extends U ? X : Y`. Distributes over unions. Used extensively in utility types. `infer` keyword extracts types within conditional type expressions.

### Module Augmentation

Extend existing module types with `declare module 'package-name' { ... }`. Useful for adding types to third-party libraries or extending global types.

### Declaration Files

`.d.ts` files provide type information for JavaScript modules. `@types/` packages on npm supply community-maintained declarations. Write declaration files for untyped libraries you consume.

### Const Assertions

`as const` assertion converts literal values to their narrowest type and makes objects/tuples deeply readonly. Essential for literal type preservation in configuration objects and enum-like patterns.

## Best Practices

1. **Enable `strict: true` and never disable it** — strict mode catches real bugs; workarounds create technical debt that compounds over time
2. **Prefer `interface` for object shapes and `type` for unions/intersections** — interfaces merge naturally, support `extends`, and give clearer errors; types are better for complex compositions
3. **Use `unknown` over `any` for untyped data** — `unknown` forces type narrowing before use; `any` disables all type checking
4. **Leverage discriminated unions for state machines** — model API responses, component states, and domain events as tagged unions for exhaustive handling
5. **Use `satisfies` to validate without widening** — `const x = { a: 1 } satisfies Record<string, number>` preserves literal types while checking structure
6. **Extract reusable types into dedicated files** — create `types/` directories for shared domain types, API contracts, and component prop types
7. **Use branded types for domain primitives** — `type UserId = string & { readonly __brand: 'UserId' }` prevents mixing IDs of different types
8. **Prefer `Pick`/`Omit` over manual type redefinition** — derive types from base types to maintain a single source of truth

## Anti-Patterns

1. **Using `any` to silence the compiler** — `any` is a type-checking escape hatch; every `any` is a potential runtime error
2. **Repeating type definitions across files** — violates DRY; extract shared types into a centralized types module
3. **Using type assertions (`as`) liberally** — assertions bypass type checking; prefer type guards or `satisfies`
4. **Ignoring TypeScript errors with `// @ts-ignore`** — fix the root cause; `@ts-expect-error` with explanation is acceptable for documented edge cases only
5. **Defining overly complex generic types** — if a type definition exceeds 3 lines, simplify or split it
6. **Not using `noUncheckedIndexedAccess`** — array/object index access can return `undefined`; enable this option and handle explicitly
7. **Manually typing everything instead of inferring** — let TypeScript infer when possible; annotate only when needed for contracts or clarity
8. **Mixing runtime and compile-time types carelessly** — use `zod` or `io-ts` for runtime validation; TypeScript types are erased at compile time

## Common Mistakes

1. **`strictNullChecks` not enabled** — the most common source of null/undefined runtime errors; always enable
2. **Forgetting that `interface` vs `type` matters for declarations merging** — `interface` merges across declarations; `type` does not
3. **Using `string` for IDs instead of branded types** — `string` is too broad; `UserId` and `PostId` should be distinct types
4. **Over-typing function parameters** — unnecessary type annotations clutter code; infer from usage
5. **Not handling `never` type exhaustiveness checks** — add a `switch` on `never` in discriminated unions to catch unhandled variants at compile time
6. **Using `Function` type** — too vague; use `(...args: unknown[]) => unknown` or specific function signatures
7. **Importing types with `import` instead of `import type`** — `import type` ensures zero runtime cost and avoids circular dependency issues
8. **Not using template literal types for string patterns** — `type Route = '/' | '/about' | '/dashboard'` catches typos; template literals enable dynamic patterns

## Decision Guidelines

| Scenario | Approach |
|---|---|
| Untyped external data | `unknown` + type guard or zod schema |
| Shared object shape | `interface` |
| Union or intersection type | `type` |
| Domain primitive (ID, email) | Branded type |
| API response modeling | Discriminated union |
| Configuration object | `satisfies` + `as const` |
| Reusable component props | Generic type parameters |
| Extending third-party types | Module augmentation or declaration merging |
| Runtime validation | zod/io-ts schema + inferred types |
| Null safety | `strictNullChecks` + optional chaining + nullish coalescing |

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript)
- [Total TypeScript](https://www.totaltypescript.com)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

## Practical Notes

- `tsc --noEmit` for type-checking without output; `tsc --watch` for development
- Use `ts-reset` for improved built-in type utilities (wider adoption of stricter array/object types)
- `satisfies` was introduced in TypeScript 4.9; ensure your project targets this version or later
- ESLint with `@typescript-eslint` catches type-related issues beyond what `tsc` enforces
- `tsconfig.json` paths aliases (`@/components/*`) improve import ergonomics; pair with build tool configuration
- Consider `typeRoots` and `paths` in `tsconfig.json` for clean import organization

## Related Topics

See [Knowledge Base](/knowledge/) for all reference documents.
