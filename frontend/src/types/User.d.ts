export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  gender: string;
  age: number;
  active: boolean;
  description: string;
  profileImageUrl: string;
  phoneNumber: string;
  location: string;
  preferences: UserPreferences;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

interface UserPreferences {
  ageGroupMin: number;
  ageGroupMax: number;
  partnerGender: string;
}

export interface PreferencesInitData {
  description: string;
  profileImageUrl: string;
  phoneNumber: string;
  location: string;
  preferences: UserPreferences;
}