import { getImageUrl } from "./api";

const YOUTUBE_REGEX =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/|\&v=)([^#\&\?]*).*/i;

type VideoPlatform = "youtube" | "facebook" | "instagram" | "direct" | "external";

export function getYoutubeId(url: string) {
  if (!url) return null;
  const match = url.match(YOUTUBE_REGEX);
  return match && match[2]?.length === 11 ? match[2] : null;
}

export function getInstagramPath(url: string) {
  const match = url.match(/instagram\.com\/(reel|p|tv)\/([^/?#]+)/i);
  if (!match) return null;
  return { type: match[1], id: match[2] };
}

export function isDirectVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

export function getVideoPlatform(url: string): VideoPlatform {
  if (getYoutubeId(url)) return "youtube";
  if (/facebook\.com|fb\.watch/i.test(url)) return "facebook";
  if (getInstagramPath(url)) return "instagram";
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
    return `https://www.instagram.com/${instagram.type}/${instagram.id}/embed/?autoplay=1`;
  }

  if (/facebook\.com|fb\.watch/i.test(url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`;
  }

  return null;
}

export function getPatientStoryModalLayout(url: string) {
  const platform = getVideoPlatform(url);

  if (platform === "instagram") {
    return {
      shellClassName: "max-w-[760px]",
      shellSurfaceClassName: "bg-[#0f1419] shadow-none overflow-hidden border border-white/10",
      frameClassName:
        "w-full max-w-[740px] h-[640px] max-h-[82vh]",
      frameWrapperClassName:
        "mx-auto bg-[#0f1419] overflow-hidden",
      iframeClassName: "w-full h-full border-0",
      useAbsoluteIframe: false,
    };
  }

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
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return "/images/news-sm-inner.jpg";
}

export function getPatientStoryLabel(index: number) {
  return `Patient Story ${index + 1}`;
}
