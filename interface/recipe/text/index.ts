import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotTypography } from '$stylist/typography/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
export interface RecipeText extends ComputeIntersectAll<
	[Omit<HTMLAttributes<HTMLElement>, 'children'>, SlotChildren, SlotTypography, SlotText]
> {
	tone?: TokenColorTone;
	disabled?: boolean;
	block?: boolean;
}
