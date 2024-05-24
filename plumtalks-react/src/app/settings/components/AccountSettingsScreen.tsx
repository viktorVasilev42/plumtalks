import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Input } from '@mui/joy';
import { useContext, useState } from 'react';
import { SettingsHookContext } from '../page';

export default function AccountSettingsScreen() {
    const [newDisplayName, setNewDisplayName] = useState("");
    const settingsContext = useContext(SettingsHookContext);

    const handleSubmitDisplayName = () => {
        settingsContext?.updateDisplayName(newDisplayName);
    }

    return (
        <div className="accountSettingsScreen">
            <AccountCircleIcon style={{fontSize: "5vw"}} />
            <div className="profileForm">
                <div className="credentials">
                    <Input
                        color="primary" 
                        placeholder="e-mail"
                        disabled
                        sx={{
                            height: "5vh", width: "20vw", fontSize: "0.8vw", borderWidth: "1h",
                            "--Input-minHeight": "4vh",
                            "--Input-radius": "0.5vw",
                            "--Input-gap": "0.3vw",
                            "--Input-paddingInline": "0.8vw",
                        }} 
                    />
                    <Input
                        color="primary" 
                        placeholder="password"
                        disabled
                        sx={{
                            height: "5vh", width: "12vw", fontSize: "0.8vw", borderWidth: "1h",
                            "--Input-minHeight": "4vh",
                            "--Input-radius": "0.5vw",
                            "--Input-gap": "0.3vw",
                            "--Input-paddingInline": "0.8vw",
                        }} 
                    />
                    <Button
                        variant="soft"
                        sx={{
                            height: "2.5vw", width: "2.5vw", gap: "0.2vw",
                            fontSize: "0.8vw", borderRadius: "0.3vw",
                            padding: "0vw", margin: "0vw",
                            "--Button-gap": "0.3vw",
                            "--Button-paddingInline": "0vw",
                            "--Button-minHeight": "4vh"
                        }}
                    >
                        <EditIcon style={{fontSize: "1vw"}} />
                    </Button>
                </div>
                <div className="displayPart">
                    <Input
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        placeholder="display name"
                        variant="outlined"
                        sx={{
                            height: "5vh", width: "20vw", fontSize: "0.8vw", borderWidth: "1h",
                            "--Input-minHeight": "4vh",
                            "--Input-radius": "0.5vw",
                            "--Input-gap": "0.3vw",
                            "--Input-paddingInline": "0.8vw",
                        }} 
                    />
                    <Button
                        onClick={handleSubmitDisplayName}
                        sx={{
                            height: "5vh", width: "5vw", gap: "0.2vw",
                            fontSize: "0.8vw", borderRadius: "0.3vw",
                            padding: "0vw", margin: "0vw",
                            "--Button-gap": "0.3vw",
                            "--Button-paddingInline": "0vw",
                            "--Button-minHeight": "4vh"
                        }}
                    >
                        Update
                    </Button>
                    <div style={{width: "9.5vw"}}></div>
                </div>
            </div>
        </div>
    )
}