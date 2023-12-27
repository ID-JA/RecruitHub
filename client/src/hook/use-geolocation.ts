import { useQuery } from '@tanstack/react-query';
import { LocationAutocompleteHook, LocationSuggestion } from '../types';
import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';
import axios from 'axios';

export const useGeoLocation = (): LocationAutocompleteHook => {
  const [value, setValue] = useState<string>('');
  const [debounced] = useDebouncedValue(value, 1000);

  const { data, isLoading } = useQuery<LocationSuggestion[]>({
    queryKey: ['locations', debounced],
    queryFn: async () => {
      const response = await axios.post(
        `https://us1.locationiq.com/v1/search?key=pk.4525680c193365007db706981b931bd2&q=${debounced}&format=json`
      );
      if (response.data.length <= 0) {
        return [];
      }

      const locations: LocationSuggestion[] = response.data.map(
        (result: { display_name: string; place_id: number }) => ({
          displayName: result.display_name,
          placeId: result.place_id
        })
      );

      return locations;
    },
    enabled: value.length >= 2,
    retry: false
  });

  const onInputChange = (inputValue: string) => {
    setValue(inputValue);
  };

  return {
    value,
    onInputChange,
    suggestions: data || [],
    loading: isLoading
  };
};
