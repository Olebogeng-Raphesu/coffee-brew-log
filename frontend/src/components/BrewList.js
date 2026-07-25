import { useState, useEffect } from 'react';
import { getBrews, deleteBrew } from '../services/api';
import BrewForm from './BrewForm';

const METHODS = ['All', 'V60', 'French Press', 'Espresso', 'Aeropress', 'Chemex', 'Moka Pot', 'Cold Brew'];

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
    document.title = `Brews: ${brews.length}`;
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">☕ Coffee Brew Log</h1>
      
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <span className="font-medium text-gray-700 mr-2">Filter:</span>
        {METHODS.map(m => (
          <button key={m} onClick={() => setFilter(m)}
            className={`px-3 py-1 rounded-full text-sm transition ${filter === m ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            {m}
          </button>
        ))}
        <span className="ml-auto text-amber-900 font-bold text-lg">Total: {brews.length}</span>
      </div>

      {!showForm && !editing && (
        <button onClick={() => setShowForm(true)}
          className="mb-6 bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-700 transition shadow">
          + New Brew
        </button>
      )}

      {(showForm || editing) && (
        <div className="mb-6">
          <BrewForm brew={editing} onSave={handleSave} 
            onCancel={() => { setShowForm(false); setEditing(null); }} />
        </div>
      )}

      <div className="space-y-4">
        {brews.length === 0 && <p className="text-gray-500 italic text-center py-8">No brews found. Start brewing!</p>}
        {brews.map(brew => (
          <div key={brew.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-amber-600 hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{brew.beanName}</h3>
                <p className="text-amber-700 font-medium">{brew.brewMethod}</p>
                <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span>☕ Grind: {brew.grindSize}</span>
                  <span>🌡️ Temp: {brew.waterTemp}°C</span>
                  <span>⏱️ Time: {brew.brewTime}</span>
                </div>
                {brew.notes && <p className="text-sm text-gray-500 mt-2 italic">"{brew.notes}"</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditing(brew)} 
                  className="text-amber-700 hover:text-amber-900 text-sm font-medium">Edit</button>
                <button onClick={() => handleDelete(brew.id)} 
                  className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}