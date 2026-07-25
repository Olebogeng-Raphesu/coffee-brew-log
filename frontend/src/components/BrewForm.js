import { useState, useEffect } from 'react';
import { createBrew, updateBrew } from '../services/api';

const METHODS = ['V60', 'French Press', 'Espresso', 'Aeropress', 'Chemex', 'Moka Pot', 'Cold Brew'];

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
    if (!form.brewMethod) errs.brewMethod = 'Brew method is required';
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

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 border border-amber-200">
      <h2 className="text-xl font-bold text-amber-900">{brew ? 'Edit Brew' : 'New Brew'}</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Bean Name *</label>
        <input value={form.beanName} onChange={e => setForm({...form, beanName: e.target.value})}
          className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500" />
        {errors.beanName && <p className="text-red-500 text-sm mt-1">{errors.beanName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Brew Method *</label>
        <select value={form.brewMethod} onChange={e => setForm({...form, brewMethod: e.target.value})}
          className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500">
          <option value="">Select method...</option>
          {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        {errors.brewMethod && <p className="text-red-500 text-sm mt-1">{errors.brewMethod}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Grind Size *</label>
          <input value={form.grindSize} onChange={e => setForm({...form, grindSize: e.target.value})}
            className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500" />
          {errors.grindSize && <p className="text-red-500 text-sm mt-1">{errors.grindSize}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Water Temp (°C) *</label>
          <input type="number" value={form.waterTemp} onChange={e => setForm({...form, waterTemp: e.target.value})}
            className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500" />
          {errors.waterTemp && <p className="text-red-500 text-sm mt-1">{errors.waterTemp}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Brew Time *</label>
        <input value={form.brewTime} onChange={e => setForm({...form, brewTime: e.target.value})}
          placeholder="e.g. 3:30" className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500" />
        {errors.brewTime && <p className="text-red-500 text-sm mt-1">{errors.brewTime}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
          className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500" rows="3" />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition">
          {brew ? 'Update' : 'Create'} Brew
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}