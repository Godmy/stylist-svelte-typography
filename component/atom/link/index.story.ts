import Link from '$stylist/typography/component/atom/link/index.svelte';
import type { RecipeLink } from '$stylist/typography/interface/recipe/link';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_FONT_SIZE } from '$stylist/design-token/const/object/font-size';

/** Typography link renderer. */
export default {
	component: Link,
	title: 'Link',
	description:
		'Typography link renderer with tone, font size, underline, target, and disabled states.',
	args: {
		href: 'https://example.com/design-system',
		tone: 'primary',
		fontSize: '4',
		disabled: false,
		underline: true,
		target: '_self',
		text: 'Open the design system reference'
	},
	controls: {
		href: { type: 'text', label: 'Href', description: 'Destination URL for the anchor.' },
		tone: {
			type: 'select',
			label: 'Tone',
			description: 'Typography tone token currently supported by the link.',
			options: TOKEN_COLOR_TONE
		},
		fontSize: {
			type: 'select',
			label: 'Font Size',
			description: 'Typography font-size token currently supported by the link.',
			options: Object.keys(TOKEN_FONT_SIZE)
		},
		disabled: {
			type: 'boolean',
			label: 'Disabled',
			description: 'Removes href interaction and mutes the anchor.'
		},
		underline: { type: 'boolean', label: 'Underline', description: 'Toggle underline rendering.' },
		target: {
			type: 'select',
			label: 'Target',
			description: 'Anchor browsing context.',
			options: ['_self', '_blank', '_parent', '_top']
		},
		text: { type: 'text', label: 'Link Text', description: 'Visible anchor label.' },
		'aria-current': {
			type: 'select',
			label: 'Aria current',
			description: 'Marks the link as the current item of a set.',
			options: ['page', 'step', 'location', 'date', 'time', 'true', 'false']
		}
	},
	presets: {
		Disabled: { disabled: true },
		'Plain secondary': { tone: 'secondary', underline: false },
		'Inherited size': { fontSize: undefined, text: 'Takes the size of the surrounding text' },
		Large: { fontSize: '8' },
		Danger: { tone: 'danger' },
		'Current page': { 'aria-current': 'page', underline: false },
		'New tab': { target: '_blank' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeLink>;
