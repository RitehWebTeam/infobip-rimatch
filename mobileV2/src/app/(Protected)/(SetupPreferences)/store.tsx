import { registerInDevtools, Store } from "pullstate";

export const WizardStore = new Store({
  description: "",
  phoneNumber: "",
  location: "",
  favouriteSong: "",
  profileImageUrl: "",
  tags: "", //* PRomijeni nazad u []
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
