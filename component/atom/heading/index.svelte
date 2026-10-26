<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import HtmlH1 from '$stylist/html/component/atom/h1/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlH3 from '$stylist/html/component/atom/h3/index.svelte';
	import HtmlH4 from '$stylist/html/component/atom/h4/index.svelte';
	import HtmlH5 from '$stylist/html/component/atom/h5/index.svelte';
	import HtmlH6 from '$stylist/html/component/atom/h6/index.svelte';
	import type { RecipeHeading } from '$stylist/typography/interface/recipe/heading';
	import createHeadingState from '$stylist/typography/component/atom/heading/state.svelte';

	let props: RecipeHeading & HTMLAttributes<HTMLHeadingElement> = $props();
	const state = createHeadingState(() => props);

	const HEADINGS = { h1: HtmlH1, h2: HtmlH2, h3: HtmlH3, h4: HtmlH4, h5: HtmlH5, h6: HtmlH6 };
	const Tag = $derived(HEADINGS[state.tag]);
</script>

<Tag {...state.restProps} class={state.classes} style={state.style} {...state.attrs}>
	{#if state.children}
		{@render state.children()}
	{:else if state.text}
		{state.text}
	{/if}
</Tag>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			/* Fallbacks mirror the html skin (TYPOGRAPHY_PRESET.heading, h1–h6 sizes of HTML_STYLE), so a
			   heading without props matches the skin; props and consumer classes set the variables. */
			:where(.c-typography-heading) {
				margin: 0;
				font-size: var(--typography-font-size, var(--typography-heading-size));
				font-weight: var(--typography-font-weight, var(--font-weight-semibold, 600));
				font-family: var(--typography-font-family);
				line-height: var(--typography-line-height, var(--line-height-tight, 1.25));
				letter-spacing: var(--typography-letter-spacing, var(--letter-spacing-narrow, -0.01em));
				text-transform: var(--typography-text-transform, none);
				text-align: var(--typography-text-align);
				color: var(--typography-color);
			}
			:where(h1.c-typography-heading) {
				--typography-heading-size: var(--font-size-10, 2.5rem);
			}
			:where(h2.c-typography-heading) {
				--typography-heading-size: var(--font-size-8, 2rem);
			}
			:where(h3.c-typography-heading) {
				--typography-heading-size: var(--font-size-6, 1.5rem);
			}
			:where(h4.c-typography-heading) {
				--typography-heading-size: var(--font-size-5, 1.25rem);
			}
			:where(h5.c-typography-heading) {
				--typography-heading-size: var(--font-size-4, 1rem);
			}
			:where(h6.c-typography-heading) {
				--typography-heading-size: var(--font-size-3, 0.75rem);
				text-transform: var(--typography-text-transform, uppercase);
				letter-spacing: var(--typography-letter-spacing, var(--letter-spacing-wide, 0.04em));
			}
			/* The clamp needs a box display, so it switches on only with the lineClamp prop. */
			:where(.c-typography-heading[style*='--typography-line-clamp']) {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: var(--typography-line-clamp);
				overflow: hidden;
			}
			:where(.c-typography-heading--disabled) {
				color: var(--color-text-tertiary);
			}
		}
	}
</style>
