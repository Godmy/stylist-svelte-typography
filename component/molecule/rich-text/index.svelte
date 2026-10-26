<script lang="ts">
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlMark from '$stylist/html/component/atom/mark/index.svelte';
	import HtmlCode from '$stylist/html/component/atom/code/index.svelte';
	import HtmlSub from '$stylist/html/component/atom/sub/index.svelte';
	import HtmlSup from '$stylist/html/component/atom/sup/index.svelte';
	import HtmlA from '$stylist/html/component/atom/a/index.svelte';
	import createRichTextState from '$stylist/typography/component/molecule/rich-text/state.svelte';
	import type { RecipeRichText } from '$stylist/typography/interface/recipe/rich-text';
	import type { SlotRichText } from '$stylist/typography/interface/slot/rich-text';

	type Segment = NonNullable<SlotRichText['segments']>[number];

	let props: RecipeRichText = $props();
	const state = createRichTextState(() => props);

	const Wrapper = $derived(state.wrapperTag === 'div' ? HtmlDiv : HtmlSpan);
	const SEGMENT_TAGS = {
		span: HtmlSpan,
		mark: HtmlMark,
		code: HtmlCode,
		sub: HtmlSub,
		sup: HtmlSup
	};

	function createSegmentStyle(segment: Segment, disabled: boolean): string | undefined {
		const declarations: string[] = [];
		const textDecorations: string[] = [];

		if (!disabled && segment.color) {
			declarations.push(`color: ${segment.color}`);
		}

		if (!disabled && segment.backgroundColor) {
			declarations.push(`background-color: ${segment.backgroundColor}`);
		}

		if (segment.underline) {
			textDecorations.push('underline');
		}

		if (segment.strikeThrough) {
			textDecorations.push('line-through');
		}

		if (textDecorations.length > 0) {
			declarations.push(`text-decoration-line: ${textDecorations.join(' ')}`);
			declarations.push('text-decoration-thickness: 0.08em');
		}

		return declarations.length > 0 ? `${declarations.join('; ')};` : undefined;
	}

	function createSegmentRel(segment: Segment): string | undefined {
		if (segment.rel) {
			return segment.rel;
		}

		if (segment.target === '_blank') {
			return 'noopener noreferrer';
		}

		return undefined;
	}
</script>

