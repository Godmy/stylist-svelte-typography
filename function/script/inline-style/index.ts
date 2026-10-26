import { TOKEN_FONT_FAMILY } from '$stylist/design-token/const/object/font-family';
import { TOKEN_FONT_SIZE } from '$stylist/design-token/const/object/font-size';
import { TOKEN_FONT_WEIGHT } from '$stylist/design-token/const/object/font-weight';
import { TOKEN_LETTER_SPACING } from '$stylist/design-token/const/object/letter-spacing';
import { TOKEN_LINE_HEIGHT } from '$stylist/design-token/const/object/line-height';
import type { SlotTypography } from '$stylist/typography/interface/slot/typography';
import type { TokenFontSize } from '$stylist/design-token/type/alias/font-size';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';

const TONE_COLOR: Record<TokenColorTone, string> = {
	default: 'var(--color-text-primary)',
	neutral: 'var(--color-text-secondary)',
	primary: 'var(--color-text-primary)',
	secondary: 'var(--color-text-secondary)',
	tertiary: 'var(--color-text-tertiary)',
	success: 'var(--color-success-700, var(--color-text-primary))',
	info: 'var(--color-info-700, var(--color-text-primary))',
	warning: 'var(--color-warning-700, var(--color-text-primary))',
	danger: 'var(--color-danger-700, var(--color-text-primary))',
	error: 'var(--color-error-700, var(--color-text-primary))'
};

/**
 * Typography props as `--typography-*` custom properties only. The component stylesheet reads
 * them inside `@layer typography` with inherited or skin fallbacks, so a component without
 * props looks like the html skin, and consumer classes can set the same variables or override
 * the properties. Token values stay `var()` references, so the theme and the sandbox panel
 * re-scale them.
 */
export function resolveTypographyInlineStyle(
	styleValue: unknown,
	props: Partial<SlotTypography> & {
		fontSize?: TokenFontSize;
		tone?: TokenColorTone;
	}
): string | undefined {
	const declarations: string[] = [];
	const baseStyle = typeof styleValue === 'string' ? styleValue.trim() : '';

	if (baseStyle) {
		declarations.push(baseStyle.replace(/;\s*$/, ''));
	}

	if (props.fontSize) {
		declarations.push(
			`--typography-font-size: var(--font-size-${props.fontSize}, ${TOKEN_FONT_SIZE[props.fontSize]})`
		);
	}

	if (props.fontWeight) {
		declarations.push(
			`--typography-font-weight: var(--font-weight-${props.fontWeight}, ${TOKEN_FONT_WEIGHT[props.fontWeight]})`
		);
	}

	if (props.fontFamily) {
		declarations.push(
			`--typography-font-family: ${
				props.fontFamily in TOKEN_FONT_FAMILY
					? `var(--font-${props.fontFamily}, ${TOKEN_FONT_FAMILY[props.fontFamily as keyof typeof TOKEN_FONT_FAMILY]})`
					: props.fontFamily
			}`
		);
	}

	if (props.lineHeight) {
		declarations.push(
			`--typography-line-height: var(--line-height-${props.lineHeight}, ${TOKEN_LINE_HEIGHT[props.lineHeight]})`
		);
	}

	if (props.letterSpacing) {
		declarations.push(
			`--typography-letter-spacing: var(--letter-spacing-${props.letterSpacing}, ${TOKEN_LETTER_SPACING[props.letterSpacing]})`
		);
	}

	if (props.textTransform) {
		declarations.push(`--typography-text-transform: ${props.textTransform}`);
	}

	if (props.textAlign) {
		declarations.push(`--typography-text-align: ${props.textAlign}`);
	}

	if (props.lineClamp && props.lineClamp > 0) {
		declarations.push(`--typography-line-clamp: ${props.lineClamp}`);
	}

	if (props.tone) {
		declarations.push(`--typography-color: ${TONE_COLOR[props.tone]}`);
	}

	if (declarations.length === 0) {
		return undefined;
	}

	return `${declarations.join('; ')};`;
}
