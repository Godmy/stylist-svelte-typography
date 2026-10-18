import Link from './index.svelte';
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
		text: { type: 'text', label: 'Link Text', description: 'Visible anchor label.' }
	},
	presets: {
		Disabled: { disabled: true },
		'Plain secondary': { tone: 'secondary', underline: false }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeLink>;
