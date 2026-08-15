import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// 逐字保真测试：repo 里每个「上游逐字档」的 SHA-256 必须等于
// test/fixtures/verbatim.sha256.json 钉死的值（该 manifest 从上游 tarball
// frontend-slides@9906a34d640d2111f724544cbc50f7f130569ae1 产生）。
// 同时禁止多余档案混进逐字范围。这让「100% 原样复制」从宣称变成可自动验证
// 的事实（playbook N4）。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(readFileSync(join(ROOT, 'test', 'fixtures', 'verbatim.sha256.json'), 'utf8'));

const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

test('保真: 每个 manifest 档案的 SHA-256 逐字相符', () => {
  const entries = Object.entries(manifest);
  assert.equal(entries.length, 79, 'manifest 钉 79 个档案');
  for (const [rel, expected] of entries) {
    const p = join(ROOT, rel);
    assert.equal(sha256(p), expected, `${rel}: SHA-256 不符（上游逐字内容被改过）`);
  }
});

test('保真: 逐字范围内没有 manifest 外的多余档案', () => {
  const inScope = new Set(Object.keys(manifest));
  for (const p of walk(join(ROOT, 'skills'))) {
    const rel = relative(ROOT, p);
    assert.ok(inScope.has(rel), `${rel}: 逐字范围内多了 manifest 没有的档案`);
  }
});

test('保真: manifest 与 THIRD_PARTY_NOTICES.md 的 SHA-256 表一致', () => {
  const notices = readFileSync(join(ROOT, 'THIRD_PARTY_NOTICES.md'), 'utf8');
  const table = new Map(
    [...notices.matchAll(/^\| `([^`]+)` \| `([0-9a-f]{64})` \|$/gm)].map((m) => [m[1], m[2]]),
  );
  assert.ok(table.size >= 79, `NOTICES 表至少 79 行（实际 ${table.size}）`);
  for (const [rel, hash] of Object.entries(manifest)) {
    assert.equal(table.get(rel), hash, `NOTICES 表 ${rel} 与 manifest 一致`);
  }
});
