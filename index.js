// dsh-frontend-slides plugin entry.
//
// The skill itself is the upstream zarazhangrui/frontend-slides files verbatim
// (see THIRD_PARTY_NOTICES.md); this entry and lib/skills.js are the only dsh
// adaptation layer — registering it with the dsh skills registry so the
// `skill` tool can load it at runtime.

import { registerFrontendSlidesSkills } from './lib/skills.js'

export const name = 'dsh-frontend-slides'

export function apply(ctx) {
  registerFrontendSlidesSkills(ctx)
}
