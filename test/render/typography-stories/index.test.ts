import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import StoryCanvas from '$stylist/domain/component/molecule/story-canvas/index.svelte';
import heading from '$stylist/typography/component/atom/heading/index.story';
import text from '$stylist/typography/component/atom/text/index.story';
import paragraph from '$stylist/typography/component/molecule/paragraph/index.story';
import blockquote from '$stylist/typography/component/atom/blockquote/index.story';
import link from '$stylist/typography/component/atom/link/index.story';
import badge from '$stylist/typography/component/atom/badge/index.story';
import badgeGroup from '$stylist/typography/component/molecule/badge-group/index.story';
import richText from '$stylist/typography/component/molecule/rich-text/index.story';

afterEach(cleanup);

describe('retained typography stories', () => {
	it.each([heading, text, paragraph, blockquote, link, badge, badgeGroup, richText])(
		'clones and mounts every preset of $title after updates',
		async (story) => {
			const view = render(StoryCanvas, { story });
			for (const preset of [{}, ...Object.values(story.presets ?? {})]) {
				const args = structuredClone({ ...story.args, ...preset });
				await view.rerender({ story, args });
				expect(view.container.querySelector('.c-story-canvas')?.firstElementChild).toBeTruthy();
			}
		}
	);
});
