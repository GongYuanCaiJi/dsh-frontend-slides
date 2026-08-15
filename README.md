<div align="center">

# 🎨 dsh-frontend-slides

**零依赖的 HTML 幻灯片技能包，原样移植为 DeepSeek Harness 插件——用浏览器原生的 16:9 舞台生成动画丰富的演示文稿，或直接把 PPT/PPTX 转成网页。**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-8A2BE2)](https://github.com/deepseek-ai/deepseek-harness)
[![upstream](https://img.shields.io/badge/upstream-zarazhangrui%2Ffrontend-slides%202.1.0-181717)](https://github.com/zarazhangrui/frontend-slides)

[English](#english) · [中文](#中文)

</div>

## 中文

本插件**移植自** [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)
（27k+ star 的 Claude Code 演示文稿技能），**逐字移植**为 dsh 插件：上游插件宣告的 `frontend-slides`
技能原封不动地搬进
`skills/frontend-slides/`，通过 dsh 的 `skill` 工具加载。上游文字是英文，按「100% 原样复制」规则
不翻译——技能正文保持上游原文。

### 功能

- **一个技能，零改动**：`frontend-slides`（SKILL.md 380 行）——零依赖、动画丰富、可离线运行的 HTML
  演示文稿；含风格预设（`STYLE_PRESETS.md`）、动画模式（`animation-patterns.md`）、
  HTML 模板（`html-template.md`）与视口基础样式（`viewport-base.css`）。
- **34 套 Bold 模板库**：`bold-template-pack/` 带逐套 `design.md` + `preview.md` 卡片，
  先看小卡片再加载完整设计，专治「AI slop」审美。
- **PPT 转换脚本**：`scripts/extract-pptx.py` 把 PPTX 提取为可编辑的网页幻灯片；
  `scripts/export-pdf.sh` / `scripts/deploy.sh` 负责导出与部署。
- **逐字可自验**：全部 79 个技能文件与上游 v2.1.0（commit `9906a34`）逐字节一致，
  杂凑钉在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，附可直接复制的验证命令。
- **按需加载**：catalog 只暴露名字与描述，技能正文在模型真正调用时才读取，不占启动时间。

### 效果

装上之后，模型在会话中能看到技能 catalog，并在任务匹配时用 `skill` 工具加载完整正文——无论用户想要
「做一个幻灯片」「把 PPT 转成网页」还是「给演讲做一份 deck」，都会按上游原样给出 16:9 舞台、
零依赖单 HTML、动画与 Bold 模板的完整工作流。也支持用户显式调用：在输入里以 `/frontend-slides` 开头即可加载。

### 安装

```sh
dsh plugin --profile <name> add github:GongYuanCaiJi/dsh-frontend-slides
```

本插件零运行时依赖，但带一个 `prepare` 形状检查脚本。用 `add github:...` 安装时，
若 pnpm 提示 build-script 白名单（allowBuilds），按提示允许即可。

本地路径安装（同样零依赖，无需先 `npm install`）：

```sh
git clone https://github.com/GongYuanCaiJi/dsh-frontend-slides.git
cd dsh-frontend-slides
dsh plugin --profile <name> add .
```

### 用法

装好即用，无需额外配置：模型在会话中看到技能 catalog，任务匹配时自动加载技能正文；
也可以显式调用——在输入里以 `/frontend-slides` 开头。

### 移植出身

本包是 [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) 的**移植**（port），
上游为 MIT 许可，Copyright (c) 2025 Zara Zhang——LICENSE 见 [LICENSE](LICENSE)，
逐字文件的杂凑与验证命令见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
只保留上游插件实际发布的技能内容（`plugins/frontend-slides/skills/frontend-slides/**`，79 档）；
仓库根目录与插件子树逐字节相同的开发副本不在插件范围内，未移植。

**如果你喜欢这个技能，请也给[上游仓库](https://github.com/zarazhangrui/frontend-slides)点个 star。**

### License

MIT。上游 [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)
`Copyright (c) 2025 Zara Zhang`，本移植 `Copyright (c) 2026 GongYuanCaiJi`。见 [LICENSE](LICENSE)。

授权/合规问题请开 issue：https://github.com/GongYuanCaiJi/dsh-frontend-slides/issues

---

## English

# dsh-frontend-slides

This plugin is a **verbatim port** of [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)
(a 27k+ star Claude Code presentation skill) to DeepSeek Harness: the `frontend-slides` skill shipped by the
upstream plugin is copied unchanged into `skills/frontend-slides/`, and loaded through dsh's `skill` tool.
Per the "100% verbatim copy" rule, the English skill bodies are **not translated**.

### Features

- **One skill, zero changes**: `frontend-slides` (SKILL.md, 380 lines) — zero-dependency, animation-rich,
  offline-capable HTML presentations; includes style presets (`STYLE_PRESETS.md`), animation patterns
  (`animation-patterns.md`), an HTML template (`html-template.md`), and viewport base styles
  (`viewport-base.css`).
- **34-template Bold library**: `bold-template-pack/` with per-template `design.md` + `preview.md` cards —
  preview small cards first, load the full design only after the user picks a template. Anti "AI slop".
- **PPT conversion scripts**: `scripts/extract-pptx.py` converts PPTX into editable web slides;
  `scripts/export-pdf.sh` / `scripts/deploy.sh` handle export and deployment.
- **Self-verifiable verbatim claim**: all 79 skill files are byte-identical to upstream v2.1.0
  (commit `9906a34`); hashes are pinned in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) with copy-paste
  verification commands.
- **Lazy loading**: the catalog exposes the name and description only; the skill body is read when the model
  actually loads it — no boot-time cost.

### What you get

Once installed, the model sees the skill catalog in the session and loads the full body via the `skill` tool
when a task matches — "make a presentation", "convert this PPT to web", "build a deck for my talk" all get the
upstream workflow as-is: a fixed 16:9 stage, zero-dependency single HTML, animation, and the Bold template
library. Users can also invoke the skill explicitly by starting a message with `/frontend-slides`.

### Install

```sh
dsh plugin --profile <name> add github:GongYuanCaiJi/dsh-frontend-slides
```

This package has zero runtime dependencies but ships a `prepare` shape-check script. When installing
with `add github:...`, if pnpm asks about the build-script allowlist (`allowBuilds`), approve it.

Local-path install (also zero dependencies — no `npm install` needed first):

```sh
git clone https://github.com/GongYuanCaiJi/dsh-frontend-slides.git
cd dsh-frontend-slides
dsh plugin --profile <name> add .
```

### Usage

Ready to use after install — no configuration needed: the model sees the skill catalog in the session and
loads the skill body when a task matches. You can also invoke it explicitly by starting a message with
`/frontend-slides`.

### Attribution

This package is a **port** of [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides).
Upstream is MIT licensed, Copyright (c) 2025 Zara Zhang — see [LICENSE](LICENSE); per-file hashes and
verification commands live in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Only the skill content the
upstream plugin actually ships (`plugins/frontend-slides/skills/frontend-slides/**`, 79 files) is ported;
the byte-identical root-level working copies are outside the upstream plugin surface and are not included.

**If you like this skill, please also star the [upstream repository](https://github.com/zarazhangrui/frontend-slides).**

### License

MIT. Upstream [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)
`Copyright (c) 2025 Zara Zhang`; this port `Copyright (c) 2026 GongYuanCaiJi`. See [LICENSE](LICENSE).

For license or compliance questions, open an issue: https://github.com/GongYuanCaiJi/dsh-frontend-slides/issues
