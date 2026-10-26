<script lang="ts">
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import type { RecipeText } from '$stylist/typography/interface/recipe/text';
	import createTextState from '$stylist/typography/component/atom/text/state.svelte';

	let props: RecipeText = $props();
	const state = createTextState(() => props);
</script>

<HtmlSpan {...state.restProps} {...state.attrs} class={state.classes} style={state.style}>
	{#if state.children}
		{@render state.children()}
	{:else if state.text}
		{state.text}
	{/if}
</HtmlSpan>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			:where(.c-typography-text--block) {
				display: block;
			}
			/* Undefined variables leave each property inherited; props and consumer classes set them. */
			:where(.c-typography-text) {
				font-size: var(--typography-font-size);
				font-weight: var(--typography-font-weight);
				font-family: var(--typography-font-family);
				line-height: var(--typography-line-height);
				letter-spacing: var(--typography-letter-spacing);
				text-transform: var(--typography-text-transform);
				text-align: var(--typography-text-align);
				color: var(--typography-color);
			}
			/* The clamp needs a box display, so it switches on only with the lineClamp prop. */
			:where(.c-typography-text[style*='--typography-line-clamp']) {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: var(--typography-line-clamp);
				overflow: hidden;
			}
			:where(.c-typography-text--disabled) {
				color: var(--color-text-tertiary);
			}
		}
	}
</style>
