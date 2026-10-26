<script lang="ts">
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import type { RecipeText } from '$stylist/typography/interface/recipe/text';
	import createParagraphState from '$stylist/typography/component/molecule/paragraph/state.svelte';

	let props: RecipeText = $props();
	const state = createParagraphState(() => props);
</script>

<HtmlP {...state.restProps} {...state.attrs} class={state.classes} style={state.style}>
	{#if state.children}
		{@render state.children()}
	{:else if state.text}
		{state.text}
	{/if}
</HtmlP>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			/* Body text of the skin; spacing between blocks belongs to the layout around it. */
			:where(.c-typography-paragraph) {
				margin: 0;
			}
			/* Undefined variables leave each property inherited; props and consumer classes set them. */
			:where(.c-typography-paragraph) {
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
			:where(.c-typography-paragraph[style*='--typography-line-clamp']) {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: var(--typography-line-clamp);
				overflow: hidden;
			}
			:where(.c-typography-paragraph--disabled) {
				color: var(--color-text-tertiary);
			}
		}
	}
</style>
