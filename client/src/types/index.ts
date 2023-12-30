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

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}
