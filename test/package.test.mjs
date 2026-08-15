import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// package.json / cordis.patch.yml / LICENSE / THIRD_PARTY_NOTICES 的公开契约。
// 这层是「移植包装」：每条断言对应 playbook 的一条规则，改包装必须先改这里。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

test('package.json: 身分与 description', () => {
  assert.equal(pkg.name, 'dsh-frontend-slides');
  assert.equal(pkg.version, '0.1.0');
  assert.equal(pkg.license, 'MIT');
  // description 写进上游名（A 报告 10/16）且与 GitHub description 一字不差（16/18）
  const expected =
    'DeepSeek Harness 插件：零依赖的 HTML 幻灯片技能包——动画丰富的演示文稿与 PPT 转换（移植自 frontend-slides）';
  assert.equal(pkg.description, expected);
  assert.ok(pkg.description.includes('frontend-slides'), 'description 含上游名');
});

test('package.json: scripts 依 playbook（prepare 必须有）', () => {
  for (const s of ['test', 'prepare', 'prepack', 'prepublishOnly']) {
    assert.ok(pkg.scripts?.[s], `scripts.${s} 存在`);
  }
  // 上游没有 package.json（纯 Claude Code 插件 repo），无上游 script 可删——
  // 四个 script 全部是本移植的验证管线（见交付回报）。
});

test('package.json: dsh 插件合约', () => {
  assert.equal(pkg.dsh?.bundle?.patch, './cordis.patch.yml');
  assert.equal(pkg.main, './index.js', 'dsh 由 main 载入 cordis 插件');
  assert.equal(pkg.types, './index.d.ts', 'types 指向 index.d.ts（playbook 必备栏位）');
  assert.equal(pkg.devDependencies?.['@deepseek-ai/dsh-skill'], '0.1.0-rc.6', '精确钉版（playbook：不用 caret）');
  assert.equal(pkg.devDependencies?.['@deepseek-ai/cordis'], '4.0.1', '精确钉版');
  for (const f of ['index.js', 'index.d.ts', 'lib', 'skills', 'cordis.patch.yml', 'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'test/']) {
    assert.ok(pkg.files?.includes(f), `files 含 ${f}`);
  }
  assert.equal(pkg.keywords?.includes('dsh-plugin'), true, 'keywords 含 dsh-plugin');
  assert.equal(pkg.keywords?.includes('slides'), true, 'keywords 保留上游');
  assert.equal(pkg.repository?.url, 'git+https://github.com/GongYuanCaiJi/dsh-frontend-slides.git');
  assert.equal(pkg.homepage, 'https://github.com/GongYuanCaiJi/dsh-frontend-slides#readme');
  assert.equal(pkg.bugs?.url, 'https://github.com/GongYuanCaiJi/dsh-frontend-slides/issues');
  assert.ok(pkg.author, 'author 存在');
  assert.equal(pkg.engines?.node, '>=20');
});

test('cordis.patch.yml: insert 本插件', () => {
  const patch = readFileSync(join(ROOT, 'cordis.patch.yml'), 'utf8');
  assert.match(patch, /^-\s*insert:/m, '顶层 insert 条目');
  assert.match(patch, /- id: skills-frontend-slides/, 'insert 本插件 id');
  assert.match(patch, /name: ['"]?dsh-frontend-slides/, 'insert 本插件 name');
});

test('LICENSE: 上游逐字 + 移植者角色行（无 NOASSERTION 前缀）', () => {
  const license = readFileSync(join(ROOT, 'LICENSE'), 'utf8');
  assert.ok(license.includes('Copyright (c) 2025 Zara Zhang'), '上游 copyright 行逐字保留');
  assert.ok(license.includes('Copyright (c) 2026 GongYuanCaiJi (dsh port)'), '移植者行标 (dsh port) 角色');
  assert.ok(license.includes('MIT License'), 'MIT 全文');
  assert.ok(!license.includes('Original work:'), '无会让 GitHub 认不出 MIT 的前缀');
  assert.ok(!license.includes('Modified work:'), '无会让 GitHub 认不出 MIT 的前缀');
});

test('THIRD_PARTY_NOTICES.md: 钉住上游 tarball 身分', () => {
  const notices = readFileSync(join(ROOT, 'THIRD_PARTY_NOTICES.md'), 'utf8');
  for (const pin of [
    '`2.1.0`',
    'wlRupPhQ+wKV5GzSI23v0891TAxrhKoWpKOZcPKVod/FymFrfnH5sXDhszgkosQs8UPGi5OGZJH+5PPkenSqEw==',
    '6c652211f260a64436c64df067e4dc68c023ecf7',
    '9906a34d640d2111f724544cbc50f7f130569ae1',
  ]) {
    assert.ok(notices.includes(pin), `NOTICES 含 ${pin}`);
  }
});
