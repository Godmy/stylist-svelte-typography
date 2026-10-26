<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import HtmlA from '$stylist/html/component/atom/a/index.svelte';
	import type { RecipeLink } from '$stylist/typography/interface/recipe/link';
	import createLinkState from '$stylist/typography/component/atom/link/state.svelte';

	let props: RecipeLink & HTMLAttributes<HTMLAnchorElement> = $props();

	const state = createLinkState(() => props);
	const children = $derived(props.children);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				style: _style,
				children: _children,
				tone: _tone,
				fontSize: _fontSize,
				disabled: _disabled,
				underline: _underline,
				href: _href,
				target: _target,
				text: _text,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<HtmlA
	{...restProps}
	href={state.href}
	class={state.classes}
	style={state.style}
	target={state.target}
	data-tone={state.tone}
	data-font-size={state.fontSize}
	data-underline={state.underline ? 'true' : 'false'}
	data-disabled={state.disabled ? 'true' : 'false'}
	aria-disabled={state.disabled ? 'true' : undefined}
	tabindex={state.disabled ? -1 : props.tabindex}
	onclick={(event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) => {
		if (state.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		props.onclick?.call(event.currentTarget, event);
	}}
>
	{#if children}
		{@render children()}
	{:else if state.text}
		{state.text}
	{/if}
</HtmlA>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			:where(.c-typography-link) {
				display: inline-flex;
				align-items: center;
				gap: 0.25em;
				color: var(--typography-link-color, var(--color-primary-600));
				font-weight: var(--font-weight-medium);
				text-decoration: none;
				text-underline-offset: 0.12em;
				transition-property: color, opacity, background-color, box-shadow;
				transition-duration: var(--duration-140, 140ms);
				transition-timing-function: var(--easing-ease, ease);
			}
			:where(.c-typography-link[data-underline='true']) {
				text-decoration: underline;
			}
			/* Undefined, the variable leaves the size inherited from the surrounding text. */
			:where(.c-typography-link) {
				font-size: var(--typography-font-size);
			}
			:where(.c-typography-link[data-tone='primary']),
			:where(.c-typography-link[data-tone='default']) {
				--typography-link-color: var(--color-primary-600);
				--typography-link-hover-color: var(--color-primary-700);
			}
			:where(.c-typography-link[data-tone='secondary']) {
				--typography-link-color: var(--color-secondary-600);
				--typography-link-hover-color: var(--color-secondary-700);
			}
			:where(.c-typography-link[data-tone='neutral']),
			:where(.c-typography-link[data-tone='tertiary']) {
				--typography-link-color: var(--color-text-tertiary);
				--typography-link-hover-color: var(--color-text-primary);
			}
			:where(.c-typography-link[data-tone='info']) {
				--typography-link-color: var(--color-info-600, var(--color-primary-600));
				--typography-link-hover-color: var(--color-info-700, var(--color-primary-700));
			}
			:where(.c-typography-link[data-tone='success']) {
				--typography-link-color: var(--color-success-600);
				--typography-link-hover-color: var(--color-success-700);
			}
			:where(.c-typography-link[data-tone='warning']) {
				--typography-link-color: var(--color-warning-700);
				--typography-link-hover-color: var(--color-warning-800, var(--color-warning-700));
			}
			:where(.c-typography-link[data-tone='danger']),
			:where(.c-typography-link[data-tone='error']) {
				--typography-link-color: var(--color-danger-600);
				--typography-link-hover-color: var(--color-danger-700);
			}
			:where(.c-typography-link:hover) {
				color: var(
					--typography-link-hover-color,
					var(--typography-link-color, var(--color-primary-600))
				);
			}
			:where(.c-typography-link:focus-visible) {
				outline: var(--focus-width, 2px) solid var(--color-primary-500, Highlight);
				outline-offset: var(--focus-offset, 2px);
			}
			:where(.c-typography-link[data-disabled='true']) {
				opacity: var(--opacity-50, 0.5);
				pointer-events: none;
				cursor: not-allowed;
			}
		}
	}
</style>
