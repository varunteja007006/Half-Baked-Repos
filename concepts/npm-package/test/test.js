import { iconNames, iconSrc, renderIcon } from '../dist/index.js';
import assert from 'node:assert/strict';

// basic shape checks
assert.deepStrictEqual(iconNames, ['1', '2', '5'], 'iconNames lists all icons');
assert.ok(iconSrc('1').startsWith('data:image/webp;base64,'), 'iconSrc returns base64 data URI');

const html = renderIcon('2', { size: 48, alt: 'two' });
assert.ok(html.startsWith('<img '), 'renderIcon returns an <img> tag');
assert.ok(html.includes('width:48px;height:48px'), 'size applied');
assert.ok(html.includes('alt="two"'), 'alt applied');

// error on unknown icon
let threw = false;
try {
  iconSrc('nope');
} catch {
  threw = true;
}
assert.ok(threw, 'unknown icon should throw');

const out = renderIcon('5', { className: 'bob' });
assert.ok(out.includes('class="bob"'), 'className applied');

console.log('All tests passed.');