"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { LanguageSettings } from "./PlayGround";
import { useState } from "react";
import { languages } from "@/lib/languages";

export interface LanguageModalProps {
  selectedLanguage: LanguageSettings;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<LanguageSettings>>;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  setSelectedLanguage,
  selectedLanguage,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedLanguage.language);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2  font-medium h-9"
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : selectedLanguage.language}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px]  px-2 font-medium hover:cursor-pointer">
        <Command>
          <CommandInput placeholder="Search a language" />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map((language) => (
              <CommandItem
                key={language.value}
                value={language.value}
                onSelect={(currentValue) => {
                  console.log(currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setSelectedLanguage({
                    ...selectedLanguage,
                    language: currentValue,
                  });
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === language.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default LanguageModal;
