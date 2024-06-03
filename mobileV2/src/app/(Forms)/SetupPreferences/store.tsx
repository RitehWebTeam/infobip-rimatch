import { Asset } from "@/types/User";
import { registerInDevtools, Store } from "pullstate";

export interface storeTypes {
  description: string;
  phoneNumber: string;
  location: string;
  favouriteSong: string;
  profileImageUrl: Asset | null;
  tags: Array<string>;
  preferences: {
    ageGroupMin: number;
    ageGroupMax: number;
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
    // @ts-ignore
    ageGroupMin: "",
    // @ts-ignore
    ageGroupMax: "",
    partnerGender: "",
  },
  progress: 0,
});

registerInDevtools({
  WizardStore,
});
