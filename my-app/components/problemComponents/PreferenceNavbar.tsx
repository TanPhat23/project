"use client";
import {  FullscreenIcon, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSettings, PlayGroundSettings } from "./PlayGround";
import SettingsModal from "./SettingModal";
import LanguageModal from "./LanguageModal";

type PreferenceNavProps = {
  settings: PlayGroundSettings;
  setSettings: React.Dispatch<React.SetStateAction<PlayGroundSettings>>;
  selectedLanguage: LanguageSettings;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<LanguageSettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  settings,
  setSettings,
  setSelectedLanguage,
  selectedLanguage,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = async () => {
    if (isFullScreen) {
      document.exitFullscreen;
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }
    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenchange", exitHandler);
    }
  });

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <LanguageModal
          setSelectedLanguage={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
        />
      </div>

      <div className="flex items-center m-2">
        <button
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="h-6 w-6 text-dark-gray-6 font-bold text-lg">
            <Settings className="flex items-center w-full" />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-6 w-6 text-dark-gray-6 font-bold text-lg">
            <FullscreenIcon className="flex items-center w-full" />
          </div>
          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};
export default PreferenceNav;
