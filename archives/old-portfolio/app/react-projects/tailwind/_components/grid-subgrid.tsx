import Image from "next/image";

export default function TailwindGridSubgrid() {
  return (
    <div>
      <h1 className="mb-3 text-2xl">Tailwind Subgrid</h1>
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="grid content-between p-4 space-y-4 bg-red-500">
          <InnerContent
            text={
              "For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween."
            }
          />
        </div>
        <div className="grid content-between p-4 space-y-4 bg-blue-500">
          <InnerContent
            text={
              "Quis tempor ex mollit anim. Duis nulla velit aliquip excepteur esse et laboris velit. Tempor elit qui magna do exercitation excepteur veniam. Occaecat laborum commodo elit sunt. Deserunt elit voluptate laborum occaecat aute consequat aliquip do dolore."
            }
          />
        </div>
        <div className="grid content-between p-4 space-y-4 bg-green-500">
          <InnerContent
            text={`Labore cillum culpa veniam qui officia cillum nulla mollit sunt ipsum Lorem. Adipisicing aliqua qui ullamco ipsum fugiat laboris cupidatat velit. Laboris consequat ad culpa elit est qui enim ex eiusmod adipisicing amet ipsum ex laborum. Adipisicing et aliqua ad enim fugiat pariatur quis occaecat aliqua consequat. Tempor esse elit sit nostrud cupidatat.
              Duis ullamco aliquip adipisicing cupidatat laborum minim excepteur minim enim nostrud elit qui. Cupidatat laborum irure excepteur laborum. Ullamco velit consectetur officia exercitation minim laboris pariatur adipisicing ea exercitation. Minim laborum ex irure veniam nisi ea veniam excepteur culpa quis id tempor.
              Enim ullamco tempor Lorem in labore ad ex quis deserunt in deserunt proident velit. Lorem velit fugiat voluptate voluptate id ea. Deserunt sunt in ea adipisicing enim deserunt laboris mollit commodo anim. Eu mollit consequat laborum elit eiusmod ex labore ipsum. Consectetur irure incididunt nulla excepteur pariatur culpa irure nulla nostrud irure id. Amet id aute tempor et aliquip culpa aliqua ut commodo ut et irure veniam.`}
          />
        </div>
        <div className="grid content-between p-4 space-y-4 bg-yellow-500">
          <InnerContent
            text={
              "In Lorem ullamco ullamco velit esse commodo cupidatat aliqua proident quis."
            }
          />
        </div>
      </div>
    </div>
  );
}

const InnerContent = ({ text }: { text?: string }) => {
  return (
    <>
      <div className="overflow-hidden text-center max-h-fit">
        <p className="text-lg font-semibold">Sun flower</p>
        <p className=" line-clamp-6 text-ellipsis">{text}</p>
      </div>
      <div>
        <Image
          src="https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image-1"
          width={100}
          height={50}
          className="w-full object-fit"
          unoptimized={true}
        />
      </div>
    </>
  );
};
