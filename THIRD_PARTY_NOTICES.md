# Third-party notices

## zarazhangrui/frontend-slides

This package is a port of [`zarazhangrui/frontend-slides`](https://github.com/zarazhangrui/frontend-slides).
The upstream source is used under the MIT License.

| | |
|---|---|
| Package | [`frontend-slides@2.1.0`](https://github.com/zarazhangrui/frontend-slides) (plugin version from `plugins/frontend-slides/.claude-plugin/plugin.json`) |
| Version | `2.1.0` |
| Repository | [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) |
| Author | Zara Zhang |
| License | MIT |
| Pinned commit | `9906a34d640d2111f724544cbc50f7f130569ae1` (2026-06-23) |
| Tarball | `https://github.com/zarazhangrui/frontend-slides/archive/9906a34d640d2111f724544cbc50f7f130569ae1.tar.gz` |
| Integrity | `sha512-wlRupPhQ+wKV5GzSI23v0891TAxrhKoWpKOZcPKVod/FymFrfnH5sXDhszgkosQs8UPGi5OGZJH+5PPkenSqEw==` |
| shasum (sha1) | `6c652211f260a64436c64df067e4dc68c023ecf7` |
| SHA-256 | `a310be4c37f8ad2efde894112828116643a49c8079b5275a3c13ee1137883d11` |
| gitHead | `9906a34d640d2111f724544cbc50f7f130569ae1` |

### What the port ships

The upstream plugin manifest (`.claude-plugin/plugin.json` at the pinned commit) ships the
plugin subtree `plugins/frontend-slides/`, whose skill content lives under
`plugins/frontend-slides/skills/frontend-slides/` — one skill named `frontend-slides`
(SKILL.md, STYLE_PRESETS.md, animation-patterns.md, html-template.md, viewport-base.css,
`bold-template-pack/` with 34 design templates, and `scripts/` for deploy / PDF export / PPTX
extraction). This port ships exactly that skill content, verbatim, under `skills/frontend-slides/`
(79 files).

Not shipped (upstream repo working files, not part of the plugin surface): the root-level copies
of the same skill files (byte-identical — verified by `diff -rq` against the plugin subtree), the
root `.claude-plugin/marketplace.json`, and `plugins/frontend-slides/.claude-plugin/plugin.json`
(a Claude Code manifest, not skill content). The dsh plugin contract lives in `package.json` +
`cordis.patch.yml` instead.

## Bundled third-party content (BOM)

The `bold-template-pack/` directory ships the design systems of a separate upstream repository.
Per issue #36's BOM requirement ("vendor 的第三方模板包要列進 BOM"):

| | |
|---|---|
| Component | `bold-template-pack/` — the 34 bold design systems |
| Source | [`zarazhangrui/beautiful-html-templates`](https://github.com/zarazhangrui/beautiful-html-templates) |
| Author | Zara Zhang (same author as the ported skill) |
| License | MIT — `Copyright (c) 2026 Zara Zhang` |
| License chain | The pack was vendored into `frontend-slides` (commit `a43b418`, "Add bold template pack with progressive disclosure"); both repositories are MIT by the same copyright holder, so the upstream `frontend-slides` LICENSE line covers the pack verbatim. |

The pack files are byte-identical to what upstream `frontend-slides` ships (covered by the
per-file SHA-256 table below and the `diff -rq` command above).

The dsh adaptation layer (`lib/skills.js`, `lib/frontmatter.js`) is adapted from
[`dsh-lens@0.2.5`](https://www.npmjs.com/package/dsh-lens) (MIT — `Copyright (c) 2026 dsh-lens
contributors`), the community-standard bundled-skill provider pattern; the MIT notice is retained
in the file headers. No dsh-lens code is redistributed in this package (the adapter is written
from the pattern, not copied from the package), so it carries no install-time obligations.

### Verifying the verbatim claim yourself

The README states that all shipped skill files are byte-identical to upstream. You do not have
to take that on trust — fetch the pinned upstream tarball and compare:

```bash
curl -sL https://github.com/zarazhangrui/frontend-slides/archive/9906a34d640d2111f724544cbc50f7f130569ae1.tar.gz | tar xz
diff -rq frontend-slides-9906a34d640d2111f724544cbc50f7f130569ae1/plugins/frontend-slides/skills/frontend-slides skills/frontend-slides && echo "verbatim OK"
```

Expected SHA-256 of every shipped file (79 files):

| `skills/frontend-slides/SKILL.md` | `832994fe1dfcce2aa7ceca9a1b7b708eca94becef242713999855f4e946cf4d5` |
| `skills/frontend-slides/STYLE_PRESETS.md` | `b0093ae6f9c295e561c7d4a9ddf69d0edfd2810b1721ba1c2022a1ad9681c82c` |
| `skills/frontend-slides/animation-patterns.md` | `1b7b7409893b68c09effb04f20a4603a5168e4956d76c3999c2ba8f86c4bbc8f` |
| `skills/frontend-slides/bold-template-pack/README.md` | `cd4ad5e87dba9f8cb0d794f449491b3028c7c8e69bfe22f44d964627536e2d40` |
| `skills/frontend-slides/bold-template-pack/deck-stage.js` | `ad1c016a6256c979c896241e2d890083f79c1624728b82b9800a2b17d87778b6` |
| `skills/frontend-slides/bold-template-pack/selection-index.json` | `0a60514a41af2be821f833025efdbf22ba7e3106d59f4aa76a0510341f37b504` |
| `skills/frontend-slides/bold-template-pack/templates/8-bit-orbit/design.md` | `bc574b5b0f6c0c426787eb7fffbb121ce4afdb649593ce2111a2f26ad3182d66` |
| `skills/frontend-slides/bold-template-pack/templates/8-bit-orbit/preview.md` | `1730889b6d7142f49ca92826f2df6ce52c6cf51c9baa8c3fc09e7e01ab17eea0` |
| `skills/frontend-slides/bold-template-pack/templates/biennale-yellow/design.md` | `091a7643aa2e950f51f171cf70ed3e979f7db7e01d5a6465fd85a842a96cbbd6` |
| `skills/frontend-slides/bold-template-pack/templates/biennale-yellow/preview.md` | `2d23d37cd8d827d02e4184e3e0f5fcd7a8ad89db462d00ae85144b8e2cc616e3` |
| `skills/frontend-slides/bold-template-pack/templates/block-frame/design.md` | `3c79748fa97a2a39bd38261ad58e941be29a531d9d5fa93c6b615f75647136ef` |
| `skills/frontend-slides/bold-template-pack/templates/block-frame/preview.md` | `a37e4662f7325c409a9ce83dbaab8db0bce5d55f7d31ac9f11a56acb496f8dbb` |
| `skills/frontend-slides/bold-template-pack/templates/blue-professional/design.md` | `595166d0c7c3356fff2e4ff997252fa5dc582c33ed8c7e7ad0d41b2a8043562f` |
| `skills/frontend-slides/bold-template-pack/templates/blue-professional/preview.md` | `36383d4516ef253bf952e2ebe984c83ea1bc51536bb1417a0285dec7a3e3ad9a` |
| `skills/frontend-slides/bold-template-pack/templates/bold-poster/design.md` | `59fee0dd77d49ddb237573fa8f6fc55f79eeaa5272d17693b5db49fa2d735d3b` |
| `skills/frontend-slides/bold-template-pack/templates/bold-poster/preview.md` | `35c37828d6298447689d89c0f99e5aeba668e2c816fb36e75159b10c8dfc3e14` |
| `skills/frontend-slides/bold-template-pack/templates/broadside/design.md` | `9685189216c91a1cd567a4bb7072dfd66bef6674004d21e3e7b89de7cc8ff98a` |
| `skills/frontend-slides/bold-template-pack/templates/broadside/preview.md` | `5bb7ab8e263c035868e077852da55c5d117e47cef621e8c356926f9649b4a435` |
| `skills/frontend-slides/bold-template-pack/templates/capsule/design.md` | `3fdf3872695d630fac7f3a57fc9bc66d4329d589db264a72b87097a8e5e09dd5` |
| `skills/frontend-slides/bold-template-pack/templates/capsule/preview.md` | `94638f4ff1065c079516215736768a93b8842ff78db76e3e6286ccf5aa215aad` |
| `skills/frontend-slides/bold-template-pack/templates/cartesian/design.md` | `7f385393c5f8eddc31647c230ba2d3ae93fe349758a709cedeb42e73ba4099ba` |
| `skills/frontend-slides/bold-template-pack/templates/cartesian/preview.md` | `163f8c1012b54cc97417320c1c1756e4dd2a97b0b71280411e512ebce01ec12f` |
| `skills/frontend-slides/bold-template-pack/templates/cobalt-grid/design.md` | `c029cdf0fe1c62e0c1b63da9f14b8116bc8952028d365964a6f0ddb2e15c296a` |
| `skills/frontend-slides/bold-template-pack/templates/cobalt-grid/preview.md` | `2894c2d60953e3a4f077a8cd8ba02d068ea40ab0efe4d91059ccb483ea1ec325` |
| `skills/frontend-slides/bold-template-pack/templates/coral/design.md` | `3a857af03c0a395f8a3a96d43472be7867eaac3537d071079ce67d9719b30f5e` |
| `skills/frontend-slides/bold-template-pack/templates/coral/preview.md` | `b3c9b0d994c27621eeb9cc53d134940be2eeb304cb55581e3e0d0be1c14576f1` |
| `skills/frontend-slides/bold-template-pack/templates/creative-mode/design.md` | `28dac7b32480da018f19c86bcf9e2fa0cbf370e28da6c8497ad37a1262ec7cde` |
| `skills/frontend-slides/bold-template-pack/templates/creative-mode/preview.md` | `b8f149b7c8690188f20945a1b5aa9bc0b4c9857b51214def2b79b509ec53502a` |
| `skills/frontend-slides/bold-template-pack/templates/daisy-days/design.md` | `10e88df9734be7bcb42d5861d2a7c4be9dea67881c2b38f3ceb20d22e0a629c6` |
| `skills/frontend-slides/bold-template-pack/templates/daisy-days/preview.md` | `423d1f7b419028fdfd4a220ee81ef4e611c565b19792f9f95b2862024248248a` |
| `skills/frontend-slides/bold-template-pack/templates/editorial-forest/design.md` | `faec062e3685cea2dc88b2913ac59aeb0a1d81ffed4e6f654b6f6bab7264d38d` |
| `skills/frontend-slides/bold-template-pack/templates/editorial-forest/preview.md` | `244f1eaa5065788c75d875de05b48985070a204d04fb6612c8beac34001998e2` |
| `skills/frontend-slides/bold-template-pack/templates/editorial-tri-tone/design.md` | `e950d0843f37a17a76d7f9d5724600182e525424b19d000f5ceae9a23abe6f91` |
| `skills/frontend-slides/bold-template-pack/templates/editorial-tri-tone/preview.md` | `6748839ebbdc5c900c568f13a7e8c33ed07721a09b007eb4eefbfc8c0fe9f5ef` |
| `skills/frontend-slides/bold-template-pack/templates/emerald-editorial/design.md` | `4765015e4b9b6628fb9201a1700bc5aba028e4711629c2d35a1434cbce5a5a64` |
| `skills/frontend-slides/bold-template-pack/templates/emerald-editorial/preview.md` | `5fbf8e7de29f0650e82e91ad549956ba724450fcea0ca06659636e2c552a8c24` |
| `skills/frontend-slides/bold-template-pack/templates/grove/design.md` | `17ef6810470af7fafacb99e5411312ce1b80d7b4bcf96f93832c50636d21919f` |
| `skills/frontend-slides/bold-template-pack/templates/grove/preview.md` | `8de5f0de1d83dd90c7ba6f4e224db335e80fffeb435f5eeebea39a7b4bb2d1f1` |
| `skills/frontend-slides/bold-template-pack/templates/long-table/design.md` | `7ded64d5a1b14af09db5f34ba9cf369df9350294ce76c53ac41997efc2020aa0` |
| `skills/frontend-slides/bold-template-pack/templates/long-table/preview.md` | `170e3c48453b09354f92bc4d16135bdce829e5c7d39256295b88dfdfa64cd066` |
| `skills/frontend-slides/bold-template-pack/templates/mat/design.md` | `f4e49cb42e66ec0e2690843531822e5deba32fb55b2d505661b3b50292a67333` |
| `skills/frontend-slides/bold-template-pack/templates/mat/preview.md` | `ea0d5b9d1c3350759072a785bcfd1164911b871d8a8778a7dbe16739446e2599` |
| `skills/frontend-slides/bold-template-pack/templates/monochrome/design.md` | `0e24af25fff9b4b94f1dcafca04f009430efcf76a2ed405b6dae79e99f0c987d` |
| `skills/frontend-slides/bold-template-pack/templates/monochrome/preview.md` | `9ae255b11f13b496c238febec2a55b5b478e31119e0361d62c54886aa49fdfed` |
| `skills/frontend-slides/bold-template-pack/templates/neo-grid-bold/design.md` | `7cdaa5a230f123e6a0c4f10a15f5dabd418108930489b224ffe6e281956d242a` |
| `skills/frontend-slides/bold-template-pack/templates/neo-grid-bold/preview.md` | `d9420683af6d52da513a4c398ced09f5933ae8596671821cf99ba8c69fda3019` |
| `skills/frontend-slides/bold-template-pack/templates/peoples-platform/design.md` | `8926de8264a3b95d83eb0334d6063bf61271308e971617193541abbf50a88c43` |
| `skills/frontend-slides/bold-template-pack/templates/peoples-platform/preview.md` | `1faace4b67e1904435a206fde7cf253754bba2542208ae9962e3360e1617157d` |
| `skills/frontend-slides/bold-template-pack/templates/pin-and-paper/design.md` | `3b68301860d910bf07a842a8658e71e0e01742d76f18689a4c5505605e66d7ed` |
| `skills/frontend-slides/bold-template-pack/templates/pin-and-paper/preview.md` | `2812cd79ce8bc15b920d9fe21850857215b2363ed25a1de0a54fd0bb3d822fdc` |
| `skills/frontend-slides/bold-template-pack/templates/pink-script/design.md` | `b4033ca857a55ca1d3b46d65267a7d1b137f243c704419c4e8704c400574200c` |
| `skills/frontend-slides/bold-template-pack/templates/pink-script/preview.md` | `ee0d8bc0f654c8b95fc29680c2b622722fad38b315b5c66218b70106193e456b` |
| `skills/frontend-slides/bold-template-pack/templates/playful/design.md` | `fae0cc9e05db960667be51043926e3a25a4e415e8d58ffd8caee0545b7fd32c3` |
| `skills/frontend-slides/bold-template-pack/templates/playful/preview.md` | `6f297acf7e5d8e1663ef968c0e9875e5e19b7fa848d9ccbab22d14e9511c881e` |
| `skills/frontend-slides/bold-template-pack/templates/raw-grid/design.md` | `a0d1d7141c2e2906b10371ae8794c1ea3ad88ab982c8a95e59246b200ed61799` |
| `skills/frontend-slides/bold-template-pack/templates/raw-grid/preview.md` | `0ce50491490c24dea29d6049db850f7c1bda6ebc6aeb72bc563fe9264765b8db` |
| `skills/frontend-slides/bold-template-pack/templates/retro-windows/design.md` | `379fe22b2332ae39d313314d1bc8784e562df197f019703896fd153e9a9734aa` |
| `skills/frontend-slides/bold-template-pack/templates/retro-windows/preview.md` | `f4d9754e70fb17337f474723ad1bd91bdc2217464ad48c2e9c4011589643a0cf` |
| `skills/frontend-slides/bold-template-pack/templates/retro-zine/design.md` | `39e5ce286d4aba5e0120b8b92d120540e43c071e4c97ae8334842866b12a7982` |
| `skills/frontend-slides/bold-template-pack/templates/retro-zine/preview.md` | `c7fc560496942399abf77c46c2ba226db39bbb0fb52524d942372e9d4f5b7518` |
| `skills/frontend-slides/bold-template-pack/templates/sakura-chroma/design.md` | `678f1ca11bfb31794a751f47ee4712a07a1b383489b9366e5336d83cbdcdef07` |
| `skills/frontend-slides/bold-template-pack/templates/sakura-chroma/preview.md` | `0f0a07142586449e16c799205291db7e210e499bb70082310bd72b0de659e7e6` |
| `skills/frontend-slides/bold-template-pack/templates/scatterbrain/design.md` | `7127075e1f15fa6ed8c2d0f8f79b6176a33b8e4428214fefdba5cd77c2ccf7cc` |
| `skills/frontend-slides/bold-template-pack/templates/scatterbrain/preview.md` | `adc35bdbd117188534394a1e030d9344315ae18c71a57b76b5a2f7f462b4f64b` |
| `skills/frontend-slides/bold-template-pack/templates/signal/design.md` | `8734d989e2c315398a341b23f02eacc10e30158018c4e0aafb161ddfe422b7f5` |
| `skills/frontend-slides/bold-template-pack/templates/signal/preview.md` | `4da8d49501aebba28081acb41853ff06b9267039e839e9d62cd992bbd96fc950` |
| `skills/frontend-slides/bold-template-pack/templates/soft-editorial/design.md` | `7c75a06d39d66e2b6ae2e4421237145c2fc06024cfd7574e2ba660be5fd5455b` |
| `skills/frontend-slides/bold-template-pack/templates/soft-editorial/preview.md` | `fbc1bbf90cc808c135e342f9bd56c7c90c1d2b1dfc42834e4eb1b6fb17331e01` |
| `skills/frontend-slides/bold-template-pack/templates/stencil-tablet/design.md` | `772e0d440002b632efa8792e2fc24c13a7677e3694e888c1459e3a264eb492ae` |
| `skills/frontend-slides/bold-template-pack/templates/stencil-tablet/preview.md` | `f69e153924e18f4f5570fbfdd6e418749b1495947c25fe8a0b890ee33c84f7b7` |
| `skills/frontend-slides/bold-template-pack/templates/studio/design.md` | `257d7b1f546149a3fec14f0b44bed6cb6617eb128a530dd93c4b36b6fee21fe9` |
| `skills/frontend-slides/bold-template-pack/templates/studio/preview.md` | `d6e27112f165bb9fcd6e38652326b1b155c37bc375054fe756509d84c61a0a52` |
| `skills/frontend-slides/bold-template-pack/templates/vellum/design.md` | `2cb53b82f4c832a04921e384741891110a42084854d91d8da367b6074157f718` |
| `skills/frontend-slides/bold-template-pack/templates/vellum/preview.md` | `c5c1d2f24a4c6cb30bff7b55f9a49b7d841100ff396bae7d2ed4a27ea07da809` |
| `skills/frontend-slides/html-template.md` | `893ab49200ed5c3186d3b031333f5b61916b179dad2dafd5572ff8f66cd0b91a` |
| `skills/frontend-slides/scripts/deploy.sh` | `74a1103519a61f90bf3912ee2eda81c77be0b944700d213e7fc08506bd8745f1` |
| `skills/frontend-slides/scripts/export-pdf.sh` | `16336202904f677bb988e784a3e1d5098ff09381733b63047c3a688d6a1989b4` |
| `skills/frontend-slides/scripts/extract-pptx.py` | `4f5e7603c99b8b53e20c5b2a65abdf5edf9422b4c490dca9f2b872a752c17d2a` |
| `skills/frontend-slides/viewport-base.css` | `7424eb3fca809d85eedb3019a7b5bff571dc553c7b73b02120d068e12b2a6a03` |
