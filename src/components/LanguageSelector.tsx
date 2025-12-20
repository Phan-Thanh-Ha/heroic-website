import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import flagVi from "@/assets/icons/ic-flag-vi.svg";
import flagEn from "@/assets/icons/ic-flag-en.svg";
import flagCn from "@/assets/icons/ic-flag-cn.svg";

type Language = "vi" | "en" | "cn";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "vi", name: "Tiếng Việt", flag: flagVi },
  { code: "en", name: "English", flag: flagEn },
  { code: "cn", name: "中文", flag: flagCn },
];

const LanguageSelector: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("vi");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    setIsOpen(false);
    // TODO: Implement language change logic (i18n, etc.)
    console.log("Language changed to:", lang);
  };

  const currentLangData = languages.find((lang) => lang.code === currentLanguage);
  const availableLanguages = languages.filter((lang) => lang.code !== currentLanguage);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <div className="flex items-center gap-1.5">
            {currentLangData && (
              <img
                src={currentLangData.flag}
                alt={currentLangData.name}
                className="w-5 h-5 object-contain"
              />
            )}
            {isOpen ? (
              <ChevronUp className="h-3 w-3 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={lang.flag}
              alt={lang.name}
              className="w-5 h-5 object-contain"
            />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

