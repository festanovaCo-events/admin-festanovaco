"use client";

import { useMemo, useRef, useState } from "react";
import { EVENT_TYPE_OPTIONS } from "@/constants/types";

type UseEditorStateParams = {
  initialHtml: string;
  initialData?: Record<string, unknown>;
};

export function useEditorState({
  initialHtml,
  initialData,
}: UseEditorStateParams) {
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

  return {
    selectedCategory,
    setSelectedCategory,
    htmlSource,
    setHtmlSource,
    jsonData,
    setJsonData,
    renderedHtml,
    setRenderedHtml,
    previewKey,
    setPreviewKey,
    iframeRef,
    dataObj,
    eventTypeOptions: EVENT_TYPE_OPTIONS,
  };
}

export type EditorState = ReturnType<typeof useEditorState>;
