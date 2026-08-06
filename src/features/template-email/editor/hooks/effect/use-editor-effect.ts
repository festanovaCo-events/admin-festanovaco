"use client";

import { useEffect } from "react";
import { renderTemplate } from "@/shared/lib/utils/templateRenderer";
import { pickTemplateByCategory } from "../data/templates";
import type { EditorState } from "../state/use-editor-state";

type UseEditorEffectParams = Pick<
  EditorState,
  | "htmlSource"
  | "dataObj"
  | "setRenderedHtml"
  | "setHtmlSource"
  | "setJsonData"
  | "selectedCategory"
>;

export function useEditorEffect({
  htmlSource,
  dataObj,
  setRenderedHtml,
  setHtmlSource,
  setJsonData,
  selectedCategory,
}: UseEditorEffectParams) {
  useEffect(() => {
    const out = renderTemplate(htmlSource, dataObj);
    setRenderedHtml(out);
  }, [htmlSource, dataObj, setRenderedHtml]);

  useEffect(() => {
    const { html, data } = pickTemplateByCategory(selectedCategory);
    setHtmlSource(html);
    setJsonData(JSON.stringify(data, null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only init matching prior behavior
  }, [selectedCategory, setHtmlSource, setJsonData]);
}
