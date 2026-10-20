import Abbr from './index.svelte';
import type { RecipeAbbr } from '$stylist/typography/interface/recipe/abbr';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Accessible abbreviation with a dotted underline. */
export default {
	component: Abbr,
	title: 'Abbr',
	description: 'Accessible abbreviation with dotted underline hinting at hover/click tooltips.',
	args: { title: 'Application Programming Interface' },
	controls: {
		title: {
			type: 'text',
			label: 'Expansion',
			description: 'Full term exposed via the title attribute.'
		}
	},
	presets: {
		'CI/CD': { title: 'Continuous Integration & Continuous Delivery' },
		A11y: { title: 'Accessibility' }
	},
	content: [{ kind: 'text', value: 'API' }],
	layout: 'centered'
} satisfies ContractStory<RecipeAbbr>;
