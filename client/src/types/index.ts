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
