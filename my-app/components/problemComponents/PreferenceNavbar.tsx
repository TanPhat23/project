"use client";
import { FullscreenIcon, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { PlayGroundSettings } from "./PlayGround";
import SettingsModal from "./SettingModal";

type PreferenceNavProps = {
  settings: PlayGroundSettings
  setSettings: React.Dispatch<React.SetStateAction<PlayGroundSettings>>
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({settings, setSettings}) => {
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
    if(document.addEventListener){
      document.addEventListener("fullscreenchange", exitHandler)
      document.addEventListener('webkitfullscreenchange',exitHandler)
      document.addEventListener("mozfullscreenchange",exitHandler)
      document.addEventListener('MSFullscreenchange',exitHandler)
    }
  });
  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2">
              JavaScript
            </div>
          </div>
        </button>
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
      {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings}/>}
    </div>
  );
};
export default PreferenceNav;
