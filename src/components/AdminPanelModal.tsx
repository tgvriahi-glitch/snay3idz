import React, { useState } from 'react';
import { Artisan, AppOwnerConfig } from '../types';
import { CRAFT_CATEGORIES } from '../data/crafts';
import { ALGERIA_WILAYAS } from '../data/wilayas';
import {
  Lock,
  Unlock,
  X,
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  Phone,
  MessageCircle,
  Instagram,
  Settings,
  Users,
  AlertTriangle,
  Check,
  RefreshCw,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisans: Artisan[];
  onAddArtisan: (artisan: Omit<Artisan, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => void;
  onUpdateArtisan: (artisan: Artisan) => void;
  onDeleteArtisan: (id: string) => void;
  onToggleArtisanAvailability: (id: string) => void;
  ownerConfig: AppOwnerConfig;
  onUpdateOwnerConfig: (config: AppOwnerConfig) => void;
  onResetArtisans: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const SECRET_PIN = '061198';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  artisans,
  onAddArtisan,
  onUpdateArtisan,
  onDeleteArtisan,
  onToggleArtisanAvailability,
  ownerConfig,
  onUpdateOwnerConfig,
  onResetArtisans,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'owner_settings' | 'backup'>('add');
  const [editingArtisanId, setEditingArtisanId] = useState<string | null>(null);

  // New Artisan Form State
  const [name, setName] = useState('');
  const [craftId, setCraftId] = useState(CRAFT_CATEGORIES[0].id);
  const [wilayaId, setWilayaId] = useState(16); // Alger default
  const [baladiya, setBaladiya] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [priceEstimate, setPriceEstimate] = useState('المعاينة 1000 دج / تسعيرة مدروسة');
  const [bio, setBio] = useState('');
  const [workZone, setWorkZone] = useState('');
  const [isEmergency24h, setIsEmergency24h] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Owner Config State
  const [tempOwnerConfig, setTempOwnerConfig] = useState<AppOwnerConfig>(ownerConfig);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === SECRET_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('الرمز السري غير صحيح! يرجى إدخال الرمز المخصص لصاحب التطبيق.');
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !baladiya.trim()) return;

    const wilayaObj = ALGERIA_WILAYAS.find((w) => w.id === wilayaId) || ALGERIA_WILAYAS[15];

    if (editingArtisanId) {
      const existing = artisans.find((a) => a.id === editingArtisanId);
      if (existing) {
        onUpdateArtisan({
          ...existing,
          name: name.trim(),
          craftId,
          wilayaId,
          wilayaName: wilayaObj.nameAr,
          baladiya: baladiya.trim(),
          phone: phone.trim(),
          whatsapp: (whatsapp || phone).trim(),
          experienceYears: Number(experienceYears),
          priceEstimate: priceEstimate.trim(),
          bio: bio.trim(),
          workZone: workZone.trim() || `${wilayaObj.nameAr} وضواحيها`,
          isEmergency24h,
          isVerified,
          avatarUrl: avatarUrl.trim() || undefined,
        });
        setSuccessMessage('تم تحديث بيانات الحرفي بنجاح!');
      }
      setEditingArtisanId(null);
    } else {
      onAddArtisan({
        name: name.trim(),
        craftId,
        wilayaId,
        wilayaName: wilayaObj.nameAr,
        baladiya: baladiya.trim(),
        phone: phone.trim(),
        whatsapp: (whatsapp || phone).trim(),
        experienceYears: Number(experienceYears),
        priceEstimate: priceEstimate.trim(),
        bio: bio.trim(),
        workZone: workZone.trim() || `${wilayaObj.nameAr} وضواحيها`,
        isAvailable: true,
        isEmergency24h,
        isVerified,
        avatarUrl: avatarUrl.trim() || undefined,
      });
      setSuccessMessage('تمت إضافة الحرفي بنجاح إلى منصة Snay3i DZ!');
    }

    // Reset fields
    setName('');
    setBaladiya('');
    setPhone('');
    setWhatsapp('');
    setBio('');
    setWorkZone('');
    setAvatarUrl('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleStartEdit = (art: Artisan) => {
    setEditingArtisanId(art.id);
    setName(art.name);
    setCraftId(art.craftId);
    setWilayaId(art.wilayaId);
    setBaladiya(art.baladiya);
    setPhone(art.phone);
    setWhatsapp(art.whatsapp);
    setExperienceYears(art.experienceYears);
    setPriceEstimate(art.priceEstimate);
    setBio(art.bio);
    setWorkZone(art.workZone || '');
    setIsEmergency24h(art.isEmergency24h);
    setIsVerified(art.isVerified);
    setAvatarUrl(art.avatarUrl || '');
    setActiveTab('add');
  };

  const handleSaveOwnerSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerConfig(tempOwnerConfig);
    setSuccessMessage('تم تحديث بيانات التواصل الخاصة بك بنجاح!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(artisans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `snay3i_artisans_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 text-right">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                فضاء الإدارة والتحكم (خاص بصاحب التطبيق)
              </h3>
              <p className="text-xs text-amber-400 font-semibold">
                {isAuthenticated ? 'تم تسجيل الدخول بنجاح' : 'الخانة محمية برمز سري'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                قفل الإدارة
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content based on Auth status */}
        {!isAuthenticated ? (
          /* Secret PIN Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-black text-slate-900 mb-2">
              إدخال الرمز السري للإدارة
            </h4>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              هذه الخانة مخصصة حصرياً لصاحب التطبيق لإضافة وإدارة عمال وحرفيي منصة Snay3i DZ. أدخل الرمز السري للمتابعة:
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  maxLength={20}
                  placeholder="أدخل الرمز السري"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  autoFocus
                  className="w-full text-center tracking-widest text-xl font-bold bg-slate-50 border-2 border-slate-300 focus:border-amber-500 rounded-xl py-3 px-12 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg focus:outline-none cursor-pointer transition-colors"
                  title={showPin ? 'إخفاء الرمز' : 'إظهار الرمز'}
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {pinError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <Unlock className="w-4 h-4" />
                <span>فتح لوحة الإدارة</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Admin Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto gap-2">
              <button
                onClick={() => {
                  setActiveTab('add');
                  setEditingArtisanId(null);
                }}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'add'
                    ? 'border-amber-500 text-slate-900 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Plus className="w-4 h-4 text-amber-600" />
                <span>{editingArtisanId ? 'تعديل بيانات الحرفي' : 'إضافة عامل / حرفي جديد'}</span>
              </button>

              <button
                onClick={() => setActiveTab('list')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'list'
                    ? 'border-amber-500 text-slate-900 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-amber-600" />
                <span>قائمة الحرفيين ({artisans.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('owner_settings')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'owner_settings'
                    ? 'border-amber-500 text-slate-900 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-600" />
                <span>إعدادات التواصل معي (انستاغرام وواتساب)</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'backup'
                    ? 'border-amber-500 text-slate-900 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span>النسخ والتهيئة</span>
              </button>
            </div>

            {/* Success alert */}
            {successMessage && (
              <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Tab 1: Add New Artisan Form */}
            {activeTab === 'add' && (
              <form onSubmit={handleAddSubmit} className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-base font-black text-slate-900">
                    {editingArtisanId ? 'تعديل بيانات الحرفي' : 'بيانات الحرفي الجديد المراد إضافته للمنصة'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    أدخل بيانات المعلم وسوف يظهر مباشرة لجميع زوار التطبيق في ولايته.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      اسم الحرفي / المعلم *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: المعلم كمال رويبة"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      تخصص الحرفة (خانة المهن) *
                    </label>
                    <select
                      value={craftId}
                      onChange={(e) => setCraftId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      {CRAFT_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameAr} ({c.nameFr})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      الولاية (1 - 58) *
                    </label>
                    <select
                      value={wilayaId}
                      onChange={(e) => setWilayaId(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      {ALGERIA_WILAYAS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.code} - {w.nameAr} ({w.nameFr})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      البلدية أو الحي *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثلاً: باب الزوار / الحراش"
                      value={baladiya}
                      onChange={(e) => setBaladiya(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      سنوات الخبرة
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم هاتف الاتصال *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0550123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم واتساب (اختياري، يملأ تلقائياً)
                    </label>
                    <input
                      type="tel"
                      placeholder="213550123456"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      التكلفة التقديرية للخدمة
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: المعاينة 1000 دج / تسليك 2500 دج"
                      value={priceEstimate}
                      onChange={(e) => setPriceEstimate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      مناطق التنقل
                    </label>
                    <input
                      type="text"
                      placeholder="كامل الولاية والبلديات المجاورة"
                      value={workZone}
                      onChange={(e) => setWorkZone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    نبذة عن الحرفي والخدمات والخبرات
                  </label>
                  <textarea
                    rows={3}
                    placeholder="اكتب تخصصات المعلم، الأجهزة التي يصلحها، سرعة تلبيته، إلخ..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Flags Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEmergency24h}
                      onChange={(e) => setIsEmergency24h(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      متاح للطوارئ والأعطال المستعجلة 24/7
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isVerified}
                      onChange={(e) => setIsVerified(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      شارة التوثيق (حرفي معتمد ومجرب)
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  {editingArtisanId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingArtisanId(null);
                        setName('');
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingArtisanId ? 'حفظ التعديلات' : 'إضافة الحرفي للمنصة فوراً'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Tab 2: Manage Existing Artisans */}
            {activeTab === 'list' && (
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-black text-slate-900">
                    الحرفيون المسجلون بالمنصة ({artisans.length})
                  </h4>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة حرفي جديد</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {artisans.map((art) => {
                    const craft = CRAFT_CATEGORIES.find((c) => c.id === art.craftId);
                    return (
                      <div
                        key={art.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-slate-900">{art.name}</h5>
                            <span className="text-xs text-amber-700 font-semibold">
                              ({craft?.nameAr})
                            </span>
                            {art.isVerified && (
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex flex-wrap gap-2 mt-1">
                            <span>{art.wilayaName}</span>
                            <span>·</span>
                            <span>{art.baladiya}</span>
                            <span>·</span>
                            <span className="font-mono">{art.phone}</span>
                            <span>·</span>
                            <span className={art.isAvailable ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                              {art.isAvailable ? 'متاح' : 'غير متوفر مؤقتاً'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => onToggleArtisanAvailability(art.id)}
                            className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            {art.isAvailable ? 'تعطيل' : 'تفعيل'}
                          </button>
                          <button
                            onClick={() => handleStartEdit(art)}
                            className="p-1.5 text-slate-600 hover:text-amber-600 bg-white border border-slate-300 rounded-lg cursor-pointer"
                            title="تعديل البيانات"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف الحرفي ${art.name}؟`)) {
                                onDeleteArtisan(art.id);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:text-red-700 bg-white border border-red-200 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Owner Instagram & WhatsApp Settings */}
            {activeTab === 'owner_settings' && (
              <form onSubmit={handleSaveOwnerSettings} className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-base font-black text-slate-900">
                    تعديل بيانات التواصل معك (صاحب المنصة)
                  </h4>
                  <p className="text-xs text-slate-500">
                    هذه البيانات تظهر في خانة "تواصل مع صاحب التطبيق" عبر انستاغرام وواتساب.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      اسم المالك / الصفة
                    </label>
                    <input
                      type="text"
                      value={tempOwnerConfig.founderName}
                      onChange={(e) =>
                        setTempOwnerConfig({ ...tempOwnerConfig, founderName: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم واتساب المالك (مع كود الجزائر 213+)
                    </label>
                    <input
                      type="text"
                      value={tempOwnerConfig.whatsappNumber}
                      onChange={(e) =>
                        setTempOwnerConfig({ ...tempOwnerConfig, whatsappNumber: e.target.value })
                      }
                      placeholder="+213550123456"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم واتساب للعرض في الصفحة
                    </label>
                    <input
                      type="text"
                      value={tempOwnerConfig.whatsappDisplay}
                      onChange={(e) =>
                        setTempOwnerConfig({ ...tempOwnerConfig, whatsappDisplay: e.target.value })
                      }
                      placeholder="0550 12 34 56"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      حساب انستاغرام (Instagram Username)
                    </label>
                    <input
                      type="text"
                      value={tempOwnerConfig.instagramHandle}
                      onChange={(e) => {
                        const handle = e.target.value.replace('@', '');
                        setTempOwnerConfig({
                          ...tempOwnerConfig,
                          instagramHandle: handle,
                          instagramUrl: `https://instagram.com/${handle}`,
                        });
                      }}
                      placeholder="snay3i.dz"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رسالة الترحيب للزوار في خانة التواصل
                  </label>
                  <textarea
                    rows={3}
                    value={tempOwnerConfig.bioMessage}
                    onChange={(e) =>
                      setTempOwnerConfig({ ...tempOwnerConfig, bioMessage: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    حفظ إعدادات التواصل
                  </button>
                </div>
              </form>
            )}

            {/* Tab 4: Backup & Reset */}
            {activeTab === 'backup' && (
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-base font-black text-slate-900">
                    النسخ الاحتياطي وحفظ بيانات الحرفيين
                  </h4>
                  <p className="text-xs text-slate-500">
                    يمكنك تحميل نسخة من الحرفيين بصيغة JSON أو إعادة تعيين البيانات النموذجية الأولية.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h5 className="font-bold text-sm text-slate-900 mb-1">تصدير نسخة احتياطية</h5>
                    <p className="text-xs text-slate-600 mb-4">
                      تحميل جميع بيانات الحرفيين المضافة لحفظها على جهازك.
                    </p>
                    <button
                      onClick={handleExportJson}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>تنزيل ملف النسخة الاحتياطية</span>
                    </button>
                  </div>

                  <div className="p-5 bg-red-50 border border-red-200 rounded-2xl">
                    <h5 className="font-bold text-sm text-red-900 mb-1">إعادة تعيين البيانات</h5>
                    <p className="text-xs text-red-700 mb-4">
                      إعادة المنصة للبيانات النموذجية الأساسية (سيتم حذف الإضافات الجديدة).
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('هل أنت متأكد من استرجاع البيانات النموذجية؟')) {
                          onResetArtisans();
                          setSuccessMessage('تمت استعادة البيانات النموذجية بنجاح.');
                        }
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>استرجاع البيانات الافتراضية</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
