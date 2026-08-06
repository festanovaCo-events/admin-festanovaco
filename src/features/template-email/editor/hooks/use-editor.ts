"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EVENT_TYPE_OPTIONS } from "@/constants/types";
import { renderTemplate } from "@/shared/lib/utils/templateRenderer";
import { pickTemplateByCategory } from "./data/templates";

type UseEditorParams = {
  initialHtml: string;
  initialData?: Record<string, unknown>;
};

export function useEditor({ initialHtml, initialData }: UseEditorParams) {
  const [selectedCategory, setSelectedCategory] = useState<string>("boda");
  const [htmlSource, setHtmlSource] = useState<string>(initialHtml);
  const [jsonData, setJsonData] = useState<string>(
    JSON.stringify(
      initialData ?? {
        WifeName: "Isabella",
        HusbandName: "Alessandro",
        AcceptURL: "https://ejemplo.com/confirmar",
      },
      null,
      2,
    ),
  );
  const [renderedHtml, setRenderedHtml] = useState<string>("");
  const [previewKey, setPreviewKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const dataObj = useMemo(() => {
    try {
      return JSON.parse(jsonData || "{}") as Record<string, unknown>;
    } catch {
      return {};
    }
  }, [jsonData]);

  useEffect(() => {
    const { html, data } = pickTemplateByCategory(selectedCategory);
    setHtmlSource(html);
    setJsonData(JSON.stringify(data, null, 2));
  }, [selectedCategory]);

  useEffect(() => {
    setRenderedHtml(renderTemplate(htmlSource, dataObj));
  }, [htmlSource, dataObj]);

  const selectCategory = (category: string) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setPreviewKey((k) => k + 1);
  };

  const downloadHtml = () => {
    try {
      const blob = new Blob([renderedHtml], {
        type: "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const label =
        EVENT_TYPE_OPTIONS.find((o) => o.value === selectedCategory)?.label ??
        "template";
      a.href = url;
      a.download = `${label.toLowerCase().replace(/\s+/g, "-")}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // ignore download errors
    }
  };

  return {
    selectedCategory,
    renderedHtml,
    previewKey,
    iframeRef,
    eventTypeOptions: EVENT_TYPE_OPTIONS,
    selectCategory,
    downloadHtml,
  };
}

export type UseEditorReturn = ReturnType<typeof useEditor>;
