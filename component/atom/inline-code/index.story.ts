import InlineCode from './index.svelte';
import type { RecipeInlineCode } from '$stylist/typography/interface/recipe/inline-code';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Inline code token inside prose. */
export default {
	component: InlineCode,
	title: 'InlineCode',
	description:
		'Inline code token for commands, flags, package names, and code fragments inside prose.',
	content: [{ kind: 'text', value: 'npm run dev' }],
	layout: 'centered'
} satisfies ContractStory<RecipeInlineCode>;
