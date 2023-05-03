import { useState } from "react";
import {
  InputContainer,
  InputField,
  InputLabel,
  InputSearchResultItemStyle,
  InputSearchResultStyle,
} from "../../utils/styles";
import styles from "./index.module.scss";

interface options {
  value: string;
  label: string;
}
type Props = {
  options: options[];
  onChange: any;
  value: any;
};
export const SearchDropdown = ({ options, onChange, value }: Props) => {
  const [filteredOptions, setFilteredOptions] = useState<options[]>(options);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchInputValue = e.target.value;
    const filteredOptions = options.filter((option) => {
      console.log("searchInput", searchInputValue);
      return option.label
        .toLowerCase()
        .includes(searchInputValue.toLowerCase());
    });
    onChange(e.target.value);
    if (e.target.value === "") return setFilteredOptions([]);
    console.log("filteredOptions", filteredOptions);
    setFilteredOptions(filteredOptions);

    return filteredOptions;
  };
  const handleChosen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    console.log("clicked", value);
    onChange(value);
    setFilteredOptions([]);
  };

  return (
    <>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField onChange={(e) => handleChange(e)} value={value} />
      </InputContainer>

      <InputSearchResultStyle
        height={filteredOptions.length === 0 ? "0" : "auto"}
      >
        {filteredOptions.map((option, i) => {
          return (
            <InputSearchResultItemStyle
              key={i}
              onClick={(e) => handleChosen(e, option.value)}
              className={styles.inputResultSearchInteractive}
            >
              {option.label} and {option.value}
            </InputSearchResultItemStyle>
          );
        })}
      </InputSearchResultStyle>
    </>
  );
};
