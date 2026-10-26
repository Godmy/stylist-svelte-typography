import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
export interface RecipeBlockquote extends ComputeIntersectAll<[SlotTheme, SlotChildren]> {
	/** @deprecated Use `citeUrl` for the source URL and `sourceLabel` for the visible attribution. */
	cite?: string;
	citeUrl?: string;
	sourceLabel?: string;
	footerPrefix?: string;
	withBorder?: boolean;
	withBackground?: boolean;
}
