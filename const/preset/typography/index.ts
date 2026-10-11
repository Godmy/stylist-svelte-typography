import { TOKEN_FONT_FAMILY } from '$stylist/design-token/const/object/font-family';
import { TOKEN_FONT_SIZE } from '$stylist/design-token/const/object/font-size';
import { TOKEN_FONT_SIZE_RELATIVE } from '$stylist/design-token/const/object/font-size-relative';
import { TOKEN_FONT_WEIGHT } from '$stylist/design-token/const/object/font-weight';
import { TOKEN_LINE_HEIGHT } from '$stylist/design-token/const/object/line-height';
import { TOKEN_LETTER_SPACING } from '$stylist/design-token/const/object/letter-spacing';

export const TYPOGRAPHY_PRESET = {
	body: {
		'font-family': `var(--typography-font-family, ${TOKEN_FONT_FAMILY.sans})`,
		'font-size': `var(--typography-font-size-4, ${TOKEN_FONT_SIZE['4']})`,
		'font-weight': `var(--typography-font-weight-normal, ${TOKEN_FONT_WEIGHT.normal})`,
		'line-height': `var(--typography-line-height-normal, ${TOKEN_LINE_HEIGHT.normal})`
	},
	heading: {
		'font-weight': `var(--typography-font-weight-semibold, ${TOKEN_FONT_WEIGHT.semibold})`,
		'line-height': `var(--typography-line-height-tight, ${TOKEN_LINE_HEIGHT.tight})`,
		'letter-spacing': `var(--typography-letter-spacing-narrow, ${TOKEN_LETTER_SPACING.narrow})`
	},
	caption: {
		'font-size': `var(--font-relative-small, ${TOKEN_FONT_SIZE_RELATIVE.small})`,
		'font-weight': `var(--typography-font-weight-normal, ${TOKEN_FONT_WEIGHT.normal})`,
		'line-height': `var(--typography-line-height-normal, ${TOKEN_LINE_HEIGHT.normal})`
	},
	code: {
		'font-family': `var(--font-mono, ${TOKEN_FONT_FAMILY.mono})`,
		'font-size': `var(--font-relative-small, ${TOKEN_FONT_SIZE_RELATIVE.small})`
	}
} as const;
