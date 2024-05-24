import SettingsBarButton from "./SettingsBarButton";

export default function SettingsBar() {
    return (
        <div className="settingsBar">
            <SettingsBarButton 
                name="Account"
                index={0}
            />
            <SettingsBarButton 
                name="Appearance"
                index={1}
            />
            <SettingsBarButton 
                name="About"
                index={2}
            />
        </div>
    )
}