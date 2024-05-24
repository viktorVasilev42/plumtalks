import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Typography } from '@mui/joy';
import { useContext } from 'react';
import { SettingsBarContext } from '../page';

export default function SettingsBarButton(props: {
    index: number,
    name: string
}) {
    const settingsBarContext = useContext(SettingsBarContext);

    const handleSettingsBarClick = () => {
        settingsBarContext?.setSelectedSettingsBar(props.index);
    }

    return (
        <div className={`settingsBarButton ${settingsBarContext?.selectedSettingsBar == props.index ? "settingsBarButtonSelected" : ""}`} onClick={handleSettingsBarClick}>
            {(() => {
                switch (props.name) {
                    case "Account": return <PersonOutlineOutlinedIcon style={{fontSize: "2.5vw"}} />
                    case "Appearance": return <ColorLensOutlinedIcon style={{fontSize: "2.5vw"}} />
                    case "About": return <InfoOutlinedIcon style={{fontSize: "2.5vw"}} />
                }
            })()}
            <Typography style={{fontSize: "1vw"}}>{props.name}</Typography>
        </div>
    )
}