"use client";

// Editable content primitives used by the admin "Page Content" manager.
//
//   <T k="about_ab12cd" d="Original text" />     -> renders admin override if set, else the original text
//   <CImage k="..." src="/images/x.png" ... />   -> next/image whose src can be replaced from admin
//   <CImg   k="..." src="/images/x.png" ... />   -> <img>   whose src can be replaced from admin
//
// Every default is the exact text/src that used to be hard-coded, so nothing changes
// until an admin saves a different value. These wrappers are generated/maintained by
// `npm run scan:content` (scripts/scan-content.mjs).

import Image from "next/image";
import { createContext, useContext } from "react";

type Overrides = Record<string, string>;

const ContentContext = createContext<Overrides>({});

export function ContentProvider({
  overrides,
  children,
}: {
  overrides: Overrides;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={overrides}>{children}</ContentContext.Provider>
  );
}

function useOverride(k: string): string | undefined {
  const v = useContext(ContentContext)[k];
  return typeof v === "string" && v !== "" ? v : undefined;
}

export function T({ k, d }: { k: string; d: string }) {
  const override = useOverride(k);
  return <>{override ?? d}</>;
}

type CImageProps = React.ComponentProps<typeof Image> & { k: string };

export function CImage({ k, src, unoptimized, ...rest }: CImageProps) {
  const override = useOverride(k);
  if (override) {
    // Uploaded / external replacement: skip the optimizer so any URL works.
    return <Image {...rest} src={override} unoptimized />;
  }
  return <Image {...rest} src={src} unoptimized={unoptimized} />;
}

type CImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  k: string;
  src: string;
};

export function CImg({ k, src, ...rest }: CImgProps) {
  const override = useOverride(k);
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...rest} src={override ?? src} />;
}
