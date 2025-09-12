import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TMenuData } from "./menu-data";
import { Badge } from "@/components/ui/badge";

export default function MenuCard({ item }: Readonly<{ item: TMenuData }>) {
  const { title, category, price, img, desc } = { ...item };
  return (
    <Card className="grid items-start w-72">
      <figure>
        <img src={img} alt={title} className="w-72 h-56" />
      </figure>
      <div className="grid content-between ">
        <CardHeader>
          <CardTitle className="capitalize">{title}</CardTitle>
          <CardDescription className=" line-clamp-3 text-ellipsis">
            {desc}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div>{price}</div>
          <Badge variant={"outline"} className="ml-auto">
            {category}
          </Badge>
        </CardFooter>
      </div>
    </Card>
  );
}
