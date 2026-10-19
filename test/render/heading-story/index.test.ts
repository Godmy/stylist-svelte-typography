import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import { createRawSnippet, tick } from 'svelte';
import story from '../../../component/atom/heading/index.story';
import Heading from '../../../component/atom/heading/index.svelte';
import type { RecipeHeading } from '../../../interface/recipe/heading';
import StoryCanvas from '$stylist/domain/component/molecule/story-canvas/index.svelte';
import StoryControls from '$stylist/domain/component/molecule/story-controls/index.svelte';
import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
import { resolvePreviewVariables } from '$stylist/domain/function/resolve/preview-variables';

afterEach(cleanup);

describe('Heading ContractStory pilot', () => {
	it('clones every preset and renders its real numeric heading and text', async () => {
		const view = render(StoryCanvas, { story });
		for (const preset of Object.values(story.presets)) {
			const args = structuredClone({ ...story.args, ...preset });
			expect(typeof args.level).toBe('number');
			await view.rerender({ story, args });
			const heading = view.container.querySelector('h1,h2,h3,h4,h5,h6')!;
			expect(heading.tagName).toBe(`H${args.level}`);
			expect(heading.textContent).toBe(args.text);
			expect(view.container.querySelectorAll('h1,h2,h3,h4,h5,h6')).toHaveLength(1);
		}
	});

	it('passes numeric select values through controls and a message clone after mount', async () => {
		const onChange = vi.fn();
		const panel = render(StoryControls, { story, onChange });
		const canvas = render(StoryCanvas, { story });
		const neighbour = render(StoryCanvas, { story });
		for (const level of story.controls.level.options) {
			await fireEvent.change(panel.getByLabelText('Level'), { target: { value: String(level) } });
			const [args] = onChange.mock.calls.at(-1)!;
			expect(args.level).toBe(level);
			const message = structuredClone({ type: 'stylist:story-args', args });
			await canvas.rerender({ story, args: message.args });
			expect(canvas.container.querySelector(`h${level}`)).toBeTruthy();
			expect(neighbour.container.querySelector('h2')?.textContent).toBe(story.args.text);
		}
		await fireEvent.input(panel.getByLabelText('Text'), {
			target: { value: 'Edited after mount' }
		});
		await canvas.rerender({ story, args: structuredClone(onChange.mock.calls.at(-1)![0]) });
		expect(canvas.container.textContent).toBe('Edited after mount');
		await fireEvent.click(panel.getByRole('button', { name: /^Long text$/ }));
		expect(onChange.mock.calls.at(-1)![0].text).toBe(story.presets['Long text'].text);
		await fireEvent.click(panel.getByRole('button', { name: 'Reset' }));
		expect(onChange.mock.calls.at(-1)![0]).toEqual(story.args);
	});

	it('keeps children priority, class/style and native attributes across tag changes', async () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Child wins</span>' }));
		const view = render(Heading, {
			text: 'Fallback',
			children,
			class: 'consumer',
			style: 'margin-top: 7px;',
			id: 'heading',
			ariaLabel: 'Label'
		});
		expect(view.container.querySelector('h2')?.textContent).toBe('Child wins');
		await view.rerender({ level: 6, children: undefined, text: 'Updated', fontSize: '8' });
		const heading = view.container.querySelector('h6')!;
		expect(heading.textContent).toBe('Updated');
		expect(heading.classList.contains('consumer')).toBe(true);
		expect(heading.style.marginTop).toBe('7px');
		expect(heading.style.getPropertyValue('--typography-font-size')).toBe('2rem');
		expect(heading.getAttribute('aria-label')).toBe('Label');
		expect(heading.id).toBe('heading');
	});

	it('scopes light/dark variables and keeps long text and clamp args', async () => {
		const light = render(StoryCanvas, { story, environment: { mode: 'light' } });
		const dark = render(StoryCanvas, {
			story,
			args: { ...story.args, ...story.presets['Clamped text'] },
			environment: { mode: 'dark' }
		});
		await tick();
		for (const [view, mode] of [
			[light, 'light'],
			[dark, 'dark']
		] as const) {
			const root = view.container.querySelector<HTMLElement>('.c-story-canvas')!;
			expect(root.style.getPropertyValue('--color-text-primary')).toBe(
				resolvePreviewVariables({ mode })['--color-text-primary']
			);
		}
		expect(dark.container.querySelector('h2')?.style.getPropertyValue('-webkit-line-clamp')).toBe(
			'2'
		);
		await dark.rerender({
			story,
			args: { ...story.args, ...story.presets['Long text'] },
			environment: { mode: 'light' }
		});
		expect(dark.container.querySelector('h2')?.textContent).toBe(story.presets['Long text'].text);
		expect(light.container.querySelector('h2')?.textContent).toBe(story.args.text);
	});

	it('shares h2 semantics with HtmlH2 while adding text and token style resolution', () => {
		const text = createRawSnippet(() => ({ render: () => '<span>Comparison</span>' }));
		const native = render(HtmlH2, { children: text });
		const typography = render(Heading, {
			level: 2,
			text: 'Comparison',
			fontSize: '8'
		} satisfies RecipeHeading);
		expect(native.container.firstElementChild?.tagName).toBe(
			typography.container.firstElementChild?.tagName
		);
		expect(native.container.firstElementChild?.textContent).toBe(
			typography.container.firstElementChild?.textContent
		);
		expect(
			typography.container.querySelector('h2')?.style.getPropertyValue('--typography-font-size')
		).toBe('2rem');
	});
});
