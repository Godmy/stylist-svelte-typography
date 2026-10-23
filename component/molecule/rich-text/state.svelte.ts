import { createRichTextSegments } from '$stylist/typography/function/script/rich-text-segments';
import { resolveTypographyInlineStyle } from '$stylist/typography/function/script/inline-style';
import { resolveAriaLabel } from '$stylist/theme/function/resolve/aria-label';
import type { RecipeRichText } from '$stylist/typography/interface/recipe/rich-text';

export function createRichTextState(getProps: () => RecipeRichText) {
	const props = $derived(getProps());
	const text = $derived(props.text ?? '');
	const html = $derived(props.html ?? '');
	const marks = $derived(props.marks ?? []);
	const disabled = $derived(props.disabled ?? false);
	// HTML may contain flow content; its wrapper must remain a block container.
	const block = $derived(Boolean(html) || (props.block ?? false));
	const wrapperTag = $derived(block ? 'div' : 'span');
	const segments = $derived(props.segments ?? createRichTextSegments(text, marks));
	const attrs = $derived({
		'aria-label':
			resolveAriaLabel(props.ariaLabel, props as Record<string, unknown>, '') || undefined
	});
	const classes = $derived(
		[
			'c-typography-rich-text',
			block && 'c-typography-rich-text--block',
			disabled && 'c-typography-rich-text--disabled',
			typeof props.class === 'string' ? props.class : undefined
		]
			.filter(Boolean)
			.join(' ')
	);
	const style = $derived(resolveTypographyInlineStyle(props.style, props));
	const restProps = $derived.by(() => {
		const {
			class: _class,
			style: _style,
			tone: _tone,
			disabled: _disabled,
			block: _block,
			html: _html,
			text: _text,
			marks: _marks,
			segments: _segments,
			ariaLabel: _ariaLabel,
			fontSize: _fontSize,
			fontWeight: _fontWeight,
			fontFamily: _fontFamily,
			lineHeight: _lineHeight,
			letterSpacing: _letterSpacing,
			textTransform: _textTransform,
			textAlign: _textAlign,
			lineClamp: _lineClamp,
			children: _children,
			...rest
		} = props;
		return rest;
	});

	return {
		get attrs() {
			return attrs;
		},
		get disabled() {
			return disabled;
		},
		get text() {
			return text;
		},
		get html() {
			return html;
		},
		get marks() {
			return marks;
		},
		get wrapperTag() {
			return wrapperTag;
		},
		get segments() {
			return segments;
		},
		get classes() {
			return classes;
		},
		get style() {
			return style;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createRichTextState;
