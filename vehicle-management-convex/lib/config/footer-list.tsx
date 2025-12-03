import { Mail, Phone, MapPin, Copyright } from "lucide-react";
import {
  BRAND_ADDRESS,
  BRAND_EMAIL,
  BRAND_FACEBOOK,
  BRAND_FOOTER,
  BRAND_GITHUB,
  BRAND_INSTAGRAM,
  BRAND_LINKEDIN,
  BRAND_PHONE,
  BRAND_PINTEREST,
  BRAND_REDDIT,
  BRAND_SNAPCHAT,
  BRAND_TIKTOK,
  BRAND_TWITTER,
  BRAND_YOUTUBE,
} from "@/lib/config/brand";

export const contactAndCopyrightInfo = [
  {
    icon: Mail,
    text: BRAND_EMAIL,
  },
  {
    icon: Phone,
    text: `Phone: ${BRAND_PHONE}`,
  },
  {
    icon: MapPin,
    text: `Address: ${BRAND_ADDRESS}`,
  },
  {
    icon: Copyright,
    text: BRAND_FOOTER,
  },
];

export const socialLinks = [
  {
    text: "Instagram",
    url: BRAND_INSTAGRAM,
  },
  {
    text: "Facebook",
    url: BRAND_FACEBOOK,
  },
  {
    text: "LinkedIn",
    url: BRAND_LINKEDIN,
  },
  {
    text: "Twitter",
    url: BRAND_TWITTER,
  },
  {
    text: "Reddit",
    url: BRAND_REDDIT,
  },
  {
    text: "Pinterest",
    url: BRAND_PINTEREST,
  },
  {
    text: "Snapchat",
    url: BRAND_SNAPCHAT,
  },
  {
    text: "TikTok",
    url: BRAND_TIKTOK,
  },
  {
    text: "YouTube",
    url: BRAND_YOUTUBE,
  },
  {
    text: "GitHub",
    url: BRAND_GITHUB,
  },
];

export const legalLinks = [
  {
    text: "Privacy Policy",
    url: "#",
  },
  {
    text: "Terms of Use",
    url: "#",
  },
  {
    text: "Legal Disclosure",
    url: "#",
  },
  {
    text: "Copyright",
    url: "#",
  },
  {
    text: "Trademark",
    url: "#",
  },
  {
    text: "Cookie Statement",
    url: "#",
  },
  {
    text: "Cookie Preferences",
    url: "#",
  },
];
