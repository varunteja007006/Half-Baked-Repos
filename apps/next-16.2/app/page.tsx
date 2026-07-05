"use client";

import { DatePicker } from "@/components/ui/date-picker";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue="shipping"
			className="max-w-lg"
		>
			<AccordionItem value="shipping">
				<AccordionTrigger>What are your shipping options?</AccordionTrigger>
				<AccordionContent>
					We offer standard (5-7 days), express (2-3 days), and overnight
					shipping. Free shipping on international orders.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="returns">
				<AccordionTrigger>What is your return policy?</AccordionTrigger>
				<AccordionContent>
					Returns accepted within 30 days. Items must be unused and in original
					packaging. Refunds processed within 5-7 business days.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="support">
				<AccordionTrigger>How can I contact customer support?</AccordionTrigger>
				<AccordionContent>
					Reach us via email, live chat, or phone. We respond within 24 hours
					during business days.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

import { CheckCircle2Icon, CopyMinus, Folder, InfoIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo() {
	return (
		<div className="grid w-full max-w-md items-start gap-4">
			<Alert>
				<CheckCircle2Icon />
				<AlertTitle>Payment successful</AlertTitle>
				<AlertDescription>
					Your payment of $29.99 has been processed. A receipt has been sent to
					your email address.
				</AlertDescription>
			</Alert>
			<Alert>
				<InfoIcon />
				<AlertTitle>New feature available</AlertTitle>
				<AlertDescription>
					We&apos;ve added dark mode support. You can enable it in your account
					settings.
				</AlertDescription>
			</Alert>
		</div>
	);
}

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function AlertDialogDemo() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Show Dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AspectRatioDemo() {
	return (
		<div className="w-full max-w-sm">
			<AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
				<Image
					src="https://avatar.vercel.sh/shadcn1"
					alt="Photo"
					fill
					className="w-full rounded-lg object-cover grayscale dark:brightness-20"
				/>
			</AspectRatio>
		</div>
	);
}

import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
} from "@/components/ui/avatar";

export function AvatarDemo() {
	return (
		<div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
			<Avatar>
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="@shadcn"
					className="grayscale"
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage
					src="https://github.com/evilrabbit.png"
					alt="@evilrabbit"
				/>
				<AvatarFallback>ER</AvatarFallback>
				<AvatarBadge className="bg-green-600 dark:bg-green-800" />
			</Avatar>
			<AvatarGroup className="grayscale">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
		</div>
	);
}

import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
	return (
		<div className="flex w-full flex-wrap justify-center gap-2">
			<Badge>Badge</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	);
}

import Link from "next/link";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BreadcrumbDemo() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="#">Home</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon-sm" variant="ghost">
								<BreadcrumbEllipsis />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuGroup>
								<DropdownMenuItem>Documentation</DropdownMenuItem>
								<DropdownMenuItem>Themes</DropdownMenuItem>
								<DropdownMenuItem>GitHub</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="#">Components</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

import { ArrowUpIcon } from "lucide-react";

export function ButtonDemo() {
	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<Button variant="outline">Button</Button>
			<Button variant="outline" size="icon" aria-label="Submit">
				<ArrowUpIcon />
			</Button>
		</div>
	);
}

import * as React from "react";
import {
	ArchiveIcon,
	ArrowLeftIcon,
	CalendarPlusIcon,
	ClockIcon,
	ListFilterIcon,
	MailCheckIcon,
	MoreHorizontalIcon,
	TagIcon,
	Trash2Icon,
} from "lucide-react";

