import BadgeGroup from '$stylist/typography/component/molecule/badge-group/index.svelte';
import type { RecipeBadgeGroup } from '$stylist/typography/interface/recipe/badge-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const badges: NonNullable<RecipeBadgeGroup['badges']> = [
	{ id: '1', label: 'Primary', variant: 'primary', size: 'md' },
	{ id: '2', label: 'Secondary', variant: 'secondary', size: 'md' },
	{ id: '3', label: 'Success', variant: 'success', size: 'md' },
	{ id: '4', label: 'Warning', variant: 'warning', size: 'md' },
	{ id: '5', label: 'Danger', variant: 'danger', size: 'md' },
	{ id: '6', label: 'Info', variant: 'info', size: 'md' }
];

/** Group of badges with an overflow counter. */
export default {
	component: BadgeGroup,
	title: 'BadgeGroup',
	description: 'A wrapping row of badges that collapses the rest into a +N counter.',
	args: { badges, maxVisible: 5, showOverflow: true, badgeClass: '', overflowClass: '' },
	controls: {
		badges: {
			type: 'json',
			label: 'Badges',
			description: 'Items with id, label, variant, size and disabled.',
			example: badges
		},
		maxVisible: {
			type: 'range',
			label: 'Max visible',
			description: 'Badges shown before the overflow counter.',
			min: 1,
			max: 10,
			step: 1
		},
		showOverflow: {
			type: 'boolean',
			label: 'Overflow counter',
			description: 'Show +N for the hidden badges.'
		},
		badgeClass: {
			type: 'text',
			label: 'Badge class',
			description: 'Extra class on every badge.'
		},
		overflowClass: {
			type: 'text',
			label: 'Overflow class',
			description: 'Extra class on the +N counter.'
		}
	},
	presets: {
		'Three visible': { maxVisible: 3 },
		'No overflow counter': { showOverflow: false },
		'All visible': { maxVisible: 10 },
		'Mixed sizes': {
			badges: [
				{ id: 'xs', label: 'xs', variant: 'neutral', size: 'xs' },
				{ id: 'sm', label: 'sm', variant: 'primary', size: 'sm' },
				{ id: 'md', label: 'md', variant: 'success', size: 'md' },
				{ id: 'lg', label: 'lg', variant: 'warning', size: 'lg' },
				{ id: 'off', label: 'disabled', variant: 'danger', size: 'md', disabled: true }
			]
		}
	},
	layout: 'centered'
} satisfies ContractStory<RecipeBadgeGroup>;
