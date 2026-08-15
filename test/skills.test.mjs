import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Context } from '@deepseek-ai/cordis'
import { SkillRegistry, isSkillName } from '@deepseek-ai/dsh-skill'
import { listBundledSkills, registerFrontendSlidesSkills, PROVIDER } from '../lib/skills.js'
import { apply } from '../index.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SKILLS_BASE = join(ROOT, 'skills')

// Independent source of truth: the pinned upstream manifest
// zarazhangrui/frontend-slides@2.1.0 (plugins/frontend-slides/.claude-plugin/plugin.json,
// gitHead 9906a34d640d2111f724544cbc50f7f130569ae1). The upstream plugin ships exactly
// one skill named `frontend-slides`; the port ships exactly that surface.
const EXPECTED_SKILLS = ['frontend-slides']

function makeContext() {
  const ctx = new Context()
  const registry = new SkillRegistry(ctx)
  return { ctx, registry }
}

test('listBundledSkills returns exactly the upstream plugin surface', () => {
  const candidates = listBundledSkills()
  const names = candidates.map((c) => c.name).sort()
  assert.deepEqual(names, [...EXPECTED_SKILLS].sort())
})

test('every candidate satisfies the dsh skill registry contract', () => {
  const candidates = listBundledSkills()
  assert.ok(candidates.length > 0)
  for (const c of candidates) {
    assert.ok(isSkillName(c.name), `invalid skill name ${c.name}`)
    assert.equal(typeof c.description, 'string')
    assert.ok(c.description.length > 0, `${c.name} must have a description`)
    assert.deepEqual(c.invocation, { modelInvocable: true, userInvocable: true })
    assert.equal(c.provider, PROVIDER)
    assert.equal(c.source, 'bundled')
    assert.equal(c.rank, 600)
    assert.equal(c.resourceBase?.kind, 'directory')
    assert.ok(typeof c.resourceBase?.path === 'string')
    // locator must point at the skill's SKILL.md inside the package
    assert.equal(c.locator, join(c.resourceBase.path, 'SKILL.md'))
    assert.ok(readFileSync(c.locator, 'utf8').length > 0)
  }
})

test('registerFrontendSlidesSkills wires the provider into a real registry', async () => {
  const { ctx, registry } = makeContext()
  registerFrontendSlidesSkills(ctx)
  const summaries = await registry.list({ cwd: ROOT })
  const names = summaries.map((s) => s.name).sort()
  assert.deepEqual(names, [...EXPECTED_SKILLS].sort())
  for (const s of summaries) {
    assert.ok(s.description.length > 0, `${s.name} catalog description missing`)
    assert.equal(s.invocation.modelInvocable, true)
  }
})

test('registry.get loads verbatim upstream content through the provider', async () => {
  const { ctx, registry } = makeContext()
  registerFrontendSlidesSkills(ctx)
  const skill = await registry.get('frontend-slides', { cwd: ROOT })
  assert.ok(skill, 'frontend-slides must resolve')
  const onDisk = readFileSync(join(SKILLS_BASE, 'frontend-slides', 'SKILL.md'), 'utf8')
  assert.equal(skill.content, onDisk, 'content must be the verbatim upstream SKILL.md')
  assert.equal(skill.name, 'frontend-slides')
  assert.equal(skill.provider, PROVIDER)
  assert.equal(skill.source, 'bundled')
  assert.equal(skill.resourceBase?.kind, 'directory')
  assert.equal(skill.resourceBase?.path, join(SKILLS_BASE, 'frontend-slides'))
  assert.ok(skill.description.length > 0)
})

test('index apply() registers the full catalog', async () => {
  const { ctx, registry } = makeContext()
  apply(ctx)
  const summaries = await registry.list({ cwd: ROOT })
  assert.deepEqual(summaries.map((s) => s.name).sort(), [...EXPECTED_SKILLS].sort())
})
