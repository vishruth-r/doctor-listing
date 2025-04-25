import React, { useState, useEffect, useRef } from 'react';
import { DoctorData, SearchParams } from '../types';
import { Search } from 'lucide-react';

interface DoctorSearchProps {
  doctors: DoctorData[];
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({ 
  doctors, 
  searchParams, 
  updateSearchParams 
}) => {
  const [inputValue, setInputValue] = useState(searchParams.search || '');
  const [suggestions, setSuggestions] = useState<DoctorData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const filteredDoctors = doctors.filter(doctor => {
        const nameMatch = doctor.name.toLowerCase().includes(inputValue.toLowerCase());
        const specialtyMatch = doctor.specialities.some(spec => 
          spec.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        const clinicMatch = doctor.clinic.name.toLowerCase().includes(inputValue.toLowerCase());
        return nameMatch || specialtyMatch || clinicMatch;
      });
      
      setSuggestions(filteredDoctors.slice(0, 3));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (searchTerm: string = inputValue) => {
    updateSearchParams({ search: searchTerm });
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: DoctorData) => {
    setInputValue(suggestion.name);
    handleSearch(suggestion.name);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full py-3 px-4 pr-12 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => inputValue.trim().length > 0 && setShowSuggestions(true)}
        />
        <button 
          onClick={() => handleSearch()} 
          className="absolute right-3 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-auto"
        >
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              data-testid="suggestion-item"
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-none flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden flex-shrink-0">
                {suggestion.photo ? (
                  <img src={suggestion.photo} alt={suggestion.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="w-full h-full flex items-center justify-center">{suggestion.name_initials}</span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">{suggestion.name}</p>
                <p className="text-sm text-gray-600">{suggestion.specialities.map(s => s.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;