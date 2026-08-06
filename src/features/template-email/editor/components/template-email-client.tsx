"use client";

import { EmailTemplateEditor } from "@/features/template-email/editor/components/email-template-editor";
import { useEditor } from "@/features/template-email/editor/hooks/use-editor";

type TemplateEmailClientProps = {
  initialHtml: string;
  initialData?: Record<string, unknown>;
};

export default function TemplateEmailClient({
  initialHtml,
  initialData,
}: TemplateEmailClientProps) {
  const props = useEditor({ initialHtml, initialData });
  return <EmailTemplateEditor {...props} />;
}
