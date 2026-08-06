"use client";

import { useEditorEffect } from "./effect/use-editor-effect";
import { useEditorHandler } from "./handler/use-editor-handler";
import { useEditorState } from "./state/use-editor-state";

type UseEditorParams = {
  initialHtml: string;
  initialData?: Record<string, unknown>;
};

export function useEditor({ initialHtml, initialData }: UseEditorParams) {
  const state = useEditorState({ initialHtml, initialData });

  useEditorEffect({
    htmlSource: state.htmlSource,
    dataObj: state.dataObj,
    setRenderedHtml: state.setRenderedHtml,
    setHtmlSource: state.setHtmlSource,
    setJsonData: state.setJsonData,
    selectedCategory: state.selectedCategory,
  });

  const handler = useEditorHandler({
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory,
    setHtmlSource: state.setHtmlSource,
    setJsonData: state.setJsonData,
    setPreviewKey: state.setPreviewKey,
    renderedHtml: state.renderedHtml,
  });

  return {
    selectedCategory: state.selectedCategory,
    renderedHtml: state.renderedHtml,
    previewKey: state.previewKey,
    iframeRef: state.iframeRef,
    eventTypeOptions: state.eventTypeOptions,
    selectCategory: handler.selectCategory,
    downloadHtml: handler.downloadHtml,
  };
}

export type UseEditorReturn = ReturnType<typeof useEditor>;
