import Kbd from './index.svelte';
import type { RecipeKbd } from '$stylist/typography/interface/recipe/kbd';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Keyboard key token. */
export default {
	component: Kbd,
	title: 'Kbd',
	description: 'Keyboard shortcut token for command palettes, docs, and interaction hints.',
	content: [{ kind: 'text', value: 'Ctrl' }],
	layout: 'centered'
} satisfies ContractStory<RecipeKbd>;
