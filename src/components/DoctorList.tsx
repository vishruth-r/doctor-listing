import React from 'react';
import DoctorCard from './DoctorCard';
import { DoctorData, SearchParams } from '../types';

interface DoctorListProps {
  doctors: DoctorData[];
  searchParams: SearchParams;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, searchParams }) => {
  const getFilteredDoctors = (): DoctorData[] => {
    let filteredDoctors = [...doctors];
    
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase();
      filteredDoctors = filteredDoctors.filter(doctor => {
        const nameMatch = doctor.name.toLowerCase().includes(searchTerm);
        const specialtyMatch = doctor.specialities.some(spec => 
          spec.name.toLowerCase().includes(searchTerm)
        );
        const clinicMatch = doctor.clinic.name.toLowerCase().includes(searchTerm);
        return nameMatch || specialtyMatch || clinicMatch;
      });
    }
    
    if (searchParams.consultationType) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        if (searchParams.consultationType === 'Video Consult') return doctor.video_consult;
        if (searchParams.consultationType === 'In Clinic') return doctor.in_clinic;
        return true;
      });
    }
    
    if (searchParams.specialty && searchParams.specialty.length > 0) {
      filteredDoctors = filteredDoctors.filter(doctor => 
        searchParams.specialty!.some(spec => 
          doctor.specialities.some(s => s.name === spec)
        )
      );
    }
    
    if (searchParams.sortBy) {
      if (searchParams.sortBy === 'fees') {
        filteredDoctors.sort((a, b) => {
          const aFees = parseInt(a.fees.replace(/[^\d]/g, ''));
          const bFees = parseInt(b.fees.replace(/[^\d]/g, ''));
          return aFees - bFees;
        });
      } else if (searchParams.sortBy === 'experience') {
        filteredDoctors.sort((a, b) => {
          const aExp = parseInt(a.experience.split(' ')[0]);
          const bExp = parseInt(b.experience.split(' ')[0]);
          return bExp - aExp;
        });
      }
    }
    
    return filteredDoctors;
  };

  const filteredDoctors = getFilteredDoctors();

  return (
    <div>
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">No doctors found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
          </div>
          
          <div className="space-y-4">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorList;