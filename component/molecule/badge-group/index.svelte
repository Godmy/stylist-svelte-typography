<script lang="ts">
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

<div class={state.containerClasses} {...restProps}>
	{#each state.visibleBadges as badge (badge.id)}
		{#if badge.onClick}
			<button
				type="button"
				class="badge-group__action"
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
			</button>
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
		<span class={state.overflowClasses}>
			+{state.overflowCount}
		</span>
	{/if}
</div>

<style>
	.badge-group__action {
		appearance: none;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
	}
	.badge-group__action:focus-visible {
		outline: var(--focus-width, 2px) solid var(--color-primary-500, Highlight);
		outline-offset: var(--focus-offset, 2px);
	}
	.badge-group__action:disabled {
		cursor: not-allowed;
	}
	.badge-group {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.badge-group__overflow {
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		background-color: var(--color-neutral-100, var(--color-background-secondary));
		color: var(--color-neutral-800, var(--color-text-primary));
		padding: 0.125rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
	}
</style>
