import { useState } from "react";
import { CodeBlock } from "../component/main";
import MenuCard from "../component/menu/MenuCard";
import menuData from "../data/menuData";
const allCategories = [
  "all",
  ...new Set(menuData.map((item) => item.category)),
];

function Menu() {
  const [menuItems, setMenuItems] = useState(menuData);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(menuData);
      return;
    }
    const newMenuItems = menuData.filter((item) => category === item.category);
    setMenuItems(newMenuItems);
  };

  return (
    <CodeBlock heading={"Snack's Menu"}>
      <div className="flex flex-wrap">
        {categories.map((item) => {
          return (
            <button
              key={item}
              onClick={() => filterItems(item)}
              className="btn bg-fuchsia-400 hover:bg-fuchsia-500 me-2"
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex items-start flex-wrap mt-5 justify-between gap-5">
        {menuItems.map((item) => {
          return <MenuCard key={item.id} item={item} />;
        })}
      </div>
    </CodeBlock>
  );
}

export default Menu;
