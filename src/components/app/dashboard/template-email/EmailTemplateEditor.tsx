'use client';

import { useEmailTemplatePreview } from '@/hooks/use-email-template-preview';
import type { EmailTemplateEditorProps } from '@/interfaces/components/app/email/EmailTemplateEditor/EmailTemplateEditor.interface';
import { Download } from 'lucide-react';

export default function EmailTemplateEditor({ initialHtml, initialData }: EmailTemplateEditorProps) {
    const { state, actions, helpers } = useEmailTemplatePreview({ initialHtml, initialData });
    const { selectedCategory, renderedHtml, previewKey, iframeRef } = state;
    const { selectCategory, downloadHtml } = actions;
    const { eventTypeOptions } = helpers;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 12,
                        width: '100%',
                    }}
                >
                    {eventTypeOptions.map((opt) => {
                        const isActive = selectedCategory === opt.value;
                        return (
                            <button
                                key={opt.value}
                                onClick={() => selectCategory(opt.value)}
                                style={{
                                    textAlign: 'left',
                                    padding: 16,
                                    borderRadius: 12,
                                    border: '1px solid ' + (isActive ? '#10b981' : '#e5e7eb'),
                                    background: isActive ? 'rgba(16,185,129,0.06)' : '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    cursor: 'pointer',
                                }}
                            >
                                <span
                                    aria-hidden
                                    style={{
                                        width: 42,
                                        height: 28,
                                        borderRadius: 9999,
                                        background:
                                            'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.02) 100%)',
                                        filter: 'blur(2px)',
                                        display: 'inline-block',
                                    }}
                                    title="Previsualizar"
                                />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong style={{ fontSize: 14 }}>{opt.label}</strong>
                                    <span style={{ fontSize: 12, color: '#6b7280' }}>
                                        Toque para previsualizar plantilla
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <h3 style={{ margin: 0 }}>
                        Previsualización — {eventTypeOptions.find((o) => o.value === selectedCategory)?.label}
                    </h3>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button
                            onClick={downloadHtml}
                            style={{
                                padding: '8px 12px',
                                borderRadius: 8,
                                border: '1px solid #e5e7eb',
                                background: '#fff',
                                cursor: 'pointer',
                            }}
                            title="Descargar HTML"
                            aria-label="Descargar HTML"
                        >
                            <Download size={18} />
                        </button>
                        <span style={{ color: '#6b7280', fontSize: 12 }}>Vista aislada</span>
                    </div>
                </div>
                <iframe
                    key={previewKey}
                    ref={iframeRef}
                    style={{
                        width: '100%',
                        height: 900,
                        border: '1px solid #e5e7eb',
                        borderRadius: 10,
                        display: 'block',
                        margin: '0 auto',
                        background: '#ffffff',
                    }}
                    sandbox="allow-same-origin"
                    srcDoc={renderedHtml}
                />
            </div>
        </div>
    );
}

