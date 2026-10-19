import siteConfig from "@/data/site-config";

const CRLF = "\r\n";

export function buildVCard(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "PRODID:-//nhutdm.com//Digital Card//EN",
    "N:Duong;Nhut;;;",
    "FN:Nhut Duong",
    "TITLE:Full Stack Developer & Consultant",
    "ORG:Bosch Digital",
    "EMAIL;TYPE=INTERNET,PREF:hello@nhutduong.com",
    ...(siteConfig.phone ? [`TEL;TYPE=CELL,VOICE:${siteConfig.phone}`] : []),
    "URL:https://nhutdm.com",
    "URL:https://nhutduong.com",
    "X-SOCIALPROFILE;TYPE=x:https://x.com/nhutdm",
    "X-SOCIALPROFILE;TYPE=github:https://github.com/nhutdm",
    "X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/nhutdm",
    "ADR;TYPE=WORK:;;;;Ho Chi Minh City;;Vietnam",
    "END:VCARD",
  ];
  return `${lines.join(CRLF)}${CRLF}`;
}