{#snippet segmentNode(segment: Segment)}
	{@const Tag = SEGMENT_TAGS[segment.tag]}
	<Tag
		class="c-typography-rich-text__segment"
		data-bold={segment.bold ? 'true' : 'false'}
		data-italic={segment.italic ? 'true' : 'false'}
		data-highlight={segment.highlight ? 'true' : 'false'}
		style={createSegmentStyle(segment, state.disabled)}
	>
		{segment.text}
	</Tag>
{/snippet}

<Wrapper {...state.restProps} {...state.attrs} class={state.classes} style={state.style}>
	{#if state.html}
		<HtmlDiv class="c-typography-rich-text__html">
			{@html state.html}
		</HtmlDiv>
	{:else}
		{#each state.segments as segment (segment.key)}
			{#if segment.href}
				<HtmlA
					href={state.disabled ? undefined : segment.href}
					target={segment.target}
					title={segment.title}
					rel={createSegmentRel(segment)}
					class="c-typography-rich-text__link"
				>
					{@render segmentNode(segment)}
				</HtmlA>
			{:else}
				{@render segmentNode(segment)}
			{/if}
		{/each}
	{/if}
</Wrapper>

<style>
	@layer html, typography, svg, mathml, layout, theme, localization;
	@layer typography {
		:global {
			/* Wrapper typography comes from the props; segments and editor HTML scale in em. */
			:where(.c-typography-rich-text) {
				white-space: pre-wrap;
				word-break: break-word;
			}
			:where(.c-typography-rich-text--block) {
				display: block;
			}
			/* Undefined variables leave each property inherited; props and consumer classes set them. */
			:where(.c-typography-rich-text) {
				font-size: var(--typography-font-size);
				font-weight: var(--typography-font-weight);
				font-family: var(--typography-font-family);
				line-height: var(--typography-line-height);
				letter-spacing: var(--typography-letter-spacing);
				text-transform: var(--typography-text-transform);
				text-align: var(--typography-text-align);
				color: var(--typography-color);
			}
			/* The clamp needs a box display, so it switches on only with the lineClamp prop. */
			:where(.c-typography-rich-text[style*='--typography-line-clamp']) {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: var(--typography-line-clamp);
				overflow: hidden;
			}
			:where(.c-typography-rich-text--disabled) {
				color: var(--color-text-tertiary);
			}
			:where(.c-typography-rich-text__segment) {
				color: inherit;
				font-style: normal;
				text-decoration-color: currentColor;
			}
			:where(.c-typography-rich-text__segment[data-bold='true']) {
				font-weight: var(--font-weight-bold);
			}
			:where(.c-typography-rich-text__segment[data-italic='true']) {
				font-style: italic;
			}
			:where(.c-typography-rich-text__segment[data-highlight='true']) {
				background-color: var(--color-warning-200, Mark);
				border-radius: 0.2em;
				padding-inline: 0.05em;
			}
			:where(code.c-typography-rich-text__segment) {
				padding-inline: 0.3em;
				padding-block: 0.12em;
				border-radius: 0.35em;
				background: var(--color-background-secondary);
			}
			:where(sub.c-typography-rich-text__segment),
			:where(sup.c-typography-rich-text__segment) {
				font-size: 0.72em;
				line-height: 0;
			}
			:where(.c-typography-rich-text__link) {
				color: var(--color-primary-600);
				text-decoration: none;
				text-underline-offset: 0.12em;
				transition: color var(--duration-140, 140ms) var(--easing-ease, ease);
			}
			:where(.c-typography-rich-text__link:hover) {
				color: var(--color-primary-700);
			}
			:where(.c-typography-rich-text--disabled .c-typography-rich-text__link) {
				color: inherit;
				pointer-events: none;
			}
			:where(.c-typography-rich-text__html) {
				display: flow-root;
			}
			:where(.c-typography-rich-text__html > :first-child) {
				margin-block-start: 0;
			}
			:where(.c-typography-rich-text__html > :last-child) {
				margin-block-end: 0;
			}
			:where(.c-typography-rich-text__html p) {
				margin-block: 0.75em;
			}
			:where(.c-typography-rich-text__html h1),
			:where(.c-typography-rich-text__html h2),
			:where(.c-typography-rich-text__html h3) {
				margin-block: 0.85em 0.35em;
				color: inherit;
				line-height: var(--line-height-tight);
			}
			:where(.c-typography-rich-text__html h1) {
				font-size: 1.875em;
				font-weight: var(--font-weight-bold);
			}
			:where(.c-typography-rich-text__html h2) {
				font-size: 1.5em;
				font-weight: var(--font-weight-semibold);
			}
			:where(.c-typography-rich-text__html h3) {
				font-size: 1.25em;
				font-weight: var(--font-weight-semibold);
			}
			:where(.c-typography-rich-text__html blockquote) {
				margin-block: 1em;
				margin-inline: 0;
				padding-inline-start: 1em;
				border-inline-start: 0.25em solid var(--color-border-primary);
				color: var(--color-text-secondary);
			}
			:where(.c-typography-rich-text__html ul, .c-typography-rich-text__html ol) {
				margin-block: 0.75em;
				padding-inline-start: 1.5em;
			}
			:where(.c-typography-rich-text__html ul) {
				list-style: disc;
			}
			:where(.c-typography-rich-text__html ol) {
				list-style: decimal;
			}
			:where(.c-typography-rich-text__html li) {
				margin-block: 0.25em;
				padding-inline-start: 0.2em;
			}
			:where(.c-typography-rich-text__html img) {
				display: block;
				max-width: 100%;
				height: auto;
				margin-block: 1em;
				border-radius: var(--radius-1-5);
			}
			:where(.c-typography-rich-text__html hr) {
				margin-block: 1.25em;
				border: 0;
				border-block-start: var(--border-width-thin, 1px) solid var(--color-border-primary);
			}
		}
	}
</style>
