export type Image = {
  src: string;
  alt?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type SocialLink = Link;

export type QuickLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  title: string;
  titleSeparator: string;
  description: string;
  author: string;
  twitter: string;
  email: string;
  phone?: string;
  siteUrl: string;
  image?: Image;
  socialLinks?: SocialLink[];
};

const siteUrl = (import.meta.env.SITE ?? "https://nhutdm.com").replace(
  /\/$/,
  "",
);

const siteConfig: SiteConfig = {
  title: "Nhut Duong",
  titleSeparator: "|",
  description:
    "Digital business card of Nhut Duong — full stack developer & technical consultant at Bosch Digital, Ho Chi Minh City. Call, email, or save the contact instantly.",
  author: "Nhut Duong",
  twitter: "@nhutdm",
  email: "hello@nhutduong.com",
  phone: "+84876778159",
  siteUrl,
  image: {
    src: "/og/default.png",
    alt: "Nhut Duong — Full Stack Developer & Consultant",
  },
  socialLinks: [
    {
      text: "X",
      href: "https://x.com/nhutdm",
    },
    {
      text: "GitHub",
      href: "https://github.com/nhutdm",
    },
    {
      text: "LinkedIn",
      href: "https://linkedin.com/in/nhutdm",
    },
  ],
};

export default siteConfig;

export const quickLinks: QuickLink[] = [
  ...(siteConfig.phone
    ? [{ label: "Call", href: `tel:${siteConfig.phone}` }]
    : []),
  { label: "Email", href: `mailto:${siteConfig.email}` },
];
