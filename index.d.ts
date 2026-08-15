// Type declarations for the dsh-frontend-slides plugin entry.
//
// The package is plain JavaScript; this mirrors the exports in index.js
// (name + apply) so TypeScript consumers get typed access to the plugin
// surface. The plugin is loaded by the dsh harness through cordis.

import type { Context } from '@deepseek-ai/cordis'

export const name: 'dsh-frontend-slides'

export function apply(ctx: Context): void
