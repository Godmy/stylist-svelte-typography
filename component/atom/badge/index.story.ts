import Badge from './index.svelte';
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
		label: { type: 'text' },
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		// xs … 2xl: the fraction sizes reuse the same paddings.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		disabled: { type: 'boolean' }
	},
	presets: {
		Ready: { label: 'Ready', variant: 'success' },
		Review: { label: 'Review', variant: 'warning' },
		Blocked: { label: 'Blocked', variant: 'danger' },
		Info: { label: 'Info', variant: 'info' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeBadge>;
