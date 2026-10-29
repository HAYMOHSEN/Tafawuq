#!/usr/bin/env node
// Builds a clean release folder + zip (no tests, no work-in-progress) ready for GitHub Pages / PWABuilder.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const root = path.join(__dirname, '..');
const out = path.resolve(root, '..', 'tafawuq-release');
cp.execSync('node ' + JSON.stringify(path.join(__dirname, 'build.js')), { stdio: 'inherit' });
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const copy = (rel) => { const src = path.join(root, rel), dst = path.join(out, rel); fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); };
['index.html', 'manifest.webmanifest', 'sw.js', 'data/content.js'].forEach(copy);
['css', 'js', 'fonts', 'icons'].forEach(d => fs.readdirSync(path.join(root, d)).filter(f => !f.startsWith('.') && !/\.(md|txt)$/i.test(f) || /^OFL/.test(f)).forEach(f => copy(d + '/' + f)));
if (fs.existsSync(path.join(root, 'screenshots'))) fs.readdirSync(path.join(root, 'screenshots')).filter(f => /\.(png|jpg|webp)$/i.test(f)).forEach(f => copy('screenshots/' + f));   // install-dialog images named in the manifest
// guard: the shipped app must not name the textbook or its publishers (decision: refer to it as «كتاب الطالب المقرر»)
const banned = /High\s*Note|Pearson|York\s*Press/i, leaks = [];
(function scan(d) { fs.readdirSync(d).forEach(f => { const q = path.join(d, f); if (fs.statSync(q).isDirectory()) return scan(q); if (!/\.(js|html|css|webmanifest)$/i.test(f)) return; const m = banned.exec(fs.readFileSync(q, 'utf8')); if (m) leaks.push(path.relative(out, q) + ' → «' + m[0] + '»'); }); })(out);
if (leaks.length) { console.error('✗ third-party book/publisher names found in the release:\n  ' + leaks.join('\n  ')); process.exit(1); }
fs.writeFileSync(path.join(out, '.nojekyll'), '');
const ver = JSON.parse(JSON.stringify(require(path.join(root, 'package.json')))).version;
// README-ar.md and STORE-LISTING.md are documents for the owner (they travel in the source / store-assets zips), not part of the website
const zip = path.resolve(root, '..', 'tafawuq-release.zip');
try { fs.rmSync(zip, { force: true }); cp.execSync(`cd ${JSON.stringify(out)} && zip -qr ${JSON.stringify(zip)} . -x '.DS_Store'`); } catch (e) { console.log('zip failed:', e.message); }
// store screenshots (1920×1080) travel in their own zip: they are for Partner Center, not for the website
const assets = path.resolve(root, '..', 'tafawuq-store-assets'), assetsZip = path.resolve(root, '..', 'tafawuq-store-assets.zip');
if (fs.existsSync(assets)) { try { fs.rmSync(assetsZip, { force: true }); fs.copyFileSync(path.join(root, 'STORE-LISTING.md'), path.join(assets, 'STORE-LISTING.md')); cp.execSync(`cd ${JSON.stringify(assets)} && zip -qr ${JSON.stringify(assetsZip)} .`); console.log('store assets zip: ' + assetsZip); } catch (e) { console.log('store assets zip failed:', e.message); } }
// the maintenance project: everything needed to edit content, rebuild, test and repackage (no work-in-progress, no review copies)
const srcZip = path.resolve(root, '..', 'tafawuq-source.zip');
try { fs.rmSync(srcZip, { force: true }); cp.execSync(`cd ${JSON.stringify(root)} && zip -qr ${JSON.stringify(srcZip)} . -x '.DS_Store' 'node_modules/*' 'data/wip/*' 'data/units/*.review.js' 'data/units/*.wip.js'`); console.log('source zip: ' + srcZip); } catch (e) { console.log('source zip failed:', e.message); }
const files = []; (function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : files.push(p); }); })(out);
console.log(`release ${ver}: ${files.length} files, ${(files.reduce((a, f) => a + fs.statSync(f).size, 0) / 1024).toFixed(0)} KB → ${out}\nzip: ${zip}`);
