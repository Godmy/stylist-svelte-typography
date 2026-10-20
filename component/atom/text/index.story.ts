import Text from './index.svelte';
import type { RecipeText } from '$stylist/typography/interface/recipe/text';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_FONT_SIZE } from '$stylist/design-token/const/object/font-size';
import { TOKEN_FONT_WEIGHT } from '$stylist/design-token/const/object/font-weight';
import { TOKEN_FONT_FAMILY } from '$stylist/design-token/const/object/font-family';
import { TOKEN_LINE_HEIGHT } from '$stylist/design-token/const/object/line-height';
import { TOKEN_LETTER_SPACING } from '$stylist/design-token/const/object/letter-spacing';

/** The base inline typography primitive. Use it for semantic copy, labels, and token-driven text surfaces. */
export default {
	component: Text,
	title: 'Text',
	description:
		'The base inline typography primitive. Use it for semantic copy, labels, and token-driven text surfaces.',
	args: {
		text: 'Design clarity grows when tokens, spacing, and emphasis all follow the same visual rhythm.',
		tone: 'primary',
		fontSize: '4',
		fontWeight: 'normal',
		fontFamily: 'sans',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		textTransform: 'none',
		textAlign: 'left',
		lineClamp: 0,
		block: false,
		disabled: false
	},
	controls: {
		text: { type: 'text', label: 'Content' },
		tone: { type: 'select', label: 'Tone', options: TOKEN_COLOR_TONE },
		fontSize: { type: 'select', label: 'Font Size', options: Object.keys(TOKEN_FONT_SIZE) },
		fontWeight: { type: 'select', label: 'Font Weight', options: Object.keys(TOKEN_FONT_WEIGHT) },
		fontFamily: { type: 'select', label: 'Font Family', options: Object.keys(TOKEN_FONT_FAMILY) },
		lineHeight: { type: 'select', label: 'Line Height', options: Object.keys(TOKEN_LINE_HEIGHT) },
		letterSpacing: {
			type: 'select',
			label: 'Letter Spacing',
			options: Object.keys(TOKEN_LETTER_SPACING)
		},
		textTransform: {
			type: 'select',
			label: 'Transform',
			options: ['none', 'uppercase', 'lowercase', 'capitalize']
		},
		textAlign: { type: 'select', label: 'Align', options: ['left', 'center', 'right', 'justify'] },
		lineClamp: {
			type: 'range',
			label: 'Line Clamp',
			description: '`0` keeps the full text.',
			min: 0,
			max: 4,
			step: 1
		},
		block: {
			type: 'boolean',
			label: 'Block Mode',
			description: 'Switch from inline span behavior to block rendering.'
		},
		disabled: { type: 'boolean', label: 'Disabled' },
		ariaLabel: { type: 'text', label: 'Aria Label', description: 'Optional accessibility label.' }
	},
	presets: {
		Secondary: { tone: 'secondary' },
		'Info emphasis': { tone: 'info', fontWeight: 'medium' },
		Mono: { fontFamily: 'mono', fontSize: '3', letterSpacing: 'wide' },
		Clamped: { lineClamp: 1 }
	}
} satisfies ContractStory<RecipeText>;
