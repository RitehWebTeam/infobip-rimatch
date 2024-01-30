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
  favouriteSong: string;
  tags: string[];
}

export type ProjectedUser = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "description"
  | "profileImageUrl"
  | "location"
  | "gender"
  | "age"
  | "favouriteSong"
  | "tags"
>;

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
