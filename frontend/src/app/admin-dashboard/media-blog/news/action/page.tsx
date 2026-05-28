"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Newspaper,
  Loader2,
  Save,
  X,
  ArrowLeft,
  Image as ImageIcon,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  PencilLine,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Editor = dynamic(() => import("@/components/TinyMCEEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[700px] animate-pulse bg-gray-100 rounded-xl" />
  ),
});
import { getImageUrl } from "@/lib/api";

const API_URL = "/api-backend";
const NEWS_IMAGE_UPLOAD_API = `${API_URL}/cms/news/image-upload-direct`;

type EditorDevice = "desktop" | "tablet" | "mobile";
type EditorMode = "edit" | "preview";

const editorDevices: {
  key: EditorDevice;
  label: string;
  width: string;
  icon: typeof Monitor;
}[] = [
  { key: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { key: "tablet", label: "Tablet", width: "768px", icon: Tablet },
  { key: "mobile", label: "Mobile", width: "390px", icon: Smartphone },
];

const editorHeights: Record<EditorDevice, number> = {
  desktop: 700,
  tablet: 650,
  mobile: 620,
};

const tinyContentStyle = `
  body {
    font-family: Inter, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.7;
    margin: 16px;
    color: #374151;
  }
  img, video, iframe {
    max-width: 100%;
    height: auto;
  }
  .responsive-image-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    clear: both;
    margin: 24px 0;
  }
  .responsive-image-grid > * {
    margin: 0;
  }
  .responsive-image-grid img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    margin: 0;
    border-radius: 12px;
  }
  table {
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #e5e7eb;
    padding: 10px;
  }
  .alignleft {
    float: left;
    margin: 8px 24px 16px 0;
  }
  .alignright {
    float: right;
    margin: 8px 0 16px 24px;
  }
  .aligncenter {
    display: block;
    margin: 16px auto;
  }
  @media (max-width: 1024px) {
    .responsive-image-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 600px) {
    body {
      font-size: 15px;
      margin: 12px;
    }
    .responsive-image-grid {
      grid-template-columns: 1fr;
    }
    img[style*="float"], .alignleft, .alignright {
      float: none !important;
      display: block;
      margin: 16px auto !important;
    }
    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
`;

function NewsActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    contentTablet: "",
    contentMobile: "",
    excerpt: "",
    image: "",
    date: "",
    dateIso: "",
    author: "",
    isActive: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    focusKeyword: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [keywordInput, setKeywordInput] = useState("");
  const [editorDevice, setEditorDevice] = useState<EditorDevice>("desktop");
  const [editorMode, setEditorMode] = useState<EditorMode>("edit");

  const addTag = (tag: string) => {
    const trimmed = tag.trim().replace(/,$/, "");
    if (!trimmed) return;
    const currentTags = formData.focusKeyword
      ? formData.focusKeyword.split(",").map((t) => t.trim())
      : [];
    if (!currentTags.includes(trimmed)) {
      const newTags = [...currentTags, trimmed].join(", ");
      setFormData({
        ...formData,
        focusKeyword: newTags,
        metaKeywords: newTags,
      });
    }
    setKeywordInput("");
  };

  const removeTag = (index: number) => {
    const currentTags = formData.focusKeyword.split(",").map((t) => t.trim());
    const newTags = currentTags.filter((_, i) => i !== index).join(", ");
    setFormData({ ...formData, focusKeyword: newTags, metaKeywords: newTags });
  };

  const uploadEditorImage = async (blobInfo: any) => {
    const fd = new FormData();
    fd.append("file", blobInfo.blob(), blobInfo.filename());

    const res = await fetch(NEWS_IMAGE_UPLOAD_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
      },
      body: fd,
    });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(json.error || "Image upload failed");
    }
    if (!json.location) {
      throw new Error("Upload response missing image location");
    }

    return json.location;
  };

  const getContentKey = (
    device: EditorDevice,
  ): "content" | "contentTablet" | "contentMobile" => {
    if (device === "tablet") return "contentTablet";
    if (device === "mobile") return "contentMobile";
    return "content";
  };

  const getContentForDevice = (device: EditorDevice) => {
    const key = getContentKey(device);
    if (key === "content") return formData.content;
    return formData[key] || formData.content;
  };

  const updateContentForDevice = (content: string) => {
    const key = getContentKey(editorDevice);
    setFormData({ ...formData, [key]: content });
  };

  const clearDeviceOverride = () => {
    const key = getContentKey(editorDevice);
    if (key === "content") return;
    setFormData({ ...formData, [key]: "" });
  };

  useEffect(() => {
    if (editId) {
      const fetchNews = async () => {
        try {
          const res = await fetch(`${API_URL}/cms/news`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
            },
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
              ...item,
              contentTablet: item.contentTablet || "",
              contentMobile: item.contentMobile || "",
              dateIso: item.date
                ? new Date(item.date).toISOString().split("T")[0]
                : "",
            });
            if (item.image) setImagePreview(getImageUrl(item.image));
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") submitData.append(key, String(value));
    });

    if (imageFile) {
      submitData.append("image", imageFile);
    }

    try {
      const url = editId
        ? `${API_URL}/cms/news/${editId}`
        : `${API_URL}/cms/news`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("admin_token")}`,
        },
        body: submitData,
      });

      if (!res.ok) throw new Error("Failed to save news article");

      alert(
        editId
          ? "Article updated successfully!"
          : "Article published successfully!",
      );
      if (window.opener || window.history.length === 1) window.close();
      router.push("/admin-dashboard/media-blog/news");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 font-sans">
      {/* ─── Header Section ─── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 xl:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => window.close()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                <Newspaper className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? "Edit News" : "Draft News"}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  Editor Panel • Popular Hospital
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.close()}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold text-sm disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{editId ? "Save Article" : "Publish Now"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Form Content ─── */}
      <div className="max-w-[1800px] mx-auto mt-8 px-4 sm:px-8 lg:px-12 xl:px-16">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Details Panel */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
                Article Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Headline *
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                    placeholder="Enter catchy headline..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Publish Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={formData.dateIso}
                      onChange={(e) => {
                        const iso = e.target.value;
                        if (!iso) return;
                        const dateObj = new Date(iso);
                        const formatted = dateObj.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        });
                        setFormData({
                          ...formData,
                          dateIso: iso,
                          date: formatted,
                        });
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Source / Author
                    </label>
                    <input
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900"
                      placeholder="e.g. Times of India"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Brief (Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 resize-none font-medium"
                    placeholder="A quick summary for the news listing..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Detailed Article Content *
                  </label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                    <div className="flex flex-col gap-3 border-b border-gray-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-1 sm:w-auto">
                        {editorDevices.map((device) => {
                          const Icon = device.icon;
                          const isActive = editorDevice === device.key;
                          return (
                            <button
                              key={device.key}
                              type="button"
                              title={device.label}
                              onClick={() => setEditorDevice(device.key)}
                              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-bold transition-colors sm:flex-none ${
                                isActive
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{device.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="inline-flex w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-1 sm:w-auto">
                        {[
                          { key: "edit", label: "Edit", icon: PencilLine },
                          { key: "preview", label: "Preview", icon: Eye },
                        ].map((mode) => {
                          const Icon = mode.icon;
                          const isActive = editorMode === mode.key;
                          return (
                            <button
                              key={mode.key}
                              type="button"
                              title={mode.label}
                              onClick={() =>
                                setEditorMode(mode.key as EditorMode)
                              }
                              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-bold transition-colors sm:flex-none ${
                                isActive
                                  ? "bg-gray-900 text-white shadow-sm"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{mode.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {editorDevice !== "desktop" &&
                        formData[getContentKey(editorDevice)] && (
                          <button
                            type="button"
                            title="Use Desktop Default"
                            onClick={clearDeviceOverride}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                            <span>Default</span>
                          </button>
                        )}
                    </div>

                    <div className="overflow-x-auto bg-slate-100 p-3 sm:p-4">
                      <div
                        className="mx-auto transition-all duration-300"
                        style={{
                          width: "100%",
                          maxWidth: editorDevices.find(
                            (device) => device.key === editorDevice,
                          )?.width,
                        }}
                      >
                        {editorMode === "edit" ? (
                          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <Editor
                              key={editorDevice}
                              value={getContentForDevice(editorDevice)}
                              onEditorChange={(content: string) =>
                                updateContentForDevice(content)
                              }
                              init={{
                                height: editorHeights[editorDevice],
                                menubar: true,
                                plugins:
                                  "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample",
                                toolbar:
                                  "undo redo | blocks | bold italic underline | image responsiveimagegrid link table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style: tinyContentStyle,
                                images_upload_url: NEWS_IMAGE_UPLOAD_API,
                                images_upload_handler: uploadEditorImage,
                                automatic_uploads: true,
                                convert_urls: false,
                                relative_urls: false,
                                remove_script_host: false,
                                file_picker_types: "image",
                                image_advtab: true,
                                image_caption: true,
                                image_uploadtab: true,
                                image_title: true,
                                object_resizing: true,
                                toolbar_mode: "sliding",
                                branding: false,
                                statusbar: false,
                                setup: (editor: any) => {
                                  editor.ui.registry.addButton(
                                    "responsiveimagegrid",
                                    {
                                      text: "3/2/1 Grid",
                                      tooltip:
                                        "Selected images ko desktop 3, tablet 2, mobile 1 column grid me set kare",
                                      onAction: () => {
                                        const selectedHtml =
                                          editor.selection.getContent({
                                            format: "html",
                                          });

                                        if (!/<img\b/i.test(selectedHtml)) {
                                          window.alert(
                                            "Pehle editor me images select karein, phir 3/2/1 Grid click karein.",
                                          );
                                          return;
                                        }

                                        editor.selection.setContent(
                                          `<div class="responsive-image-grid">${selectedHtml}</div><p></p>`,
                                        );
                                      },
                                    },
                                  );
                                },
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            className="prose prose-teal min-h-[520px] max-w-none rounded-lg border border-gray-200 bg-white p-5 text-gray-700 shadow-sm sm:p-8"
                            dangerouslySetInnerHTML={{
                              __html: getContentForDevice(editorDevice) || "",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                Featured Media
              </h2>
              <div className="relative aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:bg-gray-100 group">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="News Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-lg">
                        Change Photo
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      Click to upload image
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 text-blue-600 mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1.5">
                  <Save className="w-3 h-3" /> SEO Intelligence
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">
                    Focus Keyword *
                  </label>
                  <div className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap gap-2 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-inner">
                    {formData.focusKeyword &&
                      formData.focusKeyword
                        .split(",")
                        .filter((t) => t.trim())
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tight group"
                          >
                            {tag.trim()}
                            <button
                              type="button"
                              onClick={() => removeTag(i)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                    <input
                      value={keywordInput}
                      onChange={(e) => {
                        if (e.target.value.endsWith(",")) {
                          addTag(e.target.value);
                        } else {
                          setKeywordInput(e.target.value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag(keywordInput);
                        }
                      }}
                      className="flex-1 min-w-[150px] bg-transparent outline-none text-xs font-bold text-gray-700 placeholder:text-gray-300"
                      placeholder="Type tag & press Enter..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 text-xs font-bold text-gray-700 border border-gray-200 resize-none outline-none focus:border-blue-500 focus:bg-white transition-all"
                    placeholder="Enter meta description for Google snippets..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700">
                    Visibility Status
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    Visible to all users
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewsActionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <NewsActionForm />
    </Suspense>
  );
}
