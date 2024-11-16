import React, { useState } from "react";
import "./navbar.css";

const menuItems = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "/about",
  },
  {
    label: "Services",
    link: "/services",
    children: [
      { label: "Web Development", link: "/services/web-development" },
      { label: "SEO Optimization", link: "/services/seo" },
      {
        label: "Marketing",
        link: "/services/marketing",
        children: [
          { label: "Content Marketing", link: "/services/marketing/content" },
          { label: "Email Marketing", link: "/services/marketing/email" },
          {
            label: "Social Media Marketing",
            link: "/services/marketing/social",
          },
        ],
      },
    ],
  },
  {
    label: "Blog",
    link: "/blog",
    children: [
      { label: "Tech Articles", link: "/blog/tech" },
      { label: "Business Tips", link: "/blog/business" },
      { label: "Case Studies", link: "/blog/case-studies" },
    ],
  },
  {
    label: "Contact",
    link: "/contact",
  },
  {
    label: "Careers",
    link: "/careers",
  },
  {
    label: "FAQs",
    link: "/faqs",
  },
  {
    label: "Support",
    link: "/support",
    children: [
      { label: "Technical Support", link: "/support/technical" },
      { label: "Billing Support", link: "/support/billing" },
      { label: "Account Management", link: "/support/account" },
    ],
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
