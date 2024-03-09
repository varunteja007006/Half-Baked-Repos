import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "./styles/index.css";
import React from "react";
import { PiCaretDownDuotone } from "react-icons/pi";

const ListItem = ({ children, title, href }) => {
  return (
    <>
      <a href={href} style={{ textDecoration: "none" }} className="content-bg">
        <div>
          <div className="ListItemHeading">{title}</div>
          <div className="ListItemText">{children}</div>
        </div>
      </a>
    </>
  );
};

function Navigation() {
  return (
    <nav className="navbar">
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item className="remove-marker">
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Learn <PiCaretDownDuotone className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent ">
              <ul
                className="List one "
                style={{ paddingLeft: 0, marginLeft: 0 }}
              >
                <div className="content-bg">
                  <ListItem href="https://stitches.dev/" title="Stitches">
                    CSS-in-JS with best-in-class developer experience.
                  </ListItem>
                  <ListItem href="/colors" title="Colors">
                    Beautiful, thought-out palettes with auto dark mode.
                  </ListItem>
                  <ListItem href="https://icons.radix-ui.com/" title="Icons">
                    A crisp set of 15x15 icons, balanced and consistent.
                  </ListItem>
                </div>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </nav>
  );
}

export default Navigation;
