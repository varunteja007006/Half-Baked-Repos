import React, { useState } from "react";
import "./navbar.css";

const menuItems = [
  {
    label: "Home",
    link: "#",
  },
  {
    label: "About Us",
    link: "#",
  },
  {
    label: "Services",
    link: "#",
    children: [
      {
        label: "Web Development",
        link: "#",
        children: [
          { label: "React Development", link: "#" },
          { label: "Vue Development", link: "#" },
        ],
      },
      { label: "SEO Optimization", link: "#" },
      {
        label: "Marketing",
        link: "#",
        children: [
          { label: "Content Marketing", link: "#" },
          { label: "Email Marketing", link: "#" },
          {
            label: "Social Media Marketing",
            link: "#",
          },
        ],
      },
    ],
  },
  {
    label: "Blog",
    link: "/blog",
    children: [
      { label: "Tech Articles", link: "#" },
      { label: "Business Tips", link: "#" },
      { label: "Case Studies", link: "#" },
    ],
  },
  {
    label: "Support",
    link: "#",
    children: [
      { label: "Technical Support", link: "#" },
      { label: "Billing Support", link: "#" },
      { label: "Account Management", link: "#" },
    ],
  },
  {
    label: "Contact",
    link: "#",
  },
  {
    label: "Careers",
    link: "#",
  },
  {
    label: "FAQs",
    link: "#",
  },
];

const DropdownMenu = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  return (
    <ul className="menu">
      {items.map((item, index) => (
        <li
          key={item.label}
          className="menu-item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <a href={item.link}>{item.label}</a>
          {item.children && activeIndex === index && (
            <DropdownMenu items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Navbar() {
  return (
    <nav className="navigation-wrapper">
      <h1>Navigation Menu</h1>
      <div>
        <DropdownMenu items={menuItems} />
      </div>
    </nav>
  );
}
