import RichText from './index.svelte';
import type { RecipeRichText } from '$stylist/typography/interface/recipe/rich-text';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_FONT_SIZE } from '$stylist/design-token/const/object/font-size';
import { TOKEN_FONT_WEIGHT } from '$stylist/design-token/const/object/font-weight';
import { TOKEN_LINE_HEIGHT } from '$stylist/design-token/const/object/line-height';
import { TOKEN_LETTER_SPACING } from '$stylist/design-token/const/object/letter-spacing';

/** Display-only rich text renderer with overlapping range modifiers. */
export default {
	component: RichText,
	title: 'RichText',
	description:
		'Display-only rich text renderer with overlapping range modifiers and token-driven wrapper styling.',
	args: {
		text: 'RichText can combine semantic ranges, highlights, links, and code inside a single display-only renderer.',
		marks: [
			{ start: 0, end: 8, bold: true },
			{
				start: 17,
				end: 25,
				color: '#2563eb',
				underline: true,
				href: 'https://example.com',
				target: '_blank'
			},
			{ start: 27, end: 36, highlight: true, backgroundColor: '#fde68a' },
			{ start: 49, end: 53, code: true },
			{ start: 65, end: 77, italic: true, color: '#0f766e' }
		],
		tone: 'primary',
		fontSize: '4',
		fontWeight: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		disabled: false,
		block: true
	},
	controls: {
		text: { type: 'text', label: 'Text', description: 'Plain text the marks apply to.' },
		tone: {
			type: 'select',
			label: 'Tone',
			description: 'Base wrapper tone token.',
			options: TOKEN_COLOR_TONE
		},
		fontSize: {
			type: 'select',
			label: 'Font Size',
			description: 'Wrapper font size token.',
			options: Object.keys(TOKEN_FONT_SIZE)
		},
		fontWeight: {
			type: 'select',
			label: 'Font Weight',
			description: 'Base weight for unmarked text.',
			options: Object.keys(TOKEN_FONT_WEIGHT)
		},
		lineHeight: {
			type: 'select',
			label: 'Line Height',
			description: 'Useful for multi-line rich blocks.',
			options: Object.keys(TOKEN_LINE_HEIGHT)
		},
		letterSpacing: {
			type: 'select',
			label: 'Letter Spacing',
			description: 'Tracking for the wrapper.',
			options: Object.keys(TOKEN_LETTER_SPACING)
		},
		disabled: {
			type: 'boolean',
			label: 'Disabled',
			description: 'Preview the disabled wrapper behavior.'
		},
		block: {
			type: 'boolean',
			label: 'Block Mode',
			description: 'Switch wrapper element between inline and block.'
		}
	},
	presets: {
		Numeric: {
			text: '0123456789',
			tone: 'info',
			marks: [
				{ start: 0, end: 5, color: '#dc2626' },
				{ start: 2, end: 3, bold: true },
				{ start: 4, end: 5, underline: true },
				{ start: 5, end: 6, superscript: true },
				{ start: 6, end: 7, subscript: true }
			]
		},
		Workflow: {
			text: 'Review the brief, approve the content, publish the update, and monitor feedback across channels.',
			marks: [
				{ start: 0, end: 6, bold: true },
				{ start: 18, end: 25, color: '#2563eb' },
				{ start: 27, end: 34, highlight: true, backgroundColor: '#fde68a' },
				{
					start: 36,
					end: 43,
					underline: true,
					href: 'https://example.com/publish',
					target: '_blank'
				},
				{ start: 49, end: 56, strikeThrough: true },
				{ start: 61, end: 69, italic: true }
			]
		},
		'Editor HTML': {
			text: '',
			marks: [],
			html: '<h1>Quarterly content plan</h1><p><font face="Georgia" size="4">This paragraph keeps editor formatting with <b>bold</b>, <i>italic</i>, <u>underline</u>, <font color="#2563eb">color</font>, and <span style="background-color: #fef3c7;">highlight</span>.</font></p><h2>Publishing checklist</h2><ul><li>Draft the announcement</li><li>Review brand language</li><li>Attach supporting images</li></ul><ol><li>Approve</li><li>Schedule</li><li>Publish</li></ol><blockquote>Key excerpts keep the quote treatment from the editor.</blockquote><p style="text-align: center;"><a href="https://example.com">Reference link</a></p><hr><p style="text-align: right;">Right-aligned summary text.</p>'
		}
	}
} satisfies ContractStory<RecipeRichText>;
