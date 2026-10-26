<script lang="ts">
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import createBadgeGroupState from '$stylist/typography/component/molecule/badge-group/state.svelte';
	import type { RecipeBadgeGroup } from '$stylist/typography/interface/recipe/badge-group';
	import Badge from '$stylist/typography/component/atom/badge/index.svelte';

	let props: RecipeBadgeGroup = $props();

	const state = createBadgeGroupState(() => props);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				badges: _badges,
				maxVisible: _maxVisible,
				showOverflow: _showOverflow,
				badgeClass: _badgeClass,
				overflowClass: _overflowClass,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<HtmlDiv class={state.containerClasses} {...restProps}>
	{#each state.visibleBadges as badge (badge.id)}
		{#if badge.onClick}
			<HtmlButton
				type="button"
				class="c-typography-badge-group__action"
				disabled={badge.disabled}
				onclick={badge.onClick}
			>
				<Badge
					variant={badge.variant}
					size={badge.size}
					disabled={badge.disabled}
					class={state.badgeClass}
					label={badge.label}
				/>
			</HtmlButton>
		{:else}
			<Badge
				variant={badge.variant}
				size={badge.size}
				disabled={badge.disabled}
				class={state.badgeClass}
				label={badge.label}
			/>
		{/if}
	{/each}

	{#if state.showOverflow && state.overflowCount > 0}
		<HtmlSpan class={state.overflowClasses}>
			+{state.overflowCount}
		</HtmlSpan>
	{/if}
</HtmlDiv>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			:where(.c-typography-badge-group) {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: calc(var(--space-2) * var(--density-scale, 1));
			}
			/* A bare button around the badge: the skin's focus ring stays, its button chrome goes. */
			:where(.c-typography-badge-group__action) {
				appearance: none;
				padding: 0;
				border: 0;
				border-radius: var(--radius-full);
				background: transparent;
				color: inherit;
				font: inherit;
				cursor: pointer;
			}
			:where(.c-typography-badge-group__action:disabled) {
				cursor: not-allowed;
			}
			:where(.c-typography-badge-group__overflow) {
				display: inline-flex;
				align-items: center;
				padding: 0.2em 0.7em;
				border-radius: var(--radius-full);
				background-color: var(--color-neutral-100, var(--color-background-secondary));
				color: var(--color-neutral-800, var(--color-text-primary));
				font-size: var(--font-size-3);
				font-weight: var(--font-weight-medium);
			}
		}
	}
</style>
