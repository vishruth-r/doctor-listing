import React from 'react';
import { DoctorData, SearchParams } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterPanelProps {
  doctors: DoctorData[];
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  doctors, 
  searchParams, 
  updateSearchParams 
}) => {
  const getAllSpecialties = (): string[] => {
    const specialtySet = new Set<string>();
    
    doctors.forEach(doctor => {
      doctor.specialities.forEach(spec => {
        specialtySet.add(spec.name);
      });
    });
    
    return Array.from(specialtySet).sort();
  };

  const specialties = getAllSpecialties();

  const handleConsultationTypeChange = (type: string) => {
    updateSearchParams({ consultationType: type });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const currentSpecialties = searchParams.specialty || [];
    let newSpecialties: string[];
    
    if (checked) {
      newSpecialties = [...currentSpecialties, specialty];
    } else {
      newSpecialties = currentSpecialties.filter(s => s !== specialty);
    }
    
    updateSearchParams({ specialty: newSpecialties });
  };

  const handleSortChange = (sortBy: string) => {
    updateSearchParams({ sortBy });
  };

  const CollapsibleSection = ({ 
    title, 
    testId, 
    children 
  }: { 
    title: string; 
    testId: string;
    children: React.ReactNode; 
  }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    
    return (
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          data-testid={testId}
        >
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {isOpen && <div className="pl-1">{children}</div>}
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <button 
          className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
          onClick={() => updateSearchParams({ 
            consultationType: '', 
            specialty: [], 
            sortBy: '' 
          })}
        >
          Clear All
        </button>
      </div>

      <CollapsibleSection title="Consultation Mode" testId="filter-header-moc">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={searchParams.consultationType === 'Video Consult'}
              onChange={() => handleConsultationTypeChange('Video Consult')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Video Consult</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={searchParams.consultationType === 'In Clinic'}
              onChange={() => handleConsultationTypeChange('In Clinic')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">In Clinic</span>
          </label>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Speciality" testId="filter-header-speciality">
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {specialties.map(specialty => (
            <label 
              key={specialty} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace(/[/\s]/g, '-')}`}
                checked={(searchParams.specialty || []).includes(specialty)}
                onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Sort By" testId="filter-header-sort">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={searchParams.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Fees: Low to High</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={searchParams.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Experience: High to Low</span>
          </label>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default FilterPanel;