"use client";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "../layout";
import CircularProgress from '@mui/joy/CircularProgress';
import "./settings.css";
import SettingsBar from "./components/SettingsBar";
import AccountSettingsScreen from "./components/AccountSettingsScreen";
import useSettings from "../hooks/useSettings";

export const SettingsBarContext = createContext<SettingsBarContextInterface | null>(null);
export const SettingsHookContext = createContext<SettingsHookContextInterface | null>(null);

export default function Settings() {
    const authContext = useContext(AuthContext);
    const [selectedSettingsBar, setSelectedSettingsBar] = useState(0);
    const settingsHook = useSettings();
    
    return (
        <div>
            {authContext?.isLoading ? (
                <div style={{display: "flex", height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center"}}>
                    <CircularProgress size="lg" />
                </div>
            ) : (
                <div className="settingsContainer">
                    <SettingsBarContext.Provider value={{selectedSettingsBar, setSelectedSettingsBar}}>
                    <SettingsHookContext.Provider value={settingsHook}>
                        <SettingsBar />
                        <div className="settingsActiveScreen">
                            {(() => {
                                switch (selectedSettingsBar) {
                                    case 0: return <AccountSettingsScreen />
                                    default: <div></div>
                                }
                            })()}
                        </div>
                    </SettingsHookContext.Provider>
                    </SettingsBarContext.Provider>
                </div>
            )}
        </div>
    )
}