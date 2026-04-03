import { Metadata } from 'next';
import { EmailTemplateEditor } from '@/components/app/dashboard/template-email';
import { DEFAULT_WEDDING_TEMPLATE_HTML, DEFAULT_WEDDING_DATA } from '@/constants/template/email';

export const metadata: Metadata = {
    title: 'Editor de plantilla de email',
};

const defaultTemplate = DEFAULT_WEDDING_TEMPLATE_HTML;

export default function Page() {
    return (
        <div style={{ padding: 16 }}>
            <EmailTemplateEditor initialHtml={defaultTemplate} initialData={DEFAULT_WEDDING_DATA} />
        </div>
    );
}

