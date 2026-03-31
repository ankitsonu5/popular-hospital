"use client";

import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEEditor(props: any) {
  return (
    <Editor
      apiKey="is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl"
      cloudChannel="6"
      {...props}
    />
  );
}
