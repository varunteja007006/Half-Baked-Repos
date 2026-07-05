import { ActionBarDemo } from "@/components/demos/action-bar";
import { AngleSliderDemo } from "@/components/demos/angle-slider";
import { AvatarGroupDemo } from "@/components/demos/avatar-group";
import { BadgeOverflowDemo } from "@/components/demos/badge-overflow";
import { CheckboxGroupDemo } from "@/components/demos/checkbox-groups";
import { CircularProgressDemo } from "@/components/demos/circular-progress";
import { ColorPickerDemo } from "@/components/demos/color-picker";
import { ColorSwatchDemo } from "@/components/demos/color-swatch";
import { ComboboxDemo } from "@/components/demos/combo-box";
import { CompareSliderDemo } from "@/components/demos/compare-slider";
import { CropperDemo } from "@/components/demos/cropper";
import { EditableDemo } from "@/components/demos/editable";
import { FileUploadDemo } from "@/components/demos/file-upload";
import { FpsDemo } from "@/components/demos/fps";
import { KanbanDemo } from "@/components/demos/kanban";
import { KeyValueDemo } from "@/components/demos/key-value";
import { ListboxDemo } from "@/components/demos/list-box";
import { MarqueeDemo } from "@/components/demos/marquee";
import { MaskInputDemo } from "@/components/demos/masked-inputs";
import { MentionDemo } from "@/components/demos/mention";
import { QRCodeDemo } from "@/components/demos/qr-code";
import { RatingDemo } from "@/components/demos/rating";
import { RelativeTimeCardDemo } from "@/components/demos/relative-time-card";
import { ScrollSpyDemo } from "@/components/demos/scroll-spy";
import { ScrollerDemo } from "@/components/demos/scroller";
import { SegmentedInputDemo } from "@/components/demos/segmented-input";
import { SortableDemo } from "@/components/demos/sortable";
import { SpeedDialDemo } from "@/components/demos/speed-dail";
import { StackDemo } from "@/components/demos/stack";
import { StatDemo } from "@/components/demos/stats";
import { StepperDemo } from "@/components/demos/stepper";
import { TagsInputDemo } from "@/components/demos/tags-input";
import { TimelineDemo } from "@/components/demos/timeline";
import { TimePickerDemo } from "@/components/demos/timepicker";
import { TourDemo } from "@/components/demos/tour";

export default function Home() {
	return (
		<div className="flex flex-col px-8 py-20 items-center justify-center min-h-screen gap-16">
			<TourDemo />
			<TimelineDemo />
			<TimePickerDemo />
			<TagsInputDemo />
			<StepperDemo />
			<StatDemo />

			<div className="mt-10"></div>
			<StackDemo />
			<div className="mb-40"></div>

			<SpeedDialDemo />

			<SortableDemo />

			<SegmentedInputDemo />

			<ScrollerDemo />

			<ScrollSpyDemo />

			<RelativeTimeCardDemo />

			<RatingDemo />

			<QRCodeDemo />

			<MentionDemo />

			<MaskInputDemo />

			<MarqueeDemo />

			<ListboxDemo />

			<KeyValueDemo />

			<KanbanDemo />

			<FpsDemo />

			<FileUploadDemo />

			<EditableDemo />

			<CropperDemo />

			<CompareSliderDemo />

			<ComboboxDemo />

			<ColorSwatchDemo />

			<ColorPickerDemo />

			<CircularProgressDemo />

			<CheckboxGroupDemo />

			<BadgeOverflowDemo />

			<AvatarGroupDemo />

			<AngleSliderDemo />

			<ActionBarDemo />
		</div>
	);
}
