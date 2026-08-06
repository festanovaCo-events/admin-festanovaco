"use client";

import { EVENT_TYPE_OPTIONS } from "@/constants/types";
import { pickTemplateByCategory } from "../data/templates";
import type { EditorState } from "../state/use-editor-state";

type UseEditorHandlerParams = Pick<
  EditorState,
  | "selectedCategory"
  | "setSelectedCategory"
  | "setHtmlSource"
  | "setJsonData"
  | "setPreviewKey"
  | "renderedHtml"
>;

export function useEditorHandler({
  selectedCategory,
  setSelectedCategory,
  setHtmlSource,
  setJsonData,
  setPreviewKey,
  renderedHtml,
}: UseEditorHandlerParams) {
  const selectCategory = (category: string) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    const { html, data } = pickTemplateByCategory(category);
    setHtmlSource(html);
    setJsonData(JSON.stringify(data, null, 2));
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

  return { selectCategory, downloadHtml };
}
