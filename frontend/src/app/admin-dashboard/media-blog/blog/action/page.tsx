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
  Sparkles,
  Eye,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Clock,
  Share2,
  Copy,
  Check,
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
const BLOG_CMS_API = "/api-backend/cms/blogs";
const BLOG_IMAGE_UPLOAD_API = "/api-backend/blog-image-direct";

const normalizeEditorImagePath = (value: string) => {
  if (!value) return value;
  const match = value.match(/\/uploads\/[^"'\s)]+/i);
  return match ? match[0] : value;
};

const normalizeEditorHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/https?:\/\/[^"'\s<]+(\/uploads\/[^"'\s<]+)/gi, "$1");
};

const CATEGORIES = [
  "Best Cancer Specialist Hospital in Varanasi",
  "Best Cardiology Hospital in Varanasi",
  "Best Dental Hospital in Varanasi",
  "Best Eye Specialist Hospital in Varanasi",
  "Best Gynaecologist in Varanasi",
  "Best Heart Hospital in Varanasi",
  "Best Joint Replacement Hospital in Varanasi",
  "Best Medicine Doctor in Varanasi",
  "Best Microbiology Lab in Varanasi",
  "Best Neurology Hospital in Varanasi",
  "Best Orthopedic Hospital in Varanasi",
  "Best Plastic Surgery Hospital in Varanasi",
  "Best Urologist Hospital in Varanasi",
  "Gastroenterology in Varanasi",
  "Cardiology in Varanasi",
  "Neurology in Varanasi",
  "Orthopedics in Varanasi",
  "ENT Care in Varanasi",
  "Pediatrics in Varanasi",
  "Emergency Care in Varanasi",
  "Blood Bank in Varanasi",
  "Critical Care & ICU in Varanasi",
  "Endocrinology Center in Varanasi",
  "Nephrology Specialist Center in Varanasi",
  "Neuro Surgery Center in Varanasi",
];

function BlogActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    dateIso: new Date().toISOString().split("T")[0],
    author: "popularhospital-admin",
    category: "",
    isUncategorized: false,
    isActive: true,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    readingTime: 0,
    imageAlt: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [keywordInput, setKeywordInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `https://popularhospital.in/blog/${formData.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

  useEffect(() => {
    const textContent = formData.content.replace(/<[^>]*>?/gm, "");
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
    const estimatedTime = Math.max(1, Math.ceil(wordCount / 200));
    setFormData(prev => {
      if (prev.readingTime !== estimatedTime) {
        return { ...prev, readingTime: estimatedTime };
      }
      return prev;
    });
  }, [formData.content]);

  const getSeoScore = () => {
    let score = 0;
    const checks = [];
    const keywords = formData.focusKeyword.toLowerCase().split(",").map(k => k.trim()).filter(Boolean);
    const contentText = formData.content.replace(/<[^>]*>?/gm, "").toLowerCase();
    
    if (formData.title.length >= 40 && formData.title.length <= 60) {
      score += 25;
      checks.push({ label: "Title length is optimal (40-60 chars)", passed: true });
    } else {
      checks.push({ label: "Title length should be 40-60 chars", passed: false });
    }

    if (formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160) {
      score += 25;
      checks.push({ label: "Meta description length is optimal (120-160 chars)", passed: true });
    } else {
      checks.push({ label: "Meta description length should be 120-160 chars", passed: false });
    }

    if (keywords.length > 0 && keywords.some(k => formData.title.toLowerCase().includes(k))) {
      score += 25;
      checks.push({ label: "Focus keyword found in title", passed: true });
    } else {
      checks.push({ label: "Focus keyword not found in title", passed: false });
    }

    if (keywords.length > 0 && keywords.some(k => contentText.includes(k))) {
      score += 25;
      checks.push({ label: "Focus keyword used in content", passed: true });
    } else {
      checks.push({ label: "Focus keyword not found in content", passed: false });
    }

    return { score, checks };
  };
  const seoFeedback = getSeoScore();

  useEffect(() => {
    if (editId) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(BLOG_CMS_API, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
            },
          });
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) {
            setFormData({
              ...item,
              content: normalizeEditorHtml(
                typeof item.content === "string"
                  ? item.content
                  : item.content
                    ? item.content.join("\n\n")
                    : "",
              ),
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
      fetchBlog();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image")
        submitData.append(
          key,
          key === "content"
            ? normalizeEditorHtml(String(value))
            : String(value),
        );
    });

    if (imageFile) submitData.append("image", imageFile);

    try {
      const url = editId ? `${BLOG_CMS_API}/${editId}` : BLOG_CMS_API;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: submitData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save blog post");
      }

      alert(editId ? "Post updated!" : "Post launched!");
      if (window.opener || window.history.length === 1) window.close();
      router.push("/admin-dashboard/media-blog/blog");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
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
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shadow-sm">
                <Newspaper className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  {editId ? "Edit Blog" : "Launch New Blog"}
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-tight">
                  SEO Editorial Suite • Popular Hospital
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" /> <span>Preview</span>
            </button>
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
              <span>{editId ? "Save Article" : "Launch Post"}</span>
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
                Article Body
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFormData({
                        ...formData,
                        title: v,
                        slug: v.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        metaTitle: v,
                      });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 font-bold text-lg"
                    placeholder="Enter blog heading..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-"),
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      required
                      value={formData.author}
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-900 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Snippet / Excerpt
                  </label>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <Editor
                      value={formData.excerpt}
                      onEditorChange={(content: string) =>
                        setFormData({ ...formData, excerpt: content })
                      }
                      init={{
                        height: 180,
                        menubar: false,
                        plugins: ["link"],
                        toolbar: "bold italic | link | removeformat",
                        branding: false,
                        statusbar: false,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-4">
                    <span>Detailed Article Content *</span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-200 shadow-sm">
                      <Clock className="w-3.5 h-3.5" />
                      ~{formData.readingTime} min read
                    </span>
                  </label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 min-h-[700px]">
                    <Editor
                      value={formData.content}
                      onEditorChange={(content: string) =>
                        setFormData({
                          ...formData,
                          content: normalizeEditorHtml(content),
                        })
                      }
                      init={{
                        height: 700,
                        menubar: true,
                        plugins:
                          "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount emoticons codesample",
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline | image link media table | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | removeformat | help",
                        images_upload_url: BLOG_IMAGE_UPLOAD_API,
                        branding: false,
                        statusbar: false,
                        images_upload_handler: (blobInfo: any) =>
                          new Promise((resolve, reject) => {
                            const fd = new FormData();
                            fd.append(
                              "file",
                              blobInfo.blob(),
                              blobInfo.filename(),
                            );
                            fetch(BLOG_IMAGE_UPLOAD_API, {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                              },
                              body: fd,
                            })
                              .then((res) =>
                                res.ok ? res.json() : reject("Upload failed"),
                              )
                              .then((json) =>
                                json.location
                                  ? resolve(
                                      normalizeEditorImagePath(json.location),
                                    )
                                  : reject("Invalid location"),
                              )
                              .catch((err) => reject(err.message));
                          }),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                Featured Image
              </h2>
              <div className="relative aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all hover:bg-gray-100 group">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Blog Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs uppercase shadow-lg">
                        Change Image
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      1:1 Ratio Recommended
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setImageFile(f);
                      setImagePreview(URL.createObjectURL(f));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <input
                value={formData.imageAlt}
                onChange={(e) =>
                  setFormData({ ...formData, imageAlt: e.target.value })
                }
                placeholder="Image Alt Text (SEO)..."
                className="w-full px-4 py-2 mt-4 rounded-lg bg-gray-50 text-xs font-semibold border border-gray-200 outline-none"
              />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  SEO Intelligence
                </h2>
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
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 text-xs font-medium border border-gray-200 resize-none focus:border-blue-500 outline-none"
                    placeholder="Search excerpt..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1 mt-2">
                    <LinkIcon className="w-3 h-3" /> Canonical URL
                  </label>
                  <input
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 text-xs font-semibold border border-gray-200 outline-none focus:border-blue-500"
                    placeholder="https://example.com/blog/..."
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Live SEO Score</label>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${seoFeedback.score >= 80 ? 'bg-green-100 text-green-700' : seoFeedback.score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      {seoFeedback.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div className={`h-1.5 rounded-full transition-all ${seoFeedback.score >= 80 ? 'bg-green-500' : seoFeedback.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${seoFeedback.score}%` }}></div>
                  </div>
                  <ul className="space-y-2">
                    {seoFeedback.checks.map((check, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        {check.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-gray-300 shrink-0" />
                        )}
                        <span className={check.passed ? 'text-gray-700 font-medium' : 'text-gray-400'}>{check.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-blue-500" />
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Social Media Preview</label>
                    </div>
                    {formData.slug && (
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-2 py-1 rounded-md"
                      >
                        {copied ? (
                          <><Check className="w-3 h-3" /> Copied!</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy Link</>
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                    <div className="h-32 bg-gray-100 relative">
                      {imagePreview ? (
                         <Image src={imagePreview} alt="og-preview" fill className="object-cover" unoptimized/>
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold uppercase">No Image</div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50/50">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1 font-bold">popularhospital.in</div>
                      <div className="text-sm font-bold text-gray-900 line-clamp-1 break-all">{formData.title || "Social Title Preview"}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-2 mt-1 break-all leading-tight">{formData.metaDescription || "Social Media description preview will appear here..."}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Publish Date
                </label>
                <input
                  required
                  type="date"
                  value={formData.dateIso}
                  onChange={(e) => {
                    const iso = e.target.value;
                    if (!iso) return;
                    setFormData({
                      ...formData,
                      dateIso: iso,
                      date: new Date(iso).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }),
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Category
                </label>
                <select
                  disabled={formData.isUncategorized}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold"
                >
                  <option value="">Select Speciality</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-xs font-bold text-gray-600">
                  Active Listing
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Overlay */}
      {showPreview && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col overflow-hidden">
          <div className="bg-gray-900 px-6 py-4 flex items-center justify-between text-white shadow-xl">
            <div className="flex items-center gap-4">
              <Eye className="w-6 h-6 text-blue-400" />
              <h2 className="font-bold tracking-widest uppercase text-sm">
                Vantage Preview Mode
              </h2>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50 pb-40 px-4">
            <div className="max-w-4xl mx-auto mt-16 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="h-[400px] relative">
                <Image
                  src={imagePreview || "/about-section-image.png"}
                  alt="Preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    {formData.category || "General Health"}
                  </span>
                  <h1 className="text-4xl font-bold text-white leading-tight">
                    {formData.title || "Draft Article"}
                  </h1>
                </div>
              </div>
              <div className="p-12">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100 text-sm text-gray-400 font-semibold uppercase">
                  <span>{formData.author}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                  <span>{formData.date || "Pending Release"}</span>
                </div>
                <div
                  className="prose prose-xl prose-slate max-w-none text-gray-700 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BlogActionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <BlogActionForm />
    </Suspense>
  );
}
