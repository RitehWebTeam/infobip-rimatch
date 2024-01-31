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

export type UserUpdateData = Partial<{
  age: number;
  description: string;
  phoneNumber: string;
  location: string;
  preferences: UserPreferences; // You need to define this type
  firstName: string;
  lastName: string;
  gender: string;
  favouriteSong: string;
  tags: string[];
}>;

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
  favouriteSong: string;
  tags: string[];
}
