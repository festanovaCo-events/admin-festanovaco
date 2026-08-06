import type { Metadata } from "next";
import { DEFAULT_WEDDING_DATA, DEFAULT_WEDDING_TEMPLATE_HTML } from "@/constants/template/email/default";
import TemplateEmailClient from "@/features/template-email/editor/components/template-email-client";

export const metadata: Metadata = {
  title: "Editor de plantilla de email",
};

export default function Page() {
  return (
    <div style={{ padding: 16 }}>
      <TemplateEmailClient
        initialHtml={DEFAULT_WEDDING_TEMPLATE_HTML}
        initialData={DEFAULT_WEDDING_DATA}
      />
    </div>
  );
}