import { ButtonGroup } from "@/components/ui/button-group";
import {
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function ButtonGroupDemo() {
	const [label, setLabel] = React.useState("personal");

	return (
		<ButtonGroup>
			<ButtonGroup className="hidden sm:flex">
				<Button variant="outline" size="icon" aria-label="Go Back">
					<ArrowLeftIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">Archive</Button>
				<Button variant="outline">Report</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline">Snooze</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" aria-label="More Options">
							<MoreHorizontalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-40">
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<MailCheckIcon />
								Mark as Read
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ArchiveIcon />
								Archive
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<ClockIcon />
								Snooze
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CalendarPlusIcon />
								Add to Calendar
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ListFilterIcon />
								Add to List
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<TagIcon />
									Label As...
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuRadioGroup
										value={label}
										onValueChange={setLabel}
									>
										<DropdownMenuRadioItem value="personal">
											Personal
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="work">
											Work
										</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="other">
											Other
										</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem variant="destructive">
								<Trash2Icon />
								Trash
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</ButtonGroup>
		</ButtonGroup>
	);
}

import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className="rounded-lg border"
			captionLayout="dropdown"
		/>
	);
}

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CardDemo() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
				<CardAction>
					<Button variant="link">Sign Up</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<Input id="password" type="password" required />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button type="submit" className="w-full">
					Login
				</Button>
				<Button variant="outline" className="w-full">
					Login with Google
				</Button>
			</CardFooter>
		</Card>
	);
}

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
	return (
		<Carousel className="w-full max-w-[12rem] sm:max-w-xs">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<span className="text-4xl font-semibold">{index + 1}</span>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}

import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from "@/components/ui/field";

export function CheckboxDemo() {
	return (
		<FieldGroup className="max-w-sm">
			<Field orientation="horizontal">
				<Checkbox id="terms-checkbox" name="terms-checkbox" />
				<Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
			</Field>
			<Field orientation="horizontal">
				<Checkbox
					id="terms-checkbox-2"
					name="terms-checkbox-2"
					defaultChecked
				/>
				<FieldContent>
					<FieldLabel htmlFor="terms-checkbox-2">
						Accept terms and conditions
					</FieldLabel>
					<FieldDescription>
						By clicking this checkbox, you agree to the terms.
					</FieldDescription>
				</FieldContent>
			</Field>
			<Field orientation="horizontal" data-disabled>
				<Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
				<FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel>
			</Field>
			<FieldLabel>
				<Field orientation="horizontal">
					<Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
					<FieldContent>
						<FieldTitle>Enable notifications</FieldTitle>
						<FieldDescription>
							You can enable or disable notifications at any time.
						</FieldDescription>
					</FieldContent>
				</Field>
			</FieldLabel>
		</FieldGroup>
	);
}

import { ChevronsUpDown } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CollapsibleDemo() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="flex w-[350px] flex-col gap-2"
		>
			<div className="flex items-center justify-between gap-4 px-4">
				<h4 className="text-sm font-semibold">Order #4189</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="icon" className="size-8">
						<ChevronsUpDown />
						<span className="sr-only">Toggle details</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
				<span className="text-muted-foreground">Status</span>
				<span className="font-medium">Shipped</span>
			</div>
			<CollapsibleContent className="flex flex-col gap-2">
				<div className="rounded-md border px-4 py-2 text-sm">
					<p className="font-medium">Shipping address</p>
					<p className="text-muted-foreground">100 Market St, San Francisco</p>
				</div>
				<div className="rounded-md border px-4 py-2 text-sm">
					<p className="font-medium">Items</p>
					<p className="text-muted-foreground">2x Studio Headphones</p>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";

const frameworks = [
	"Next.js",
	"SvelteKit",
	"Nuxt.js",
	"Remix",
	"Astro",
] as const;

