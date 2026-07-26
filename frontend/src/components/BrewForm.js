import { useState, useEffect } from 'react';
import { createBrew, updateBrew } from '../services/api';

const METHODS = ['V60', 'French Press', 'Espresso', 'Aeropress', 'Chemex', 'Moka Pot', 'Cold Brew'];

const BeanIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C7.5 2 4 6.5 4 10c0 3.5 2.5 8 8 8s8-4.5 8-8c0-3.5-3.5-8-8-8z"/>
    <path d="M12 6c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z"/>
  </svg>
);

const ThermometerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const GearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const NoteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function BrewForm({ brew, onSave, onCancel }) {
  const [form, setForm] = useState({
    beanName: '', brewMethod: '', grindSize: '', waterTemp: '', brewTime: '', notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (brew) setForm({ ...brew, waterTemp: brew.waterTemp.toString() });
  }, [brew]);

  const validate = () => {
    const errs = {};
    if (!form.beanName.trim()) errs.beanName = 'Bean name is required';
    if (!form.brewMethod) errs.brewMethod = 'Pick a brew method';
    if (!form.grindSize.trim()) errs.grindSize = 'Grind size is required';
    if (!form.waterTemp) errs.waterTemp = 'Water temperature is required';
    if (!form.brewTime.trim()) errs.brewTime = 'Brew time is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const payload = { ...form, waterTemp: parseInt(form.waterTemp) };
      if (brew) {
        await updateBrew(brew.id, payload);
      } else {
        await createBrew(payload);
      }
      onSave();
    } catch (err) {
      alert('Failed to save brew');
    }
  };

  const inputClass = "w-full bg-brewd-input-bg border-2 border-brewd-border rounded-2xl px-5 py-3.5 text-sm font-semibold text-brewd-primary-dark placeholder-brewd-muted-light focus:outline-none focus:border-brewd-primary focus:ring-4 focus:ring-brewd-primary/10 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brewd-primary-dark/40 backdrop-blur-sm animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-6 sm:p-8 shadow-brewd-lg border-2 border-brewd-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brewd-primary to-brewd-primary-light flex items-center justify-center shadow-brewd-btn">
              <BeanIcon />
              <div className="text-white ml-0.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="none">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-brewd-primary-dark font-display tracking-tight">
              {brew ? 'Edit Brew' : 'New Brew'}
            </h2>
          </div>
          {onCancel && (
            <button type="button" onClick={onCancel} className="w-10 h-10 rounded-full bg-brewd-bg flex items-center justify-center text-brewd-muted hover:text-brewd-primary-dark hover:bg-brewd-border transition-colors">
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Bean Name */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-xs font-bold text-brewd-muted uppercase tracking-wider mb-2.5">
            <BeanIcon /> Bean Name
          </label>
          <input
            value={form.beanName}
            onChange={e => setForm({ ...form, beanName: e.target.value })}
            placeholder="e.g. Ethiopian Yirgacheffe"
            className={inputClass}
          />
          {errors.beanName && <p className="text-brewd-danger text-xs mt-1.5 font-bold flex items-center gap-1">⚠ {errors.beanName}</p>}
        </div>

        {/* Brew Method Pills */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-xs font-bold text-brewd-muted uppercase tracking-wider mb-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            Brew Method
          </label>
          <div className="flex flex-wrap gap-2">
            {METHODS.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setForm({ ...form, brewMethod: m })}
                className={`px-4 py-2.5 rounded-full text-sm font-bold font-display transition-all transform active:scale-95 ${
                  form.brewMethod === m
                    ? 'bg-brewd-primary text-white shadow-brewd-btn scale-105'
                    : 'bg-brewd-input-bg text-brewd-muted border-2 border-brewd-border hover:border-brewd-primary-light hover:text-brewd-primary'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {errors.brewMethod && <p className="text-brewd-danger text-xs mt-1.5 font-bold">⚠ {errors.brewMethod}</p>}
        </div>

        {/* Grid: Grind + Temp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-brewd-muted uppercase tracking-wider mb-2.5">
              <GearIcon /> Grind Size
            </label>
            <input
              value={form.grindSize}
              onChange={e => setForm({ ...form, grindSize: e.target.value })}
              placeholder="e.g. Medium-Fine"
              className={inputClass}
            />
            {errors.grindSize && <p className="text-brewd-danger text-xs mt-1.5 font-bold">⚠ {errors.grindSize}</p>}
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-brewd-muted uppercase tracking-wider mb-2.5">
              <ThermometerIcon /> Water Temp (°C)
            </label>
            <input
              type="number"
              value={form.waterTemp}
              onChange={e => setForm({ ...form, waterTemp: e.target.value })}
              placeholder="e.g. 93"
              className={inputClass}
            />
            {errors.waterTemp && <p className="text-brewd-danger text-xs mt-1.5 font-bold">⚠ {errors.waterTemp}</p>}
          </div>
        </div>

        {/* Brew Time */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-xs font-bold text-brewd-muted uppercase tracking-wider mb-2.5">
            <ClockIcon /> Brew Time
          </label>
          <input
            value={form.brewTime}
            onChange={e => setForm({ ...form, brewTime: e.target.value })}
            placeholder="e.g. 3:30"
            className={inputClass}
          />
          {errors.brewTime && <p className="text-brewd-danger text-xs mt-1.5 font-bold">⚠ {errors.brewTime}</p>}
        </div>

        {/* Notes */}
        <div className="mb-7">
          <label className="flex items-center gap-2 text-xs font-bold text-brewd-muted uppercase tracking-wider mb-2.5">
            <NoteIcon /> Notes
          </label>
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="How did it taste? Any observations?"
            className={`${inputClass} resize-none`}
            rows="3"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-brewd-primary to-brewd-primary-light text-white font-bold font-display text-lg py-3.5 rounded-2xl shadow-brewd-btn hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {brew ? 'Update Brew' : 'Create Brew'} ☕
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3.5 rounded-2xl bg-brewd-bg text-brewd-muted font-bold font-display text-lg hover:bg-brewd-border transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}