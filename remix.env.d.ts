/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare/globals" />
/// <reference types="@cloudflare/workers-types" />

export {};

declare global {
  const TODOS: KVNamespace;
}