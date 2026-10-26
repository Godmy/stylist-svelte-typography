import Text from '$stylist/typography/component/atom/text/index.svelte';
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
		lineHeight: 'normal',
		letterSpacing: 'normal',
		textTransform: 'none',
		textAlign: 'left',
		lineClamp: 0,
		block: false,
		disabled: false
	},
	controls: {
		text: {
			type: 'text',
			label: 'Content',
			description: 'Displayed copy when no children are passed.'
		},
		tone: {
			type: 'select',
			label: 'Tone',
			description: 'Semantic text colour; unset inherits.',
			options: TOKEN_COLOR_TONE
		},
		fontSize: {
			type: 'select',
			label: 'Font Size',
			description: 'Font size token; unset follows the skin.',
			options: Object.keys(TOKEN_FONT_SIZE)
		},
		fontWeight: {
			type: 'select',
			label: 'Font Weight',
			description: 'Font weight token.',
			options: Object.keys(TOKEN_FONT_WEIGHT)
		},
		fontFamily: {
			type: 'select',
			label: 'Font Family',
			description: 'Font family token; unset follows the skin.',
			options: Object.keys(TOKEN_FONT_FAMILY)
		},
		lineHeight: {
			type: 'select',
			label: 'Line Height',
			description: 'Leading token for multi-line copy.',
			options: Object.keys(TOKEN_LINE_HEIGHT)
		},
		letterSpacing: {
			type: 'select',
			label: 'Letter Spacing',
			description: 'Tracking token.',
			options: Object.keys(TOKEN_LETTER_SPACING)
		},
		textTransform: {
			type: 'select',
			label: 'Transform',
			description: 'Case transformation.',
			options: ['none', 'uppercase', 'lowercase', 'capitalize']
		},
		textAlign: {
			type: 'select',
			label: 'Align',
			description: 'Horizontal alignment.',
			options: ['left', 'center', 'right', 'justify']
		},
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
		disabled: { type: 'boolean', label: 'Disabled', description: 'Muted text appearance.' },
		ariaLabel: { type: 'text', label: 'Aria Label', description: 'Optional accessibility label.' }
	},
	presets: {
		Secondary: { tone: 'secondary' },
		'Info emphasis': { tone: 'info', fontWeight: 'medium' },
		Mono: { fontFamily: 'mono', fontSize: '3', letterSpacing: 'wide' },
		Clamped: { lineClamp: 1 },
		...Object.fromEntries(
			Object.keys(TOKEN_FONT_FAMILY).map(
				(fontFamily) =>
					[`Family ${fontFamily}`, { fontFamily }] satisfies [string, Partial<RecipeText>]
			)
		),
		Uppercase: { textTransform: 'uppercase', letterSpacing: 'expanded', fontSize: '3' },
		Centered: { textAlign: 'center', block: true },
		Large: { fontSize: '6', lineHeight: 'snug' },
		Danger: { tone: 'danger', fontWeight: 'semibold' },
		Disabled: { disabled: true }
	}
} satisfies ContractStory<RecipeText>;
