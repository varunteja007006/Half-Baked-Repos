import { contactAndCopyrightInfo, legalLinks, socialLinks } from "@/lib/config/footer-list";

export function Footer() {
  return (
    <div className="container px-10 py-18 mx-auto grid grid-cols-1 md:grid-cols-3 text-sm gap-8 text-center md:text-left justify-items-start">
      <div className="flex flex-col items-center md:items-start gap-4">
        <ul className="flex flex-col items-start gap-4">
          {contactAndCopyrightInfo.map((item) => (
            <li key={item.text} className="flex flex-row items-center gap-2">
              <item.icon className="size-4" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <ul className="flex flex-col items-start gap-2">
          {socialLinks.map((link) => {
            if (!link.url) {
              return null;
            }

            return (
              <li key={link.text}>
                <a
                  href={link.url}
                  className="hover:underline  transition-colors duration-200 flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{link.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col items-center md:items-start">
        <ul className="flex flex-col items-start gap-2">
          {legalLinks.map((link) => (
            <li key={link.text}>
              <a
                href={link.url}
                className="hover:underline  transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
