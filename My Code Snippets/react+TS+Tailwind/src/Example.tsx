const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
  },
];

export default function Example() {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-white dark:text-white p-2 m-2">
      {people.map((person) => (
        <li key={person.email} className="py-4 flex">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900  dark:text-white">
              {person.name}
            </p>
            <p className="text-sm text-gray-500  dark:text-gray-300">
              {person.email}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
