import { EMAIL_TEMPLATES } from "@/constants/template/email/catalog";

type Theme = {
  body: string;
  header: string;
  rsvp: string;
  line: string;
  btn: string;
};

const THEMES: Record<string, Theme> = {
  boda: {
    body: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    header: "linear-gradient(135deg,#2c3e50 0%,#34495e 100%)",
    rsvp: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    line: "linear-gradient(90deg,#667eea,#764ba2)",
    btn: "#667eea",
  },
  cumpleanos: {
    body: "linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)",
    header: "linear-gradient(135deg,#ff7aa2 0%,#ffb0d6 100%)",
    rsvp: "linear-gradient(135deg,#ff7aa2 0%,#ffb0d6 100%)",
    line: "linear-gradient(90deg,#ff7aa2,#ffb0d6)",
    btn: "#be185d",
  },
  aniversario: {
    body: "linear-gradient(135deg,#FDBA74 0%,#F59E0B 100%)",
    header: "linear-gradient(135deg,#b7791f 0%,#92400e 100%)",
    rsvp: "linear-gradient(135deg,#F59E0B 0%,#FBBF24 100%)",
    line: "linear-gradient(90deg,#D97706,#F59E0B)",
    btn: "#1D4ED8",
  },
  graduacion: {
    body: "linear-gradient(135deg,#ECFDF5 0%,#D1FAE5 100%)",
    header: "linear-gradient(135deg,#065F46 0%,#064E3B 100%)",
    rsvp: "linear-gradient(135deg,#059669 0%,#34D399 100%)",
    line: "linear-gradient(90deg,#10B981,#34D399)",
    btn: "#065F46",
  },
  corporativo: {
    body: "linear-gradient(135deg,#F3F4F6 0%,#E5E7EB 100%)",
    header: "linear-gradient(135deg,#111827 0%,#374151 100%)",
    rsvp: "linear-gradient(135deg,#334155 0%,#1F2937 100%)",
    line: "linear-gradient(90deg,#6B7280,#374151)",
    btn: "#111827",
  },
};

export function applyTheme(html: string, category: string): string {
  const t = THEMES[category] ?? THEMES.boda;
  const rsvpGradient = t.rsvp || t.body;
  return html
    .replace(/__BODY_GRADIENT__/g, t.body)
    .replace(/__HEADER_GRADIENT__/g, t.header)
    .replace(/__RSVP_GRADIENT__/g, rsvpGradient)
    .replace(/__LINE_GRADIENT__/g, t.line)
    .replace(/__BTN_COLOR__/g, t.btn);
}

export function pickTemplateByCategory(category: string): {
  html: string;
  data: Record<string, unknown>;
} {
  let tplId = "wedding-elegant";
  if (category === "cumpleanos") tplId = "birthday-elegant";
  else if (category === "corporativo") tplId = "corporate-elegant";
  else if (category === "aniversario") tplId = "wedding-elegant";
  else if (category === "graduacion") tplId = "corporate-elegant";
  const tpl = EMAIL_TEMPLATES.find((t) => t.id === tplId) ?? EMAIL_TEMPLATES[0];
  return { html: applyTheme(tpl.html, category), data: tpl.defaultData };
}
