import { describe, expect, it } from 'vitest';
import { HTML_LAYER_ORDER } from '$stylist/html/const/array/html-layer-order';

// Typography sits right above the html skin: the canonical layer order, zero-specificity
// selectors, and typography props applied only when set, so a component without props looks
// like the skin and consumer classes win.
const sources = import.meta.glob<string>('../../../component/*/*/index.svelte', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const entries = Object.entries(sources).map(([path, source]) => ({
	family: path.replace('../../../component/', '').replace('/index.svelte', ''),
	css: source.slice(source.indexOf('<style>'), source.indexOf('</style>'))
}));

/** Selector lines of the stylesheet: everything before `{` that is not an at-rule or keyframe. */
function selectors(css: string): string[] {
	return css
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.endsWith('{') && !line.startsWith('@') && line !== ':global {')
		.map((line) => line.slice(0, -1).trim())
		.filter((selector) => !/^(\d+%|from|to)(,|$)/.test(selector))
		.flatMap((selector) => selector.split(/,(?![^(]*\))/).map((part) => part.trim()))
		.filter(Boolean);
}

describe('typography style layer', () => {
	it('covers every typography component', () => {
		expect(entries.length).toBe(8);
	});

	it.each(entries)('$family orders the layers and keeps rules in @layer typography', ({ css }) => {
		expect(css).toContain(`@layer ${HTML_LAYER_ORDER.join(', ')};`);
		expect(css).toContain('@layer typography {');
	});

	it.each(entries)('$family uses zero-specificity selectors', ({ css }) => {
		for (const selector of selectors(css)) expect(selector).toMatch(/^:where\(/);
	});

	it.each(entries)(
		'$family takes the font family and body line height from props or the skin',
		({ css }) => {
			for (const [declaration] of css.matchAll(/font-family\s*:[^;]+;/g))
				expect(declaration).toBe('font-family: var(--typography-font-family);');
			expect(css).not.toMatch(/line-height:\s*var\(--line-height-(normal|relaxed)/);
		}
	);

	it.each(entries)('$family uses no pixel or rem literals outside var() fallbacks', ({ css }) => {
		const declarations = css
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.endsWith(';') && !line.startsWith('@'))
			.map((line) => line.replace(/var\([^()]*(\([^()]*\)[^()]*)*\)/g, 'var()'));
		for (const declaration of declarations) expect(declaration).not.toMatch(/\d(px|rem)\b/);
	});
});
