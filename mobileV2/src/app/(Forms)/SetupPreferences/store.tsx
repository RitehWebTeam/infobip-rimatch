import { registerInDevtools, Store } from "pullstate";

interface storeTypes {
  description: string;
  phoneNumber: string;
  location: string;
  favouriteSong: string;
  profileImageUrl: any;
  tags: Array<string>;
  preferences: {
    ageGroupMin: string;
    ageGroupMax: string;
    partnerGender: string;
  };
  progress: number;
}

export const WizardStore = new Store<storeTypes>({
  description: "",
  phoneNumber: "",
  location: "",
  favouriteSong: "",
  profileImageUrl: null,
  tags: [], //* PRomijeni nazad u []
  preferences: {
    ageGroupMin: "",
    ageGroupMax: "",
    partnerGender: "",
  },
  progress: 0,
});

registerInDevtools({
  WizardStore,
});
