<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import HtmlBlockquote from '$stylist/html/component/organism/blockquote/index.svelte';
	import HtmlFooter from '$stylist/html/component/organism/footer/index.svelte';
	import type { RecipeBlockquote } from '$stylist/typography/interface/recipe/blockquote';
	import createBlockquoteState from '$stylist/typography/component/atom/blockquote/state.svelte';

	let props: RecipeBlockquote & HTMLAttributes<HTMLQuoteElement> = $props();

	const state = createBlockquoteState(() => props);
	const children = $derived(props.children);
</script>

<HtmlBlockquote {...state.restProps} class={state.classes} cite={state.citeUrl}>
	{#if children}
		{@render children()}
	{/if}
	{#if state.sourceLabel}
		<HtmlFooter class={state.footerClasses}>
			{state.footerPrefix}{state.sourceLabel}
		</HtmlFooter>
	{/if}
</HtmlBlockquote>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			:where(.c-typography-blockquote) {
				margin: 0;
				padding-inline-start: 0;
				color: var(--color-text-secondary);
				font-style: italic;
			}
			:where(.c-typography-blockquote--bordered) {
				border-inline-start: var(--border-width-thick, 4px) solid var(--color-border-primary);
				padding-inline-start: calc(var(--space-4) * var(--density-scale, 1));
			}
			:where(.c-typography-blockquote--surface) {
				padding: calc(var(--space-4) * var(--density-scale, 1))
					calc(var(--space-5) * var(--density-scale, 1));
				border-radius: var(--radius-4);
				background: color-mix(
					in srgb,
					var(--color-background-secondary) 82%,
					var(--color-background-primary) 18%
				);
			}
			:where(.c-typography-blockquote__footer) {
				margin-top: calc(var(--space-3) * var(--density-scale, 1));
				font-size: 0.875em;
				font-style: normal;
				color: var(--color-text-tertiary, var(--color-text-secondary));
			}
		}
	}
</style>
