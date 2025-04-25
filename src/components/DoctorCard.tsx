import React from 'react';
import { DoctorData } from '../types';
import { MapPin, Building } from 'lucide-react';

interface DoctorCardProps {
  doctor: DoctorData;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const experienceYears = parseInt(doctor.experience.split(' ')[0]);
  const consultationTypes = [];
  if (doctor.video_consult) consultationTypes.push('Video Consult');
  if (doctor.in_clinic) consultationTypes.push('In Clinic');

  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row">
          <div className="flex mb-4 sm:mb-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
              {doctor.photo ? (
                <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <span>{doctor.name_initials}</span>
                </div>
              )}
            </div>
            
            <div>
              <h3 data-testid="doctor-name" className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
              <p data-testid="doctor-specialty" className="text-gray-600 mt-1">
                {doctor.specialities.map(s => s.name).join(', ')}
              </p>
              <p data-testid="doctor-experience" className="text-gray-600 text-sm mt-1">{doctor.experience}</p>
              <p className="text-gray-500 text-sm mt-1">{doctor.languages.join(', ')}</p>
            </div>
          </div>
          
          <div className="ml-auto text-right mt-2 sm:mt-0">
            <p data-testid="doctor-fee" className="text-xl font-semibold text-gray-800">{doctor.fees}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start mb-2">
            <Building size={18} className="text-gray-500 mr-2 mt-0.5" />
            <span className="text-gray-700">{doctor.clinic.name}</span>
          </div>
          
          <div className="flex items-start">
            <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
            <span className="text-gray-700">
              {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-3 sm:mb-0">
            <div className="flex flex-wrap gap-2">
              {consultationTypes.map((type, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs ${
                    type === 'Video Consult' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-sm font-medium transition-colors duration-200">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;