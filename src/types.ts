export interface DoctorSpecialty {
  name: string;
}

export interface ClinicAddress {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url: string;
}

export interface Clinic {
  name: string;
  address: ClinicAddress;
}

export interface DoctorData {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: DoctorSpecialty[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: Clinic;
  video_consult: boolean;
  in_clinic: boolean;
}

export interface SearchParams {
  search?: string;
  consultationType?: string;
  specialty?: string[];
  sortBy?: string;
}