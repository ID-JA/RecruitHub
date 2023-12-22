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
