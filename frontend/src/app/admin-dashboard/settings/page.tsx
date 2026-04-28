"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, LogOut, Key, User, Briefcase, Save, Eye, EyeOff, Loader2 } from "lucide-react";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
});

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Career admin state
  const [careerAdmin, setCareerAdmin] = useState<{ email: string; name: string; isActive?: boolean } | null>(null);
  const [caEmail, setCaEmail]   = useState("");
  const [caName, setCaName]     = useState("");
  const [caPass, setCaPass]     = useState("");
  const [showPass, setShowPass] = useState(false);
  const [caSaving, setCaSaving] = useState(false);
  const [caToast, setCaToast]   = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    fetch("/api-backend/cms/career-admin", { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.email) {
          setCareerAdmin({ email: data.email, name: data.name || "", isActive: data.isActive !== false });
          setCaEmail(data.email);
          setCaName(data.name || "");
        }
      })
      .catch(() => {});
  }, []);

  const showCaToast = (type: "success" | "error", msg: string) => {
    setCaToast({ type, msg });
    setTimeout(() => setCaToast(null), 3000);
  };

  const handleSaveCareerAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caEmail) return;
    setCaSaving(true);
    try {
      const body: any = { email: caEmail, name: caName };
      if (caPass) body.password = caPass;

      const res = await fetch("/api-backend/cms/career-admin", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setCareerAdmin({ email: caEmail, name: caName, isActive: careerAdmin?.isActive !== false });
      setCaPass("");
      showCaToast("success", careerAdmin ? "Credentials updated!" : "Career Admin created!");
    } catch (err: any) {
      showCaToast("error", err.message || "Save failed");
    } finally {
      setCaSaving(false);
    }
  };

  const handleToggleCareerAdmin = async () => {
    try {
      const res = await fetch("/api-backend/cms/career-admin/toggle", {
        method: "PATCH",
        headers: authHeaders(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Toggle failed");
      setCareerAdmin((prev) => prev ? { ...prev, isActive: data.isActive } : prev);
      showCaToast("success", data.isActive ? "Career Admin enabled" : "Career Admin disabled");
    } catch (err: any) {
      showCaToast("error", err.message || "Toggle failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin-login");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {caToast && (
        <div className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium
          ${caToast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
          {caToast.msg}
        </div>
      )}

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your admin account settings</p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0b1c43] flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{user?.name || "Admin"}</h3>
            <p className="text-sm text-gray-500">{user?.email || "admin@popularhospital.in"}</p>
          </div>
        </div>
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</p>
              <p className="text-sm text-gray-900 font-medium">{user?.name || "Admin"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Key className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
              <p className="text-sm text-gray-900 font-medium">{user?.email || ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</p>
              <p className="text-sm text-gray-900 font-medium">Super Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Career Admin Credentials */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#0d9488]/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-[#0d9488]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Career Portal Admin</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {careerAdmin
                ? careerAdmin.isActive
                  ? `Active — ${careerAdmin.email}`
                  : `Disabled — ${careerAdmin.email}`
                : "No career admin set yet"}
            </p>
          </div>
        </div>

        {careerAdmin && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Access</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {careerAdmin.isActive ? "Career admin can log in" : "Login blocked"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleCareerAdmin}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                ${careerAdmin.isActive ? "bg-[#0d9488]" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
                  ${careerAdmin.isActive ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        )}

        <form onSubmit={handleSaveCareerAdmin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={caName}
              onChange={(e) => setCaName(e.target.value)}
              placeholder="Career Admin"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Login ID)</label>
            <input
              type="email"
              value={caEmail}
              onChange={(e) => setCaEmail(e.target.value)}
              required
              placeholder="career@popularhospital.in"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password {careerAdmin && <span className="text-gray-400 font-normal">(khali chhoden to change nahi hoga)</span>}
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={caPass}
                onChange={(e) => setCaPass(e.target.value)}
                placeholder={careerAdmin ? "New password (optional)" : "Set password"}
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition"
              />
              <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={caSaving}
            className="flex items-center gap-2 bg-[#0b1c43] hover:bg-[#0d2257] disabled:opacity-60 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
          >
            {caSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {caSaving ? "Saving..." : careerAdmin ? "Update Credentials" : "Create Career Admin"}
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <h4 className="font-bold text-red-700 mb-2">Danger Zone</h4>
        <p className="text-sm text-gray-500 mb-4">Logging out will clear your session.</p>
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
