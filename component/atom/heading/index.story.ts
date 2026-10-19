import type { ContractStory } from '$stylist/html/interface/contract/story';
import type { RecipeHeading } from '$stylist/typography/interface/recipe/heading';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_FONT_SIZE } from '$stylist/design-token/const/object/font-size';
import { TOKEN_FONT_WEIGHT } from '$stylist/design-token/const/object/font-weight';
import { TOKEN_FONT_FAMILY } from '$stylist/design-token/const/object/font-family';
import { TOKEN_LINE_HEIGHT } from '$stylist/design-token/const/object/line-height';
import { TOKEN_LETTER_SPACING } from '$stylist/design-token/const/object/letter-spacing';
import Heading from './index.svelte';

export default {
	component: Heading,
	args: {
		text: 'Typography that reads like a system, not a collection of tags.',
		level: 2,
		tone: 'primary',
		fontSize: '6',
		fontWeight: 'bold',
		fontFamily: 'sans',
		lineHeight: 'tight',
		letterSpacing: 'normal',
		textTransform: 'none',
		textAlign: 'left',
		lineClamp: 0,
		disabled: false
	},
	controls: {
		text: { type: 'text', label: 'Text' },
		level: { type: 'select', label: 'Level', options: [1, 2, 3, 4, 5, 6] },
		tone: { type: 'select', label: 'Tone', options: TOKEN_COLOR_TONE },
		fontSize: { type: 'select', label: 'Font size', options: Object.keys(TOKEN_FONT_SIZE) },
		fontWeight: { type: 'select', label: 'Font weight', options: Object.keys(TOKEN_FONT_WEIGHT) },
		fontFamily: { type: 'select', label: 'Font family', options: Object.keys(TOKEN_FONT_FAMILY) },
		lineHeight: { type: 'select', label: 'Line height', options: Object.keys(TOKEN_LINE_HEIGHT) },
		letterSpacing: {
			type: 'select',
			label: 'Letter spacing',
			options: Object.keys(TOKEN_LETTER_SPACING)
		},
		textTransform: {
			type: 'select',
			label: 'Transform',
			options: ['none', 'uppercase', 'lowercase', 'capitalize']
		},
		textAlign: { type: 'select', label: 'Align', options: ['left', 'center', 'right', 'justify'] },
		lineClamp: { type: 'range', label: 'Line clamp (0 disables)', min: 0, max: 4, step: 1 },
		disabled: { type: 'boolean', label: 'Disabled' },
		ariaLabel: { type: 'text', label: 'Aria label' }
	},
	presets: {
		...Object.fromEntries(
			([1, 2, 3, 4, 5, 6] as const).map(
				(level) =>
					[
						`Level ${level}`,
						{
							level,
							text: `Heading level ${level}`,
							fontSize: level <= 2 ? '8' : level <= 4 ? '5' : '4'
						}
					] satisfies [string, Partial<RecipeHeading>]
			)
		),
		...Object.fromEntries(
			Object.keys(TOKEN_FONT_FAMILY).map(
				(fontFamily) =>
					[
						`Family ${fontFamily}`,
						{ level: 3, fontFamily, text: `${fontFamily} — Aa Bb Cc 0123` }
					] satisfies [string, Partial<RecipeHeading>]
			)
		),
		...Object.fromEntries(
			(Object.keys(TOKEN_FONT_SIZE) as (keyof typeof TOKEN_FONT_SIZE)[]).map(
				(fontSize) =>
					[`Size ${fontSize}`, { level: 3, fontSize, text: `Size ${fontSize}` }] satisfies [
						string,
						Partial<RecipeHeading>
					]
			)
		),
		...Object.fromEntries(
			(Object.keys(TOKEN_FONT_WEIGHT) as (keyof typeof TOKEN_FONT_WEIGHT)[]).map(
				(fontWeight) =>
					[`Weight ${fontWeight}`, { level: 3, fontWeight, text: fontWeight }] satisfies [
						string,
						Partial<RecipeHeading>
					]
			)
		),
		'Long text': {
			text: 'A long heading preserves the document hierarchy while its words wrap naturally across several lines in a narrow viewport. Typography should remain readable in both light and dark themes.',
			fontSize: '8',
			lineHeight: 'snug'
		},
		'Multiline text': { text: 'First line\nSecond line\nThird line' },
		'Clamped text': {
			text: 'A deliberately long heading demonstrates a two-line clamp when the preview becomes narrow, keeping the full text in the DOM for inspection and accessibility.',
			fontSize: '8',
			lineClamp: 2
		},
		'Centered serif': { fontFamily: 'serif', textAlign: 'center', letterSpacing: 'wide' },
		Disabled: { disabled: true, tone: 'danger' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeHeading>;
