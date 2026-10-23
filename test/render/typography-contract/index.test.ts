import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import Text from '$stylist/typography/component/atom/text/index.svelte';
import Heading from '$stylist/typography/component/atom/heading/index.svelte';
import Paragraph from '$stylist/typography/component/molecule/paragraph/index.svelte';
import Blockquote from '$stylist/typography/component/atom/blockquote/index.svelte';
import Link from '$stylist/typography/component/atom/link/index.svelte';
import Badge from '$stylist/typography/component/atom/badge/index.svelte';
import BadgeGroup from '$stylist/typography/component/molecule/badge-group/index.svelte';
import RichText from '$stylist/typography/component/molecule/rich-text/index.svelte';
import HtmlAbbr from '$stylist/html/component/atom/abbr/index.svelte';
import HtmlCode from '$stylist/html/component/atom/code/index.svelte';
import HtmlKbd from '$stylist/html/component/atom/kbd/index.svelte';

afterEach(cleanup);

describe('typography contracts after HTML consolidation', () => {
	it.each([Text, Paragraph, Heading])(
		'keeps text, children, accessible label and native events',
		async (component) => {
			const onclick = vi.fn();
			const children = createRawSnippet(() => ({ render: () => '<em>Child wins</em>' }));
			const view = render(component, {
				text: 'Fallback',
				children,
				ariaLabel: 'Readable name',
				onclick,
				id: 'copy',
				fontSize: '8'
			});
			const node = view.container.firstElementChild!;
			expect(node.textContent).toBe('Child wins');
			expect(node.getAttribute('aria-label')).toBe('Readable name');
			expect(node.hasAttribute('arialabel')).toBe(false);
			expect(node.hasAttribute('fontsize')).toBe(false);
			await fireEvent.click(node);
			expect(onclick).toHaveBeenCalledOnce();
			await view.rerender({ children: undefined, text: 'Updated', ariaLabel: 'Updated label' });
			expect(view.container.firstElementChild?.textContent).toBe('Updated');
			expect(view.container.firstElementChild?.getAttribute('aria-label')).toBe('Updated label');
		}
	);

	it('keeps quote attribution separate from native attributes', async () => {
		const view = render(Blockquote, {
			cite: 'Author',
			citeUrl: 'https://example.com/source',
			sourceLabel: 'Attribution',
			withBorder: false,
			withBackground: true,
			footerPrefix: '— ',
			id: 'quote'
		});
		const quote = view.container.querySelector('blockquote')!;
		expect(quote.getAttribute('cite')).toBe('https://example.com/source');
		expect(quote.querySelector('footer')?.textContent).toContain('— Attribution');
		for (const attr of ['citeurl', 'sourcelabel', 'withborder', 'withbackground', 'footerprefix'])
			expect(quote.hasAttribute(attr)).toBe(false);
		await view.rerender({ citeUrl: 'https://example.com/updated', withBackground: false });
		expect(quote.getAttribute('cite')).toBe('https://example.com/updated');
		expect(quote.className).not.toContain('--surface');
	});

	it('blocks disabled link activation and restores the consumer handler after update', async () => {
		const onclick = vi.fn();
		const view = render(Link, {
			text: 'Destination',
			href: '#destination',
			disabled: true,
			tabindex: 0,
			onclick
		});
		const anchor = view.container.querySelector('a')!;
		expect(anchor.hasAttribute('href')).toBe(false);
		expect(anchor.tabIndex).toBe(-1);
		expect(await fireEvent.click(anchor)).toBe(false);
		expect(onclick).not.toHaveBeenCalled();
		await view.rerender({ disabled: false });
		expect(anchor.getAttribute('href')).toBe('#destination');
		expect(anchor.tabIndex).toBe(0);
		await fireEvent.click(anchor);
		expect(onclick).toHaveBeenCalledOnce();
		expect(onclick.mock.contexts[0]).toBe(anchor);
	});

	it('preserves badge labels and children without changing their passive semantics', () => {
		const children = createRawSnippet(() => ({ render: () => '<b>Child badge</b>' }));
		const view = render(Badge, { label: 'Fallback', children, disabled: true, variant: 'success' });
		expect(view.container.querySelector('span')?.textContent).toBe('Child badge');
		expect(view.container.firstElementChild?.getAttribute('aria-disabled')).toBe('true');
		expect(view.container.querySelector('[role="button"]')).toBeNull();
	});

	it('uses native buttons only for actionable badges and respects disabled items', async () => {
		const active = vi.fn();
		const disabled = vi.fn();
		const view = render(BadgeGroup, {
			badges: [
				{ id: 'plain', label: 'Passive' },
				{ id: 'active', label: 'Active', onClick: active },
				{ id: 'disabled', label: 'Disabled', disabled: true, onClick: disabled },
				{ id: 'hidden', label: 'Hidden' }
			],
			maxVisible: 3
		});
		expect(view.getByText('Passive').closest('[role="button"],button')).toBeNull();
		const button = view.getByRole('button', { name: 'Active' });
		expect(button.tagName).toBe('BUTTON');
		expect(button.getAttribute('type')).toBe('button');
		await fireEvent.click(button);
		expect(active).toHaveBeenCalledOnce();
		expect(view.getByRole('button', { name: 'Disabled' }).hasAttribute('disabled')).toBe(true);
		expect(disabled).not.toHaveBeenCalled();
		expect(view.getByText('+1')).toBeTruthy();
		await view.rerender({ maxVisible: 4 });
		expect(view.queryByText('+1')).toBeNull();
	});

	it('renders explicit segments and accessible names, with text marks as the fallback', async () => {
		const view = render(RichText, {
			text: 'Fallback',
			ariaLabel: 'Rich label',
			segments: [
				{
					key: 's',
					text: 'Explicit code',
					tag: 'code',
					bold: false,
					italic: false,
					underline: false,
					strikeThrough: false,
					highlight: false
				}
			]
		});
		expect(view.container.querySelector('code')?.textContent).toBe('Explicit code');
		expect(view.container.firstElementChild?.getAttribute('aria-label')).toBe('Rich label');
		expect(view.container.firstElementChild?.hasAttribute('segments')).toBe(false);
		await view.rerender({
			segments: undefined,
			text: 'Marked',
			marks: [{ start: 0, end: 6, code: true }]
		});
		expect(view.container.querySelector('code')?.textContent).toBe('Marked');
	});

	it('keeps HTML content in a valid block container even with block=false', () => {
		const view = render(RichText, { html: '<p>HTML content</p>', block: false });
		expect(view.container.firstElementChild?.tagName).toBe('DIV');
		expect(view.container.querySelector('span > div')).toBeNull();
		expect(view.container.querySelector('p')?.textContent).toBe('HTML content');
	});

	it.each([
		[HtmlAbbr, 'ABBR'],
		[HtmlCode, 'CODE'],
		[HtmlKbd, 'KBD']
	] as const)(
		'replaces style-only wrappers with the existing native component',
		async (component, tag) => {
			const children = createRawSnippet(() => ({ render: () => '<span>Native content</span>' }));
			const onclick = vi.fn();
			const view = render(component, { children, title: 'Expansion', class: 'consumer', onclick });
			const node = view.container.firstElementChild!;
			expect(node.tagName).toBe(tag);
			expect(node.className).toBe('consumer');
			expect(node.getAttribute('title')).toBe('Expansion');
			expect(node.textContent).toBe('Native content');
			await fireEvent.click(node);
			expect(onclick).toHaveBeenCalledOnce();
		}
	);
});
