import React from 'react';
import { useEffect, useState } from 'react';
import DoctorSearch from './components/DoctorSearch';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { useSearchParams } from './hooks/useSearchParams';
import { DoctorData } from './types';
import './index.css';

function App() {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { searchParams, updateSearchParams } = useSearchParams();

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-600 text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 p-4 shadow-md">
        <div className="container mx-auto">
          <DoctorSearch 
            doctors={doctors} 
            searchParams={searchParams} 
            updateSearchParams={updateSearchParams} 
          />
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <FilterPanel 
            doctors={doctors} 
            searchParams={searchParams} 
            updateSearchParams={updateSearchParams} 
          />
        </aside>
        
        <section className="w-full md:w-3/4 lg:w-4/5">
          <DoctorList 
            doctors={doctors} 
            searchParams={searchParams} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;