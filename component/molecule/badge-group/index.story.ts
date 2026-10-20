import BadgeGroup from './index.svelte';
import type { RecipeBadgeGroup } from '$stylist/typography/interface/recipe/badge-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Group of badges with an overflow counter. */
export default {
	component: BadgeGroup,
	title: 'BadgeGroup',
	description: 'A component to display a group of badges.',
	args: {
		badges: [
			{ id: '1', label: 'Primary', variant: 'primary', size: 'md' },
			{ id: '2', label: 'Secondary', variant: 'secondary', size: 'md' },
			{ id: '3', label: 'Success', variant: 'success', size: 'md' },
			{ id: '4', label: 'Warning', variant: 'warning', size: 'md' },
			{ id: '5', label: 'Danger', variant: 'danger', size: 'md' },
			{ id: '6', label: 'Info', variant: 'info', size: 'md' }
		],
		maxVisible: 5,
		showOverflow: true
	},
	controls: {
		maxVisible: { type: 'number', min: 1, max: 10 },
		showOverflow: { type: 'boolean' }
	},
	presets: { 'Three visible': { maxVisible: 3 }, 'No overflow counter': { showOverflow: false } },
	layout: 'centered'
} satisfies ContractStory<RecipeBadgeGroup>;
