import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import { ApplicationTable } from './components/ApplicationTable';
import { ApplicationForm } from './components/ApplicationForm';
import { JobApplication } from './types';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | undefined>();

  useEffect(() => {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const saveApplications = (newApplications: JobApplication[]) => {
    setApplications(newApplications);
    localStorage.setItem('jobApplications', JSON.stringify(newApplications));
  };

  const handleSave = (app: Omit<JobApplication, 'id'>) => {
    if (editingApp) {
      const updated = applications.map(a => 
        a.id === editingApp.id ? { ...app, id: editingApp.id } : a
      );
      saveApplications(updated);
    } else {
      saveApplications([...applications, { ...app, id: uuidv4() }]);
    }
    setEditingApp(undefined);
    setShowForm(false);
  };

  const handleEdit = (app: JobApplication) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      saveApplications(applications.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Job Applications Tracker</h1>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Application
            </button>
          </div>

          <ApplicationTable
            applications={applications}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {showForm && (
            <ApplicationForm
              application={editingApp}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingApp(undefined);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;