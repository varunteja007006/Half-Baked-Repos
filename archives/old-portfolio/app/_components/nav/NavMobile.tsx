import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { projects } from "@/app/react-projects/projects_data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export default function NavMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex lg:hidden"
          variant={"outline"}
          size={"icon"}
          aria-label="Menu"
        >
          <GiHamburgerMenu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 items-start">
          <ScrollArea className="h-[calc(100vh-10rem)] w-full mb-2">
            <ul className="grid gap-3 pl-0 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem
                key={"React"}
                title={"React"}
                href={`/react`}
              >{`Learn about react hooks`}</ListItem>
              <ListItem
                key={"Problems"}
                title={"Problems"}
                href="/react-problems"
              >{`React related problems to solve`}</ListItem>
              {projects.map((project) => (
                <ListItem
                  key={project.title}
                  title={project.title}
                  href={project.href}
                >
                  {project.description}
                </ListItem>
              ))}
            </ul>
          </ScrollArea>
          <div className="flex justify-end w-full">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
