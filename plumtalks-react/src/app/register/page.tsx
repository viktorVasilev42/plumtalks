"use client"
import { useContext, useState } from "react";
import "./register.css";
import { Alert, Button, Card, Input, Typography } from "@mui/joy";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { Collapse } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "../layout";

export default function Register() {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [warnColOpen, setWarnColOpen] = useState(false);
    const authContext = useContext(AuthContext);

    const handleRegister = async () => {
        let registerRes = await authContext?.handleRegister(emailValue, passwordValue);
        if (!registerRes) {
            setWarnColOpen(true);
        }
    }

    return (
        <div className="registerContainer">
            <Card 
                sx={{
                    height: "50vh", width: "30vw",
                    display: "flex", flexDirection: "column", gap: "2vh",
                    justifyContent: "center", alignItems: "center",
                    padding: "1vw", 
                    borderWidth: "0.1vw", borderRadius: "0.7vw"
                }}
            >
                <Typography
                    startDecorator={<LockPersonOutlinedIcon style={{ fontSize: "1vw" }} />}
                    sx={{ 
                        fontSize: "1vw",
                        "--Typography-gap": "0.5vw"
                    }}

                >
                    Create a new account
                </Typography>
                <Collapse in={warnColOpen}>
                    <Alert 
                        startDecorator={<BlockIcon style={{fontSize: "1vw"}} />}
                        endDecorator={<CloseIcon style={{fontSize: "1vw", cursor: "pointer"}} onClick={() => setWarnColOpen(false)} />}
                        color="danger"
                        sx={{
                            height: "5vh", width: "13vw", fontSize: "0.8vw",
                            padding: "0vw 0.5vw 0vw 0.5vw", gap: "1vw",
                            borderRadius: "1vw"
                        }}
                    >
                        Register failed.
                    </Alert>
                </Collapse>
                <div className="textBoxDiv">
                    <Input
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        color="primary" 
                        variant="soft"
                        placeholder="E-mail"
                        sx={{
                            height: "5vh", width: "15vw", fontSize: "0.8vw",
                            "--Input-minHeight": "4vh",
                            "--Input-radius": "8vw",
                            "--Input-gap": "0.3vw",
                            "--Input-paddingInline": "0.8vw",
                        }} 
                    />
                    <Input 
                        type="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        color="primary"
                        variant="soft"
                        placeholder="Password"
                        sx={{
                            height: "5vh", width: "15vw", fontSize: "0.8vw",
                            "--Input-minHeight": "4vh",
                            "--Input-radius": "8vw",
                            "--Input-gap": "0.3vw",
                            "--Input-paddingInline": "0.8vw"
                        }} 
                    />
                </div>
                <Button 
                    startDecorator={<LoginIcon style={{ fontSize: "1vw" }} />}
                    sx={{
                        height: "4vh", width: "6vw", gap: "0.2vw",
                        fontSize: "0.8vw", borderRadius: "0.3vw",
                        padding: "0vw", margin: "0vw",
                        "--Button-gap": "0.3vw",
                        "--Button-paddingInline": "0.2vw",
                        "--Button-minHeight": "4vh"
                    }}
                    onClick={handleRegister}
                >
                    Log In
                </Button>      
            </Card>
        </div>
    )
}