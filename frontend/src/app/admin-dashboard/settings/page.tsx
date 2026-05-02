"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Shield,
  LogOut,
  Key,
  User,
  Briefcase,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  WifiOff,
  ShieldOff,
  AlertTriangle,
} from "lucide-react";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
});

interface CareerAdmin {
  _id: string;
  email: string;
  name: string;
  isActive: boolean;
  isOnline: boolean;
}

// ── Custom Confirm Modal ────────────────────────────────────────────────
function ConfirmModal({
  message,
  subMessage,
  confirmLabel = "Yes, Proceed",
  variant = "danger",
  onConfirm,
  onCancel,
}: {
  message: string;
  subMessage?: string;
  confirmLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isDanger = variant === "danger";
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4
          ${isDanger ? "bg-red-100" : "bg-amber-100"}`}
        >
          <AlertTriangle
            className={`w-6 h-6 ${isDanger ? "text-red-600" : "text-amber-600"}`}
          />
        </div>
        <h3 className="text-base font-bold text-gray-900 text-center mb-1">
          {message}
        </h3>
        {subMessage && (
          <p className="text-sm text-gray-500 text-center mb-5">{subMessage}</p>
        )}
        {!subMessage && <div className="mb-5" />}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            No, Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition
              ${isDanger ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Modal ──────────────────────────────────────────────────────────
function EditModal({
  admin,
  onClose,
  onSaved,
}: {
  admin: CareerAdmin;
  onClose: () => void;
  onSaved: (updated: CareerAdmin) => void;
}) {
  const [name, setName] = useState(admin.name);
  const [email, setEmail] = useState(admin.email);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api-backend/cms/career-admin/${admin._id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({
          email,
          name,
          ...(password ? { password } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSaved({ ...admin, email, name });
      toast.success("Career Admin updated successfully!");
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-900 text-lg">Edit Career Admin</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (Login ID)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password{" "}
              <span className="text-gray-400 font-normal">
                (leave blank to keep unchanged)
              </span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={admin ? "New password (optional)" : "Set password"}
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0b1c43] hover:bg-[#0d2257] disabled:opacity-60 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Create Form ─────────────────────────────────────────────────────────
function CreateForm({ onCreated }: { onCreated: (a: CareerAdmin) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api-backend/cms/career-admin", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Create failed");
      onCreated({
        _id: data._id,
        email: data.email,
        name: data.name || name,
        isActive: true,
        isOnline: false,
      });
      toast.success("Career Admin created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setOpen(false);
    } catch (e: any) {
      toast.error(e.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[#0b1c43] hover:bg-[#0d2257] text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" /> Add Career Admin
      </button>
    );
  }

  return (
    <div className="border border-[#0d9488]/30 rounded-xl p-4 bg-[#0d9488]/5 mt-2">
      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold text-gray-800 text-sm">New Career Admin</p>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <form onSubmit={handleCreate} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] bg-white transition"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email (Login ID)"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] bg-white transition"
        />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] bg-white transition"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPass ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0b7a70] disabled:opacity-60 text-white rounded-lg py-2 text-sm font-medium transition-colors"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          {saving ? "Creating..." : "Create Career Admin"}
        </button>
      </form>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────
export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [admins, setAdmins] = useState<CareerAdmin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState<CareerAdmin | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [forceLoggingOutId, setForceLoggingOutId] = useState<string | null>(
    null,
  );
  const [loggingOutAll, setLoggingOutAll] = useState(false);

  // Confirm modal state
  const [confirm, setConfirm] = useState<{
    message: string;
    subMessage?: string;
    confirmLabel?: string;
    variant?: "danger" | "warning";
    onConfirm: () => void;
  } | null>(null);

  const showConfirm = (opts: typeof confirm) => setConfirm(opts);
  const closeConfirm = () => setConfirm(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    fetch("/api-backend/cms/career-admin", { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) =>
        setAdmins(Array.isArray(data) ? data : data && data._id ? [data] : []),
      )
      .catch(() => setAdmins([]))
      .finally(() => setLoadingAdmins(false));
  }, []);

  const handleToggle = async (admin: CareerAdmin) => {
    setTogglingId(admin._id);
    try {
      const res = await fetch(
        `/api-backend/cms/career-admin/${admin._id}/toggle`,
        {
          method: "PATCH",
          headers: authHeaders(),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Toggle failed");
      setAdmins((prev) =>
        prev.map((a) =>
          a._id === admin._id ? { ...a, isActive: data.isActive } : a,
        ),
      );
      toast.success(
        data.isActive ? `${admin.name} enabled` : `${admin.name} disabled`,
      );
    } catch (e: any) {
      toast.error(e.message || "Toggle failed");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = (admin: CareerAdmin) => {
    showConfirm({
      message: `Delete "${admin.name}"?`,
      subMessage:
        "This action cannot be undone. The admin's access will be permanently removed.",
      confirmLabel: "Yes, Delete",
      variant: "danger",
      onConfirm: async () => {
        closeConfirm();
        setDeletingId(admin._id);
        try {
          const res = await fetch(
            `/api-backend/cms/career-admin/${admin._id}`,
            {
              method: "DELETE",
              headers: authHeaders(),
            },
          );
          if (!res.ok) throw new Error("Delete failed");
          setAdmins((prev) => prev.filter((a) => a._id !== admin._id));
          toast.success(`${admin.name} deleted`);
        } catch {
          toast.error("Delete failed, please try again");
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const handleForceLogout = (admin: CareerAdmin) => {
    showConfirm({
      message: `Log out "${admin.name}"?`,
      subMessage:
        "Their active session will be terminated. They will need to log in again.",
      confirmLabel: "Yes, Log Out",
      variant: "warning",
      onConfirm: async () => {
        closeConfirm();
        setForceLoggingOutId(admin._id);
        try {
          const res = await fetch(
            `/api-backend/cms/career-admin/${admin._id}/session`,
            {
              method: "DELETE",
              headers: authHeaders(),
            },
          );
          if (!res.ok) throw new Error("Failed");
          setAdmins((prev) =>
            prev.map((a) =>
              a._id === admin._id ? { ...a, isOnline: false } : a,
            ),
          );
          toast.success(`${admin.name} logged out`);
        } catch {
          toast.error("Logout failed, please try again");
        } finally {
          setForceLoggingOutId(null);
        }
      },
    });
  };

  const handleLogoutAll = () => {
    const onlineCount = admins.filter((a) => a.isOnline).length;
    showConfirm({
      message: "Log out all Career Admins?",
      subMessage:
        onlineCount > 0
          ? `${onlineCount} admin(s) currently online. All their sessions will be cleared.`
          : "All career admin sessions will be cleared.",
      confirmLabel: "Yes, Log Out All",
      variant: "warning",
      onConfirm: async () => {
        closeConfirm();
        setLoggingOutAll(true);
        try {
          const res = await fetch(
            "/api-backend/cms/career-admin/sessions/all",
            {
              method: "DELETE",
              headers: authHeaders(),
            },
          );
          if (!res.ok) throw new Error("Failed");
          setAdmins((prev) => prev.map((a) => ({ ...a, isOnline: false })));
          toast.success("All career admins logged out");
        } catch {
          toast.error("Something went wrong, please try again");
        } finally {
          setLoggingOutAll(false);
        }
      },
    });
  };

  const handleLogout = () => {
    showConfirm({
      message: "Are you sure you want to log out?",
      subMessage: "Your session will be cleared.",
      confirmLabel: "Yes, Log Out",
      variant: "danger",
      onConfirm: () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        router.push("/admin-login");
      },
    });
  };

  const onlineAdmins = admins.filter((a) => a.isOnline);

  return (
    <div className="space-y-6 max-w-2xl">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* Confirm Modal */}
      {confirm && (
        <ConfirmModal
          message={confirm.message}
          subMessage={confirm.subMessage}
          confirmLabel={confirm.confirmLabel}
          variant={confirm.variant}
          onConfirm={confirm.onConfirm}
          onCancel={closeConfirm}
        />
      )}

      {/* Edit Modal */}
      {editingAdmin && (
        <EditModal
          admin={editingAdmin}
          onClose={() => setEditingAdmin(null)}
          onSaved={(updated) => {
            setAdmins((prev) =>
              prev.map((a) => (a._id === updated._id ? updated : a)),
            );
            setEditingAdmin(null);
          }}
        />
      )}

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Settings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your admin account settings
        </p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0b1c43] flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {user?.name || "Admin"}
            </h3>
            <p className="text-sm text-gray-500">
              {user?.email || "admin@popularhospital.in"}
            </p>
          </div>
        </div>
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {user?.name || "Admin"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Key className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </p>
              <p className="text-sm text-gray-900 font-medium">
                Super Administrator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Career Portal Admins */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#0d9488]/10 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-[#0d9488]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900">Career Portal Admins</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {loadingAdmins ? (
                "Loading..."
              ) : (
                <>
                  {admins.length} admin{admins.length !== 1 ? "s" : ""}
                  {onlineAdmins.length > 0 && (
                    <span className="ml-2 text-emerald-600 font-semibold">
                      · {onlineAdmins.length} currently online
                    </span>
                  )}
                </>
              )}
            </p>
          </div>
          {admins.length > 0 && (
            <button
              onClick={handleLogoutAll}
              disabled={loggingOutAll}
              title="Log out all career admins"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors shrink-0 disabled:opacity-50"
            >
              {loggingOutAll ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShieldOff className="w-3.5 h-3.5" />
              )}
              Logout All
            </button>
          )}
        </div>

        {/* Admin List */}
        {loadingAdmins ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#0d9488]" />
          </div>
        ) : admins.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl mb-4">
            No career admins yet. Create one below.
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors
                  ${
                    admin.isOnline
                      ? "bg-emerald-50/60 border-emerald-200"
                      : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                  }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0
                  ${admin.isOnline ? "bg-emerald-600" : "bg-gradient-to-br from-[#0d9488] to-[#0b1c43]"}`}
                >
                  {admin.name?.charAt(0)?.toUpperCase() || "C"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {admin.name || "Career Admin"}
                    </p>
                    {admin.isOnline && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full shrink-0">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {admin.email}
                  </p>
                </div>

                {/* Active/Disabled badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0
                  ${admin.isActive ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-600"}`}
                >
                  {admin.isActive ? "Active" : "Disabled"}
                </span>

                {/* Toggle active */}
                <button
                  onClick={() => handleToggle(admin)}
                  disabled={togglingId === admin._id}
                  title={admin.isActive ? "Disable" : "Enable"}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none shrink-0
                    ${admin.isActive ? "bg-[#0d9488]" : "bg-gray-300"}
                    ${togglingId === admin._id ? "opacity-50" : ""}`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform
                    ${admin.isActive ? "translate-x-4" : "translate-x-0.5"}`}
                  />
                </button>

                {/* Force Logout */}
                <button
                  onClick={() => handleForceLogout(admin)}
                  disabled={forceLoggingOutId === admin._id}
                  title="Force Logout — clear session"
                  className="p-1.5 rounded-lg transition-colors shrink-0 text-amber-500 hover:text-amber-700 hover:bg-amber-50 disabled:opacity-40"
                >
                  {forceLoggingOutId === admin._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <WifiOff className="w-4 h-4" />
                  )}
                </button>

                {/* Edit */}
                <button
                  onClick={() => setEditingAdmin(admin)}
                  title="Edit"
                  className="p-1.5 text-gray-400 hover:text-[#0b1c43] hover:bg-white rounded-lg transition-colors shrink-0"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(admin)}
                  disabled={deletingId === admin._id}
                  title="Delete"
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                >
                  {deletingId === admin._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Create */}
        <CreateForm
          onCreated={(newAdmin) => {
            setAdmins((prev) => [newAdmin, ...prev]);
          }}
        />
      </div>

      {/* Logout */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <h4 className="font-bold text-red-700 mb-2">Danger Zone</h4>
        <p className="text-sm text-gray-500 mb-4">
          Logging out will clear your session.
        </p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
