import { getImageUrl } from "./api";

const YOUTUBE_REGEX =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|\&v=)([^#\&\?]*).*/i;

type VideoPlatform =
  | "youtube"
  | "facebook"
  | "instagram"
  | "direct"
  | "external";

export function getYoutubeId(url: string) {
  if (!url) return null;
  const match = url.match(YOUTUBE_REGEX);
  return match && match[2]?.length === 11 ? match[2] : null;
}

export function getInstagramPath(url: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (!host.includes("instagram.com")) return null;

    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return null;

    let type = segments[0]?.toLowerCase();
    let id = segments[1];

    if (type === "share" && segments.length >= 3) {
      type = segments[1]?.toLowerCase();
      id = segments[2];
    }

    if (type === "reels") type = "reel";

    if (!id) return null;
    if (!["reel", "p", "tv"].includes(type)) return null;

    return { type, id };
  } catch {
    return null;
  }
}

function isInstagramUrl(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().includes("instagram.com");
  } catch {
    return false;
  }
}

function getInstagramEmbedFallback(url: string) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.toLowerCase().includes("instagram.com")) return null;

    const normalizedPath = parsed.pathname.endsWith("/")
      ? parsed.pathname
      : `${parsed.pathname}/`;

    return `https://www.instagram.com${normalizedPath}embed/captioned/`;
  } catch {
    return null;
  }
}

export function isDirectVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

export function getVideoPlatform(url: string): VideoPlatform {
  if (getYoutubeId(url)) return "youtube";
  if (/facebook\.com|fb\.watch/i.test(url)) return "facebook";
  if (getInstagramPath(url) || isInstagramUrl(url)) return "instagram";
  if (isDirectVideoUrl(url)) return "direct";
  return "external";
}

export function getVideoEmbedUrl(url: string) {
  const youtubeId = getYoutubeId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  }

  const instagram = getInstagramPath(url);
  if (instagram) {
    return `https://www.instagram.com/${instagram.type}/${instagram.id}/embed/captioned/`;
  }

  const instagramFallback = getInstagramEmbedFallback(url);
  if (instagramFallback) return instagramFallback;

  if (/facebook\.com|fb\.watch/i.test(url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`;
  }

  return null;
}

export function isFacebookReel(url: string) {
  return /facebook\.com\/reel\//i.test(url) || /fb\.watch/i.test(url);
}

export function getPatientStoryModalLayout(url: string) {
  const platform = getVideoPlatform(url);

  // Vertical portrait layout — Instagram (9:16)
  if (platform === "instagram") {
    return {
      shellClassName: "max-w-[430px]",
      shellSurfaceClassName:
        "bg-[#0f1419] shadow-none overflow-hidden border border-white/10",
      frameClassName: "w-full h-[80vh] max-h-[820px] min-h-[560px]",
      frameWrapperClassName: "mx-auto bg-[#0f1419] overflow-hidden",
      iframeClassName: "w-full h-full border-0",
      useAbsoluteIframe: false,
    };
  }

  // Facebook Reel — portrait 9:16 container
  if (platform === "facebook" && isFacebookReel(url)) {
    return {
      shellClassName: "max-w-[380px]",
      shellSurfaceClassName: "bg-black overflow-hidden shadow-2xl",
      frameClassName: "aspect-[9/16]",
      frameWrapperClassName: "",
      iframeClassName: "absolute inset-0 w-full h-full border-0",
      useAbsoluteIframe: true,
    };
  }

  // Landscape layout — Facebook regular videos & YouTube (16:9)
  return {
    shellClassName: "max-w-5xl",
    shellSurfaceClassName: "bg-black overflow-hidden shadow-2xl",
    frameClassName: "aspect-video",
    frameWrapperClassName: "",
    iframeClassName: "absolute inset-0 w-full h-full",
    useAbsoluteIframe: true,
  };
}

export function getStoryThumbnailUrl(
  thumbnailUrl?: string,
  videoUrl?: string,
  absolute = false,
) {
  if (thumbnailUrl) return getImageUrl(thumbnailUrl, absolute);

  const youtubeId = videoUrl ? getYoutubeId(videoUrl) : null;
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return "/images/news-sm-inner.jpg";
}

export function getHomeStoryThumbnailUrl(
  homeThumbnailUrl?: string,
  videoUrl?: string,
  absolute = false,
) {
  return getStoryThumbnailUrl(homeThumbnailUrl, videoUrl, absolute);
}

export function getPatientStoryLabel(index: number) {
  return `Patient Story ${index + 1}`;
}
