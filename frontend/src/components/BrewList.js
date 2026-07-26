import { useState, useEffect } from 'react';
import { getBrews, deleteBrew } from '../services/api';
import BrewForm from './BrewForm';

const METHODS = ['All', 'V60', 'French Press', 'Espresso', 'Aeropress', 'Chemex', 'Moka Pot', 'Cold Brew'];

const CoffeeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const ThermometerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const GearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const NoteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const EmptyMugIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C4C2E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const getMethodColor = (method) => {
  const colors = {
    'V60': 'bg-orange-100 text-orange-700 border-orange-200',
    'French Press': 'bg-amber-100 text-amber-700 border-amber-200',
    'Espresso': 'bg-stone-200 text-stone-700 border-stone-300',
    'Aeropress': 'bg-sky-100 text-sky-700 border-sky-200',
    'Chemex': 'bg-teal-100 text-teal-700 border-teal-200',
    'Moka Pot': 'bg-red-100 text-red-700 border-red-200',
    'Cold Brew': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };
  return colors[method] || 'bg-brewd-bg text-brewd-muted border-brewd-border';
};

export default function BrewList() {
  const [brews, setBrews] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBrews = async () => {
    try {
      const method = filter === 'All' ? null : filter;
      const res = await getBrews(method);
      setBrews(res.data);
    } catch (err) {
      console.error('Failed to fetch brews', err);
    }
  };

  useEffect(() => {
    fetchBrews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    document.title = `Brew'd — ${brews.length} cup${brews.length !== 1 ? 's' : ''}`;
  }, [brews]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brew?')) return;
    try {
      await deleteBrew(id);
      fetchBrews();
    } catch (err) {
      alert('Failed to delete brew');
    }
  };

  const handleSave = () => {
    setEditing(null);
    setShowForm(false);
    fetchBrews();
  };

  return (
    <div className="min-h-screen bg-brewd-bg font-body pb-24">
      
      {/* Header */}
      <header className="bg-gradient-to-br from-brewd-primary via-brewd-primary to-brewd-primary-light text-white pt-8 pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/10 blur-xl"/>
        <div className="absolute bottom-0 left-10 w-16 h-16 rounded-full bg-white/10 blur-lg"/>
        <div className="absolute top-10 left-1/3 w-8 h-8 rounded-full bg-white/20"/>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <CoffeeIcon />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight">Brew'd</h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base font-medium ml-1">Track every perfect cup ☕</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        
        {/* Stats Card */}
        <div className="bg-white rounded-3xl p-5 shadow-brewd border border-brewd-border mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-brewd-muted uppercase tracking-wider mb-1">Total Brews</p>
            <p className="text-3xl font-extrabold text-brewd-primary-dark font-display">{brews.length}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brewd-primary/10 to-brewd-primary-light/10 flex items-center justify-center">
            <CoffeeIcon />
            <span className="text-brewd-primary font-bold text-lg ml-1 font-display">{brews.length}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-6">
          <p className="text-xs font-bold text-brewd-muted uppercase tracking-wider mb-3">Filter by method</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {METHODS.map(m => (
              <button
                key={m}
                onClick={() => setFilter(m)}
                className={`px-4 py-2.5 rounded-full text-sm font-bold font-display whitespace-nowrap transition-all transform active:scale-95 ${
                  filter === m
                    ? 'bg-brewd-primary text-white shadow-brewd-btn'
                    : 'bg-white text-brewd-muted border-2 border-brewd-border hover:border-brewd-primary-light hover:text-brewd-primary'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Brew Cards */}
        <div className="space-y-4">
          {brews.length === 0 && (
            <div className="bg-white rounded-3xl p-12 shadow-brewd border border-brewd-border text-center">
              <div className="flex justify-center mb-4">
                <EmptyMugIcon />
              </div>
              <p className="text-brewd-muted font-bold text-lg font-display mb-1">No brews yet!</p>
              <p className="text-brewd-muted-light text-sm">Tap the + button to add your first brew.</p>
            </div>
          )}
          
          {brews.map(brew => (
            <div key={brew.id} className="bg-white rounded-3xl p-5 sm:p-6 shadow-brewd border border-brewd-border hover:shadow-brewd-lg transition-all group">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Method Badge + Name */}
                  <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getMethodColor(brew.brewMethod)}`}>
                      {brew.brewMethod}
                    </span>
                    <h3 className="font-bold text-lg text-brewd-primary-dark font-display truncate">{brew.beanName}</h3>
                  </div>
                  
                  {/* Meta Row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-brewd-muted font-semibold mb-3">
                    <span className="flex items-center gap-1.5">
                      <GearIcon /> {brew.grindSize}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ThermometerIcon /> {brew.waterTemp}°C
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon /> {brew.brewTime}
                    </span>
                  </div>
                  
                  {/* Notes */}
                  {brew.notes && (
                    <p className="text-sm text-brewd-muted-light italic flex items-start gap-1.5">
                      <span className="mt-0.5 shrink-0"><NoteIcon /></span>
                      <span className="line-clamp-2">{brew.notes}</span>
                    </p>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setEditing(brew)}
                    className="w-10 h-10 rounded-xl bg-brewd-bg flex items-center justify-center text-brewd-primary hover:bg-brewd-primary hover:text-white transition-all"
                    title="Edit"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(brew.id)}
                    className="w-10 h-10 rounded-xl bg-brewd-danger-bg flex items-center justify-center text-brewd-danger hover:bg-brewd-danger hover:text-white transition-all"
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      {!showForm && !editing && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-brewd-primary to-brewd-primary-light text-white shadow-brewd-btn hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-40"
          aria-label="Add new brew"
        >
          <PlusIcon />
        </button>
      )}

      {/* Form Modal */}
      {(showForm || editing) && (
        <BrewForm
          brew={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}