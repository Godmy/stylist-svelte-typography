<script lang="ts">
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import createBadgeState from '$stylist/typography/component/atom/badge/state.svelte';
	import type { RecipeBadge } from '$stylist/typography/interface/recipe/badge';

	let props: RecipeBadge = $props();

	const state = createBadgeState(() => props);
	const children = $derived(props.children);
	const label = $derived(props.label);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				children: _children,
				disabled: _disabled,
				label: _label,
				size: _size,
				variant: _variant,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<HtmlSpan class={state.classes} aria-disabled={props.disabled || undefined} {...restProps}>
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
</HtmlSpan>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			/* Paddings follow the size step in em; the colours follow the variant tone. */
			:where(.c-typography-badge) {
				display: inline-flex;
				align-items: center;
				gap: 0.375em;
				width: fit-content;
				max-width: 100%;
				padding: 0.2em 0.7em;
				border: var(--border-width-thin, 1px) solid transparent;
				border-radius: var(--radius-full);
				font-weight: var(--font-weight-semibold);
				line-height: var(--line-height-tight);
				white-space: nowrap;
				vertical-align: middle;
				background: var(--color-background-secondary);
				color: var(--color-text-primary);
			}
			:where(.c-typography-badge--neutral) {
				background: var(--color-neutral-100);
				color: var(--color-neutral-800);
			}
			:where(.c-typography-badge--primary),
			:where(.c-typography-badge--info) {
				background: var(--color-primary-100);
				color: var(--color-primary-800);
			}
			:where(.c-typography-badge--secondary) {
				background: var(--color-secondary-100);
				color: var(--color-secondary-800);
			}
			:where(.c-typography-badge--tertiary) {
				border-color: var(--color-border-primary);
				background: transparent;
				color: var(--color-text-secondary);
			}
			:where(.c-typography-badge--success) {
				background: var(--color-success-100);
				color: var(--color-success-800);
			}
			:where(.c-typography-badge--warning) {
				background: var(--color-warning-100);
				color: var(--color-warning-800);
			}
			:where(.c-typography-badge--danger),
			:where(.c-typography-badge--error) {
				background: var(--color-danger-100);
				color: var(--color-danger-800);
			}
			:where(.c-typography-badge--size-xs),
			:where(.c-typography-badge--size-1-4) {
				font-size: var(--font-size-2-5);
			}
			:where(.c-typography-badge--size-sm),
			:where(.c-typography-badge--size-1-3),
			:where(.c-typography-badge--size-2-5) {
				font-size: var(--font-size-3);
			}
			:where(.c-typography-badge--size-md),
			:where(.c-typography-badge--size-1-2),
			:where(.c-typography-badge--size-3-5) {
				font-size: var(--font-size-3-5);
			}
			:where(.c-typography-badge--size-lg),
			:where(.c-typography-badge--size-2-3) {
				font-size: var(--font-size-4);
			}
			:where(.c-typography-badge--size-xl),
			:where(.c-typography-badge--size-3-4) {
				font-size: var(--font-size-4-5);
			}
			:where(.c-typography-badge--size-2xl),
			:where(.c-typography-badge--size-full) {
				font-size: var(--font-size-5);
			}
			:where(.c-typography-badge--disabled) {
				opacity: var(--opacity-50, 0.5);
				pointer-events: none;
			}
		}
	}
</style>
