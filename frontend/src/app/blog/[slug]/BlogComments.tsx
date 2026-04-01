"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Reply } from "lucide-react";

export default function BlogComments({
  blogId,
  initialComments = [],
}: {
  blogId: string;
  initialComments: any[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [isAdmin, setIsAdmin] = useState(false);

  // Comment Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Admin Reply state
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // Basic check for admin auth to show admin features
    const token = localStorage.getItem("admin_token");
    if (token) setIsAdmin(true);
  }, []);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api-backend/blogs/${blogId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website, comment: text }),
      });
      if (res.ok) {
        const updatedBlog = await res.json();
        setComments(updatedBlog.comments || []);
        setName("");
        setEmail("");
        setWebsite("");
        setText("");
        alert("Comment submitted!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    }
    setSubmitting(false);
  };

  const handleAdminReply = async (commentId: string) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch(
        `/api-backend/cms/blogs/${blogId}/comments/${commentId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
          body: JSON.stringify({ text: replyText }),
        },
      );
      if (res.ok) {
        const updatedBlog = await res.json();
        setComments(updatedBlog.comments || []);
        setReplyingTo(null);
        setReplyText("");
      } else {
        alert("Failed to reply");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Delete this comment completely?")) return;
    try {
      const res = await fetch(
        `/api-backend/cms/blogs/${blogId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        },
      );
      if (res.ok) {
        const updatedBlog = await res.json();
        setComments(updatedBlog.comments || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReply = async (commentId: string, replyId: string) => {
    if (!confirm("Delete this reply?")) return;
    try {
      const res = await fetch(
        `/api-backend/cms/blogs/${blogId}/comments/${commentId}/reply/${replyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        },
      );
      if (res.ok) {
        const updatedBlog = await res.json();
        setComments(updatedBlog.comments || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Comments List */}
      {comments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-10 border border-gray-100">
          <h3 className="text-2xl font-serif text-gray-900 mb-8">
            {comments.length} Comments
          </h3>
          <div className="space-y-8">
            {comments.map((c) => (
              <div
                key={c._id}
                className="border-b border-gray-100 pb-8 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#1e3a8a] text-lg">
                      {c.name}
                    </h4>
                    <span className="text-xs text-gray-400 block mb-3">
                      {new Date(c.date).toLocaleDateString()}
                    </span>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setReplyingTo(replyingTo === c._id ? null : c._id)
                        }
                        className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"
                        title="Reply"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(c._id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded"
                        title="Delete Comment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{c.comment}</p>

                {/* Replies */}
                {c.replies && c.replies.length > 0 && (
                  <div className="mt-4 ml-6 sm:ml-12 pl-4 sm:pl-6 border-l-2 border-slate-100 space-y-4">
                    {c.replies.map((r: any) => (
                      <div
                        key={r._id}
                        className="bg-slate-50 p-4 rounded-xl relative group"
                      >
                        <h5 className="font-bold text-[#f5a623] text-sm mb-1">
                          {r.admin ? "PopularHospital Admin" : "Admin"}
                        </h5>
                        <p className="text-gray-700 text-sm">{r.text}</p>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteReply(c._id, r._id)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === c._id && isAdmin && (
                  <div className="mt-4 ml-6 sm:ml-12 flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:border-[#f5a623] outline-none"
                    />
                    <button
                      onClick={() => handleAdminReply(c._id)}
                      className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg text-sm font-bold"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave a Reply Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-10 border border-gray-100">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">
          Leave a Reply
        </h3>
        <p className="text-sm text-gray-500 mb-8">
          Your email address will not be published. Required fields are marked *
        </p>

        <form onSubmit={handlePostComment} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 tracking-wider">
              Comment *
            </label>
            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all resize-none"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 tracking-wider">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 tracking-wider">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2 tracking-wider">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="save-info"
              className="w-4 h-4 text-[#f5a623] rounded border-gray-300 focus:ring-[#f5a623]"
            />
            <label htmlFor="save-info" className="text-sm text-gray-600">
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#f5a623] hover:bg-[#e0951a] text-white font-semibold rounded-lg transition-colors shadow-md disabled:opacity-70"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Post
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
