export interface LocationSuggestion {
  displayName: string;
  placeId: number;
}

export interface LocationAutocompleteHook {
  value: string;
  onInputChange: (value: string) => void;
  suggestions: LocationSuggestion[];
  loading: boolean;
}

export type JobProps = {
  id: number;
  title: string;
  company: string;
  location: string;
  status: string;
  applicants: number;
  created: string;
};

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  color: string; // 'red', 'green', 'blue', etc.
  timestamp: Date;
}

export interface TRegisterError {
  response: {
    data: {
      message: string;
    };
  };
}
export interface TSettingData {
  password: string,
  name: string,
  email: string,
  // experience: Array,
  website: string,
  industry: string,
  about: string,
  location: string,
  zip: string,
}
export interface TMessageData {
  message: string,
  receiver_id: number,
}

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}
