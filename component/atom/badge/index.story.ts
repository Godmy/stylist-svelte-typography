import Badge from '$stylist/typography/component/atom/badge/index.svelte';
import type { RecipeBadge } from '$stylist/typography/interface/recipe/badge';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Pill-shaped badge for quick status indicators. */
export default {
	component: Badge,
	title: 'Badge',
	description: 'Pill-shaped badge for quick status indicators.',
	args: { label: 'New', variant: 'default', size: 'md', disabled: false },
	controls: {
		label: { type: 'text', label: 'Label', description: 'Badge text when no children are passed.' },
		variant: {
			type: 'select',
			label: 'Variant',
			description: 'Colour tone of the badge.',
			options: TOKEN_COLOR_TONE
		},
		size: {
			type: 'select',
			label: 'Size',
			description: 'Font size step; the fraction sizes reuse the xs … 2xl steps.',
			options: TOKEN_SIZE
		},
		disabled: { type: 'boolean', label: 'Disabled', description: 'Dimmed, non-interactive badge.' }
	},
	presets: {
		...Object.fromEntries(
			TOKEN_COLOR_TONE.map(
				(variant) =>
					[`Tone ${variant}`, { variant, label: variant }] satisfies [string, Partial<RecipeBadge>]
			)
		),
		...Object.fromEntries(
			TOKEN_SIZE.slice(0, 6).map(
				(size) =>
					[`Size ${size}`, { size, label: `Size ${size}` }] satisfies [string, Partial<RecipeBadge>]
			)
		),
		Disabled: { label: 'Archived', variant: 'neutral', disabled: true }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeBadge>;
