"use client";
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// Assets
import { SiOpenstreetmap } from "react-icons/si";
import { GrClear } from "react-icons/gr";
import truncate from "@/utils/truncate";
import { useAppStore } from "@/store";

export default function LocationInput({ handleChange }: any) {
  const [address, setAddress] = useState<string | undefined | null>("");
  const { setLocation } = useAppStore();

  const handleClear = () => {
    setAddress(null);
    setLocation(null);
    handleChange(null);
  };

  const handleSelect = (address: string) => {
    setAddress(address);
    handleChange(address);

    geocodeByAddress(address)
      .then(([result]) => {
        setAddress(result.formatted_address);
        setLocation(result.formatted_address);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={address as string}
      onChange={setAddress}
      onError={(e) => console.log({ e })}
      onSelect={handleSelect}
      searchOptions={{ types: ["address"] }}
    >
      {({ getInputProps, suggestions, loading, getSuggestionItemProps }) => (
        <div>
          <div className="flex flex-row w-full items-center">
            <div onClick={() => handleClear()}>
              <GrClear size={22} />
            </div>
            <input
              {...getInputProps({
                placeholder: "Type your location",
                autoFocus: true,
                className:
                  "location-search-input py-2 outline-none flex-1 px-12 ml-6",
              })}
            />
            <SiOpenstreetmap size={22} />
          </div>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, idx) => (
              <div
                {...getSuggestionItemProps(suggestion)}
                key={suggestion.placeId}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
