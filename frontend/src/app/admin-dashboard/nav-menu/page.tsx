"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "/api-backend";

interface MenuItem { label: string; href: string; hidden: boolean; group?: string; }
interface MenuGroup { _id: string; menuKey: string; label: string; hidden: boolean; items: MenuItem[]; }

export default function NavMenuManager() {
  const [menus, setMenus] = useState<MenuGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getHeaders = () => ({ Authorization: "Bearer " + (sessionStorage.getItem("admin_token") || ""), "Content-Type": "application/json" });

  const fetchMenus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL + "/cms/nav-menus", { headers: getHeaders() });
      const data = await res.json();
      if (Array.isArray(data)) {
        setMenus(data);
        const expanded: Record<string, boolean> = {};
        data.forEach((m: MenuGroup) => { expanded[m.menuKey] = true; });
        setExpandedGroups(expanded);
      }
    } catch { toast.error("Failed to load menus"); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchMenus(); }, []);

  const toggleGroup = async (menuKey: string, currentHidden: boolean) => {
    setSavingKey(menuKey);
    const menu = menus.find(m => m.menuKey === menuKey);
    try {
      const res = await fetch(API_URL + "/cms/nav-menus/" + menuKey + "/toggle", {
        method: "PATCH", headers: getHeaders(), body: JSON.stringify({ hidden: !currentHidden }),
      });
      if (!res.ok) throw new Error();
      setMenus(prev => prev.map(m => m.menuKey === menuKey ? { ...m, hidden: !currentHidden } : m));
      toast.success('"' + (menu?.label || menuKey) + '" ' + (!currentHidden ? "hidden" : "visible") + " kar diya");
    } catch { toast.error("Save failed. Please try again."); }
    finally { setSavingKey(null); }
  };

  const toggleItem = async (menuKey: string, itemIndex: number, currentHidden: boolean) => {
    const key = menuKey + "-" + itemIndex;
    setSavingKey(key);
    const menu = menus.find(m => m.menuKey === menuKey);
    try {
      const res = await fetch(API_URL + "/cms/nav-menus/" + menuKey + "/items/" + itemIndex + "/toggle", {
        method: "PATCH", headers: getHeaders(), body: JSON.stringify({ hidden: !currentHidden }),
      });
      if (!res.ok) throw new Error();
      setMenus(prev => prev.map(m => {
        if (m.menuKey !== menuKey) return m;
        return { ...m, items: m.items.map((item, i) => i === itemIndex ? { ...item, hidden: !currentHidden } : item) };
      }));
      toast.success('"' + (menu?.items[itemIndex]?.label || "Item") + '" ' + (!currentHidden ? "hidden" : "visible") + " kar diya");
    } catch { toast.error("Save failed. Please try again."); }
    finally { setSavingKey(null); }
  };

  const handleReset = async () => {
    if (!confirm("Kya aap sabhi menu settings reset karna chahte hain? Ye action undo nahi ho sakta.")) return;
    setSavingKey("__reset__");
    try {
      const res = await fetch(API_URL + "/cms/nav-menus/reset", { method: "PUT", headers: getHeaders() });
      if (!res.ok) throw new Error();
      toast.success("Menus reset ho gaye");
      fetchMenus();
    } catch { toast.error("Reset failed"); }
    finally { setSavingKey(null); }
  };

  if (isLoading) return <div className="flex justify-center items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Nav Menu Manager</h2>
          <p className="text-sm text-gray-500 mt-1">Header ke dropdown menus ko individually ya group mein hide/show karein</p>
        </div>
        <button onClick={handleReset} disabled={savingKey === "__reset__"} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60">
          {savingKey === "__reset__" ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Reset All
        </button>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Note:</strong> Hide karne par item header/menu se hat jayega <strong>aur uska page URL se direct kholne par bhi 404 (Page Not Found) aayega</strong>. Show karte hi page wapas khul jayega.
      </div>
      <div className="space-y-4">
        {menus.map(menu => (
          <div key={menu.menuKey} className={"bg-white rounded-2xl border-2 shadow-sm transition-all " + (menu.hidden ? "border-red-200 opacity-75" : "border-gray-100")}>
            <div className="flex items-center justify-between p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <button onClick={() => setExpandedGroups(prev => ({ ...prev, [menu.menuKey]: !prev[menu.menuKey] }))} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {expandedGroups[menu.menuKey] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{menu.label}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{menu.items.filter(i => !i.hidden).length} / {menu.items.length} items visible</p>
                </div>
                {menu.hidden && <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full ml-2">HIDDEN</span>}
              </div>
              <button onClick={() => toggleGroup(menu.menuKey, menu.hidden)} disabled={savingKey === menu.menuKey} className={"inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 " + (menu.hidden ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200")}>
                {savingKey === menu.menuKey ? <Loader2 className="w-4 h-4 animate-spin" /> : menu.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {menu.hidden ? "Show Group" : "Hide Group"}
              </button>
            </div>
            {expandedGroups[menu.menuKey] && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {menu.items.map((item, idx) => {
                  const key = menu.menuKey + "-" + idx;
                  const showGroupHeading = !!item.group && item.group !== menu.items[idx - 1]?.group;
                  return (
                    <div key={idx}>
                    {showGroupHeading && (
                      <div className="px-5 py-2 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-y border-gray-100">{item.group}</div>
                    )}
                    <div className={"flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors " + (item.hidden ? "opacity-60" : "")}>
                      <div className="flex items-center gap-3">
                        <div className={"w-1.5 h-1.5 rounded-full " + (item.hidden ? "bg-red-400" : "bg-green-400")} />
                        <div>
                          <span className="text-sm font-medium text-gray-800">{item.label}</span>
                          <span className="ml-2 text-xs text-gray-400">{item.href}</span>
                        </div>
                        {item.hidden && <span className="text-[10px] font-bold bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full ml-1">HIDDEN</span>}
                      </div>
                      <button onClick={() => toggleItem(menu.menuKey, idx, item.hidden)} disabled={savingKey === key} className={"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-60 " + (item.hidden ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200")}>
                        {savingKey === key ? <Loader2 className="w-3 h-3 animate-spin" /> : item.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {item.hidden ? "Show" : "Hide"}
                      </button>
                    </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Important:</strong> Changes 5-10 second mein website par apply ho jaate hain. Hidden pages URL se bhi open nahi honge.
      </div>
    </div>
  );
}