export function ComboboxBasic() {
	return (
		<Combobox items={frameworks}>
			<ComboboxInput placeholder="Select a framework" />
			<ComboboxContent>
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{(item) => (
						<ComboboxItem key={item} value={item}>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}

import {
	Calculator,
	Calendar as CalendarIcon,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";

export function CommandDemo() {
	return (
		<Command className="max-w-sm rounded-lg border">
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<CalendarIcon />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem>
						<Smile />
						<span>Search Emoji</span>
					</CommandItem>
					<CommandItem disabled>
						<Calculator />
						<span>Calculator</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem>
						<User />
						<span>Profile</span>
						<CommandShortcut>⌘P</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<CreditCard />
						<span>Billing</span>
						<CommandShortcut>⌘B</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Settings />
						<span>Settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuDemo() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
				<span className="hidden pointer-fine:inline-block">
					Right click here
				</span>
				<span className="hidden pointer-coarse:inline-block">
					Long press here
				</span>
			</ContextMenuTrigger>
			<ContextMenuContent className="w-48">
				<ContextMenuGroup>
					<ContextMenuItem>
						Back
						<ContextMenuShortcut>⌘[</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem disabled>
						Forward
						<ContextMenuShortcut>⌘]</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						Reload
						<ContextMenuShortcut>⌘R</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSub>
						<ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-44">
							<ContextMenuGroup>
								<ContextMenuItem>Save Page...</ContextMenuItem>
								<ContextMenuItem>Create Shortcut...</ContextMenuItem>
								<ContextMenuItem>Name Window...</ContextMenuItem>
							</ContextMenuGroup>
							<ContextMenuSeparator />
							<ContextMenuGroup>
								<ContextMenuItem>Developer Tools</ContextMenuItem>
							</ContextMenuGroup>
							<ContextMenuSeparator />
							<ContextMenuGroup>
								<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
							</ContextMenuGroup>
						</ContextMenuSubContent>
					</ContextMenuSub>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuGroup>
					<ContextMenuCheckboxItem checked>
						Show Bookmarks
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuGroup>
					<ContextMenuRadioGroup value="pedro">
						<ContextMenuLabel>People</ContextMenuLabel>
						<ContextMenuRadioItem value="pedro">
							Pedro Duarte
						</ContextMenuRadioItem>
						<ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	);
}

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDemo() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline">Open Dialog</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you&apos;re
							done.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<Field>
							<Label htmlFor="name-1">Name</Label>
							<Input id="name-1" name="name" defaultValue="Pedro Duarte" />
						</Field>
						<Field>
							<Label htmlFor="username-1">Username</Label>
							<Input id="username-1" name="username" defaultValue="@peduarte" />
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}

import { useDirection } from "@/components/ui/direction";

export function DirectionDemo() {
	const direction = useDirection();
	return <div>Current direction: {direction}</div>;
}

import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

const data = [
	{
		goal: 400,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 239,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 349,
	},
];

export function DrawerDemo() {
	const [goal, setGoal] = React.useState(350);

	function onClick(adjustment: number) {
		setGoal(Math.max(200, Math.min(400, goal + adjustment)));
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Move Goal</DrawerTitle>
						<DrawerDescription>Set your daily activity goal.</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="flex items-center justify-center space-x-2">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 shrink-0 rounded-full"
								onClick={() => onClick(-10)}
								disabled={goal <= 200}
							>
								<Minus />
								<span className="sr-only">Decrease</span>
							</Button>
							<div className="flex-1 text-center">
								<div className="text-7xl font-bold tracking-tighter">
									{goal}
								</div>
								<div className="text-[0.70rem] text-muted-foreground uppercase">
									Calories/day
								</div>
							</div>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 shrink-0 rounded-full"
								onClick={() => onClick(10)}
								disabled={goal >= 400}
							>
								<Plus />
								<span className="sr-only">Increase</span>
							</Button>
						</div>
						<div className="mt-3 h-[120px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={data}>
									<Bar
										dataKey="goal"
										style={
											{
												fill: "var(--chart-1)",
											} as React.CSSProperties
										}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

import {
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="start">
				<DropdownMenuGroup>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>More...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>GitHub</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuItem disabled>API</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Log out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

import { ArrowUpRightIcon } from "lucide-react";

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function EmptyDemo() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Folder />
				</EmptyMedia>
				<EmptyTitle>No Projects Yet</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any projects yet. Get started by creating
					your first project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="flex-row justify-center gap-2">
				<Button>Create Project</Button>
				<Button variant="outline">Import Project</Button>
			</EmptyContent>
			<Button
				variant="link"
				asChild
				className="text-muted-foreground"
				size="sm"
			>
				<a href="#">
					Learn More <ArrowUpRightIcon />
				</a>
			</Button>
		</Empty>
	);
}

import { FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function FieldDemo() {
	return (
		<div className="w-full max-w-md">
			<form>
				<FieldGroup>
					<FieldSet>
						<FieldLegend>Payment Method</FieldLegend>
						<FieldDescription>
							All transactions are secure and encrypted
						</FieldDescription>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="checkout-7j9-card-name-43j">
									Name on Card
								</FieldLabel>
								<Input
									id="checkout-7j9-card-name-43j"
									placeholder="Evil Rabbit"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="checkout-7j9-card-number-uw1">
									Card Number
								</FieldLabel>
								<Input
									id="checkout-7j9-card-number-uw1"
									placeholder="1234 5678 9012 3456"
									required
								/>
								<FieldDescription>
									Enter your 16-digit card number
								</FieldDescription>
							</Field>
							<div className="grid grid-cols-3 gap-4">
								<Field>
									<FieldLabel htmlFor="checkout-exp-month-ts6">
										Month
									</FieldLabel>
									<Select defaultValue="">
										<SelectTrigger id="checkout-exp-month-ts6">
											<SelectValue placeholder="MM" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="01">01</SelectItem>
												<SelectItem value="02">02</SelectItem>
												<SelectItem value="03">03</SelectItem>
												<SelectItem value="04">04</SelectItem>
												<SelectItem value="05">05</SelectItem>
												<SelectItem value="06">06</SelectItem>
												<SelectItem value="07">07</SelectItem>
												<SelectItem value="08">08</SelectItem>
												<SelectItem value="09">09</SelectItem>
												<SelectItem value="10">10</SelectItem>
												<SelectItem value="11">11</SelectItem>
												<SelectItem value="12">12</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
								<Field>
									<FieldLabel htmlFor="checkout-7j9-exp-year-f59">
										Year
									</FieldLabel>
									<Select defaultValue="">
										<SelectTrigger id="checkout-7j9-exp-year-f59">
											<SelectValue placeholder="YYYY" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="2024">2024</SelectItem>
												<SelectItem value="2025">2025</SelectItem>
												<SelectItem value="2026">2026</SelectItem>
												<SelectItem value="2027">2027</SelectItem>
												<SelectItem value="2028">2028</SelectItem>
												<SelectItem value="2029">2029</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
								<Field>
									<FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
									<Input id="checkout-7j9-cvv" placeholder="123" required />
								</Field>
							</div>
						</FieldGroup>
					</FieldSet>
					<FieldSeparator />
					<FieldSet>
						<FieldLegend>Billing Address</FieldLegend>
						<FieldDescription>
							The billing address associated with your payment method
						</FieldDescription>
						<FieldGroup>
							<Field orientation="horizontal">
								<Checkbox
									id="checkout-7j9-same-as-shipping-wgm"
									defaultChecked
								/>
								<FieldLabel
									htmlFor="checkout-7j9-same-as-shipping-wgm"
									className="font-normal"
								>
									Same as shipping address
								</FieldLabel>
							</Field>
						</FieldGroup>
					</FieldSet>
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="checkout-7j9-optional-comments">
									Comments
								</FieldLabel>
								<Textarea
									id="checkout-7j9-optional-comments"
									placeholder="Add any additional comments"
									className="resize-none"
								/>
							</Field>
						</FieldGroup>
					</FieldSet>
					<Field orientation="horizontal">
						<Button type="submit">Submit</Button>
						<Button variant="outline" type="button">
							Cancel
						</Button>
					</Field>
				</FieldGroup>
			</form>
		</div>
	);
}

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardDemo() {
	return (
		<HoverCard openDelay={10} closeDelay={100}>
			<HoverCardTrigger asChild>
				<Button variant="link">Hover Here</Button>
			</HoverCardTrigger>
			<HoverCardContent className="flex w-64 flex-col gap-0.5">
				<div className="font-semibold">@nextjs</div>
				<div>The React Framework – created and maintained by @vercel.</div>
				<div className="mt-1 text-xs text-muted-foreground">
					Joined December 2021
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}

export function InputDemo() {
	return (
		<Field>
			<FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
			<Input id="input-demo-api-key" type="password" placeholder="sk-..." />
			<FieldDescription>
				Your API key is encrypted and stored securely.
			</FieldDescription>
		</Field>
	);
}

import { Search } from "lucide-react";

import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

export function InputGroupDemo() {
	return (
		<InputGroup className="max-w-xs">
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
			<InputGroupAddon align="inline-end">12 results</InputGroupAddon>
		</InputGroup>
	);
}

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPDemo() {
	return (
		<InputOTP maxLength={6} defaultValue="123456">
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	);
}

import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";

export function ItemDemo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-6">
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Basic Item</ItemTitle>
					<ItemDescription>
						A simple item with title and description.
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button variant="outline" size="sm">
						Action
					</Button>
				</ItemActions>
			</Item>
			<Item variant="outline" size="sm" asChild>
				<a href="#">
					<ItemMedia>
						<BadgeCheckIcon className="size-5" />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Your profile has been verified.</ItemTitle>
					</ItemContent>
					<ItemActions>
						<ChevronRightIcon className="size-4" />
					</ItemActions>
				</a>
			</Item>
		</div>
	);
}

import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function KbdDemo() {
	return (
		<div className="flex flex-col items-center gap-4">
			<KbdGroup>
				<Kbd>⌘</Kbd>
				<Kbd>⇧</Kbd>
				<Kbd>⌥</Kbd>
				<Kbd>⌃</Kbd>
			</KbdGroup>
			<KbdGroup>
				<Kbd>Ctrl</Kbd>
				<span>+</span>
				<Kbd>B</Kbd>
			</KbdGroup>
		</div>
	);
}

export function LabelDemo() {
	return (
		<div className="flex gap-2">
			<Checkbox id="terms" />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	);
}

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";

export function MenubarDemo() {
	return (
		<Menubar className="w-72">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							New Window <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled>New Incognito Window</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarSub>
							<MenubarSubTrigger>Share</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarGroup>
									<MenubarItem>Email link</MenubarItem>
									<MenubarItem>Messages</MenubarItem>
									<MenubarItem>Notes</MenubarItem>
								</MenubarGroup>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Print... <MenubarShortcut>⌘P</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarItem>
							Undo <MenubarShortcut>⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarSub>
							<MenubarSubTrigger>Find</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarGroup>
									<MenubarItem>Search the web</MenubarItem>
								</MenubarGroup>
								<MenubarSeparator />
								<MenubarGroup>
									<MenubarItem>Find...</MenubarItem>
									<MenubarItem>Find Next</MenubarItem>
									<MenubarItem>Find Previous</MenubarItem>
								</MenubarGroup>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>Cut</MenubarItem>
						<MenubarItem>Copy</MenubarItem>
						<MenubarItem>Paste</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent className="w-44">
					<MenubarGroup>
						<MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
						<MenubarCheckboxItem checked>Full URLs</MenubarCheckboxItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>
							Reload <MenubarShortcut>⌘R</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled inset>
							Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Toggle Fullscreen</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Hide Sidebar</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Profiles</MenubarTrigger>
				<MenubarContent>
					<MenubarRadioGroup value="benoit">
						<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
						<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
						<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
					</MenubarRadioGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Edit...</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Add Profile...</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}

import {
	NativeSelect,
	NativeSelectOption,
} from "@/components/ui/native-select";

export function NativeSelectDemo() {
	return (
		<NativeSelect>
			<NativeSelectOption value="">Select status</NativeSelectOption>
			<NativeSelectOption value="todo">Todo</NativeSelectOption>
			<NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
			<NativeSelectOption value="done">Done</NativeSelectOption>
			<NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
		</NativeSelect>
	);
}

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

export function NavigationMenuDemo() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="w-96">
							<ListItem href="/docs" title="Introduction">
								Re-usable components built with Tailwind CSS.
							</ListItem>
							<ListItem href="/docs/installation" title="Installation">
								How to install dependencies and structure your app.
							</ListItem>
							<ListItem href="/docs/primitives/typography" title="Typography">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem className="hidden md:flex">
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<Link href="/docs">Docs</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="flex flex-col gap-1 text-sm">
						<div className="leading-none font-medium">{title}</div>
						<div className="line-clamp-2 text-muted-foreground">{children}</div>
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo() {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Open popover</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="leading-none font-medium">Dimensions</h4>
						<p className="text-sm text-muted-foreground">
							Set the dimensions for the layer.
						</p>
					</div>
					<div className="grid gap-2">
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="width">Width</Label>
							<Input
								id="width"
								defaultValue="100%"
								className="col-span-2 h-8"
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxWidth">Max. width</Label>
							<Input
								id="maxWidth"
								defaultValue="300px"
								className="col-span-2 h-8"
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="height">Height</Label>
							<Input
								id="height"
								defaultValue="25px"
								className="col-span-2 h-8"
							/>
						</div>
						<div className="grid grid-cols-3 items-center gap-4">
							<Label htmlFor="maxHeight">Max. height</Label>
							<Input
								id="maxHeight"
								defaultValue="none"
								className="col-span-2 h-8"
							/>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	return <Progress value={progress} className="w-[60%]" />;
}

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
	return (
		<RadioGroup defaultValue="comfortable" className="w-fit">
			<div className="flex items-center gap-3">
				<RadioGroupItem value="default" id="r1" />
				<Label htmlFor="r1">Default</Label>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="comfortable" id="r2" />
				<Label htmlFor="r2">Comfortable</Label>
			</div>
			<div className="flex items-center gap-3">
				<RadioGroupItem value="compact" id="r3" />
				<Label htmlFor="r3">Compact</Label>
			</div>
		</RadioGroup>
	);
}

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

export function ResizableDemo() {
	return (
		<ResizablePanelGroup
			orientation="horizontal"
			className="max-w-sm rounded-lg border"
		>
			<ResizablePanel defaultSize="50%">
				<div className="flex h-[200px] items-center justify-center p-6">
					<span className="font-semibold">One</span>
				</div>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize="50%">
				<ResizablePanelGroup orientation="vertical">
					<ResizablePanel defaultSize="25%">
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Two</span>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize="75%">
						<div className="flex h-full items-center justify-center p-6">
							<span className="font-semibold">Three</span>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 50 }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export function ScrollAreaDemo() {
	return (
		<ScrollArea className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
				{tags.map((tag) => (
					<React.Fragment key={tag}>
						<div className="text-sm">{tag}</div>
						<Separator className="my-2" />
					</React.Fragment>
				))}
			</div>
		</ScrollArea>
	);
}

import { SelectLabel } from "@/components/ui/select";

export function SelectDemo() {
	return (
		<Select>
			<SelectTrigger className="w-full max-w-48">
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Fruits</SelectLabel>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export function SeparatorDemo() {
	return (
		<div className="flex max-w-sm flex-col gap-4 text-sm">
			<div className="flex flex-col gap-1.5">
				<div className="leading-none font-medium">shadcn/ui</div>
				<div className="text-muted-foreground">
					The Foundation for your Design System
				</div>
			</div>
			<Separator />
			<div>
				A set of beautifully designed components that you can customize, extend,
				and build on.
			</div>
		</div>
	);
}

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>
				<div className="grid flex-1 auto-rows-min gap-6 px-4">
					<div className="grid gap-3">
						<Label htmlFor="sheet-demo-name">Name</Label>
						<Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
					</div>
					<div className="grid gap-3">
						<Label htmlFor="sheet-demo-username">Username</Label>
						<Input id="sheet-demo-username" defaultValue="@peduarte" />
					</div>
				</div>
				<SheetFooter>
					<Button type="submit">Save changes</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
	return (
		<div className="flex items-center gap-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
}

import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
	return (
		<Slider
			defaultValue={[10, 20, 70]}
			max={100}
			step={1}
			className="mx-auto w-full max-w-xs"
		/>
	);
}

import { toast } from "sonner";

export function SonnerDemo() {
	return (
		<div className="flex flex-wrap gap-2">
			<Button variant="outline" onClick={() => toast("Event has been created")}>
				Default
			</Button>
			<Button
				variant="outline"
				onClick={() => toast.success("Event has been created")}
			>
				Success
			</Button>
			<Button
				variant="outline"
				onClick={() =>
					toast.info("Be at the area 10 minutes before the event time")
				}
			>
				Info
			</Button>
			<Button
				variant="outline"
				onClick={() =>
					toast.warning("Event start time cannot be earlier than 8am")
				}
			>
				Warning
			</Button>
			<Button
				variant="outline"
				onClick={() => toast.error("Event has not been created")}
			>
				Error
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast.promise<{ name: string }>(
						() =>
							new Promise((resolve) =>
								setTimeout(() => resolve({ name: "Event" }), 2000),
							),
						{
							loading: "Loading...",
							success: (data) => `${data.name} has been created`,
							error: "Error",
						},
					);
				}}
			>
				Promise
			</Button>
		</div>
	);
}

import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
	return (
		<div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
			<Item variant="muted">
				<ItemMedia>
					<Spinner />
				</ItemMedia>
				<ItemContent>
					<ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
				</ItemContent>
				<ItemContent className="flex-none justify-end">
					<span className="text-sm tabular-nums">$100.00</span>
				</ItemContent>
			</Item>
		</div>
	);
}

import { Switch } from "@/components/ui/switch";

export function SwitchDemo() {
	return (
		<div className="flex items-center space-x-2">
			<Switch id="airplane-mode" />
			<Label htmlFor="airplane-mode">Airplane Mode</Label>
		</div>
	);
}

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export function TableDemo() {
	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell className="text-right">{invoice.totalAmount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
	return (
		<Tabs defaultValue="overview" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="reports">Reports</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">
				<Card>
					<CardHeader>
						<CardTitle>Overview</CardTitle>
						<CardDescription>
							View your key metrics and recent project activity. Track progress
							across all your active projects.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						You have 12 active projects and 3 pending tasks.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="analytics">
				<Card>
					<CardHeader>
						<CardTitle>Analytics</CardTitle>
						<CardDescription>
							Track performance and user engagement metrics. Monitor trends and
							identify growth opportunities.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Page views are up 25% compared to last month.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="reports">
				<Card>
					<CardHeader>
						<CardTitle>Reports</CardTitle>
						<CardDescription>
							Generate and download your detailed reports. Export data in
							multiple formats for analysis.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						You have 5 reports ready and available to export.
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="settings">
				<Card>
					<CardHeader>
						<CardTitle>Settings</CardTitle>
						<CardDescription>
							Manage your account preferences and options. Customize your
							experience to fit your needs.
						</CardDescription>
					</CardHeader>
					<CardContent className="text-sm text-muted-foreground">
						Configure notifications, security, and themes.
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}

export function TextareaDemo() {
	return <Textarea placeholder="Type your message here." />;
}

import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
	return (
		<Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
			<BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
			Bookmark
		</Toggle>
	);
}

import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupDemo() {
	return (
		<ToggleGroup variant="outline" type="multiple">
			<ToggleGroupItem value="bold" aria-label="Toggle bold">
				<Bold />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Toggle italic">
				<Italic />
			</ToggleGroupItem>
			<ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
				<Underline />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipDemo() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="outline">Hover</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	);
}

import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import { DirectionProvider } from "@/components/ui/direction";

export default function Home() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Build Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<main className="flex flex-1 w-full max-w-3xl mx-auto gap-10 flex-col items-center justify-between py-10 px-16 bg-white dark:bg-black sm:items-start">
						<AccordionDemo />
						<AlertDemo />
						<AlertDialogDemo />
						<AspectRatioDemo />
						<AvatarDemo />

						<BadgeDemo />
						<BreadcrumbDemo />
						<ButtonDemo />
						<ButtonGroupDemo />

						<CalendarDemo />
						<CardDemo />
						{/* chart */}
						<CarouselDemo />
						<CheckboxDemo />
						<CollapsibleDemo />
						<ComboboxBasic />
						<CommandDemo />
						<ContextMenuDemo />

						{/* data table */}
						<DatePicker />
						<DialogDemo />
						<DirectionProvider dir="rtl">
							<DirectionDemo />
						</DirectionProvider>
						<DrawerDemo />
						<DropdownMenuDemo />

						<EmptyDemo />

						<FieldDemo />

						<HoverCardDemo />

						<InputDemo />
						<InputGroupDemo />
						<InputOTPDemo />
						<ItemDemo />

						<KbdDemo />

						<LabelDemo />

						<MenubarDemo />

						<NativeSelectDemo />
						<NavigationMenuDemo />

						<PaginationDemo />
						<PopoverDemo />
						<ProgressDemo />

						<RadioGroupDemo />
						<ResizableDemo />

						<ScrollAreaDemo />
						<SelectDemo />
						<SeparatorDemo />
						<SheetDemo />
						{/* sidebar */}
						<SkeletonDemo />
						<SliderDemo />
						<SonnerDemo />
						<SpinnerDemo />
						<SwitchDemo />

						<TableDemo />
						<TabsDemo />
						<TextareaDemo />
						<ToggleDemo />
						<ToggleGroupDemo />
						<TooltipDemo />
					</main>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
