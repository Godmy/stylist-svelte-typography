import Blockquote from './index.svelte';
import type { RecipeBlockquote } from '$stylist/typography/interface/recipe/blockquote';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Quoted content block with attribution. */
export default {
	component: Blockquote,
	title: 'Blockquote',
	description:
		'Quoted content with optional cite URL, footer prefix, source label, border, and surface treatment.',
	args: {
		sourceLabel: 'Paul Rand',
		citeUrl: 'https://example.com/paul-rand-quote',
		footerPrefix: 'Source: ',
		withBorder: true,
		withBackground: true
	},
	controls: {
		sourceLabel: {
			type: 'text',
			label: 'Source Label',
			description: 'Visible attribution footer text.'
		},
		citeUrl: { type: 'text', label: 'Cite URL', description: 'Optional semantic cite URL.' },
		footerPrefix: {
			type: 'text',
			label: 'Footer Prefix',
			description: 'Prefix before the source label.'
		},
		withBorder: { type: 'boolean', label: 'Border', description: 'Accent quote border.' },
		withBackground: {
			type: 'boolean',
			label: 'Background',
			description: 'Surface treatment for emphasized quotes.'
		}
	},
	presets: {
		'Border only': { sourceLabel: 'Leonardo da Vinci', footerPrefix: 'By ', withBackground: false },
		'Surface only': { sourceLabel: 'Brian Chesky', footerPrefix: 'By ', withBorder: false }
	},
	content: [{ kind: 'text', value: 'Design is the silent ambassador of your brand.' }]
} satisfies ContractStory<RecipeBlockquote>;
