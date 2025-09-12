"use client";

import * as React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { projects } from "../../react-projects/projects_data";
import { ThemeToggle } from "@/components/theme-toggle";
import NavMobile from "./NavMobile";
import { Badge } from "@/components/ui/badge";
import Icon from "./Icon";

import { motion } from "framer-motion";

const variants = {
  hidden: {
    translateY: -100,
  },
  visible: {
    translateY: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const MotionDivWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  );
};

function Navbar() {
  return (
    <>
      <nav className="fixed z-[2] flex flex-row items-center justify-between min-w-[100vw] p-3 dark:bg-black/100 bg-white/70">
        <div className="ml-3 font-bold">
          <Icon />
        </div>
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="gap-2">
            <MotionDivWrapper>
              <NavigationMenuItem>
                <Link href="/react" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    React
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </MotionDivWrapper>
            <MotionDivWrapper>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ScrollArea className="h-[300px]">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {projects.map((project) => (
                        <span
                          key={project.title}
                          className="flex flex-col hover:border hover:border-blue-200 dark:hover:border-purple-600 border border-transparent"
                        >
                          <ListItemLink
                            title={project.title}
                            href={project.href}
                          >
                            {project.description}
                          </ListItemLink>
                          <span className="flex items-center p-2.5 pt-0">
                            {project.isNew && (
                              <Badge variant="success">New</Badge>
                            )}
                            {project.inProgress && (
                              <Badge variant="warning">In Progress</Badge>
                            )}
                          </span>
                        </span>
                      ))}
                    </ul>
                  </ScrollArea>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </MotionDivWrapper>
            <MotionDivWrapper>
              <NavigationMenuItem>
                <Link href="/react-problems" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Problems
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </MotionDivWrapper>
            <MotionDivWrapper>
              <NavigationMenuItem>
                <ThemeToggle />
              </NavigationMenuItem>
            </MotionDivWrapper>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <NavMobile />
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-full",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const ListItemLink = ({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-full",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItemLink.displayName = "ListItemLink";
