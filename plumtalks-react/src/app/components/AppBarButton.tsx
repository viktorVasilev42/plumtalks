"use client"
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import { Typography } from '@mui/joy';
import React, { useContext, useRef } from 'react';
import { AppBarContext } from '../page';

export default function AppBarButton(props: {
    index: number,
    iconName: string,
    onClick: (index: number) => void
}) {
    const animButtonRef = useRef<HTMLDivElement>(null);
    const appBarContext = useContext(AppBarContext);
    
    const animationButtonEnter = () => {
        if (animButtonRef.current) animButtonRef.current.className = "animationButton hoveredAnimationButton";
    }

    const animationButtonLeave = () => {
        if (animButtonRef.current) animButtonRef.current.className = "animationButton";
    }

    return (
        <div className={`appBarButton ${appBarContext?.selectedAppBar == props.index ? "appBarButtonSelected" : ""}`} onMouseEnter={animationButtonEnter} onMouseLeave={animationButtonLeave} onClick={() => props.onClick(props.index)}>
            {(() => {
                switch (props.iconName) {
                    case "timeline": return <WatchLaterIcon style={{fontSize: "2.5vw"}} />
                    case "messages": return <ForumIcon style={{fontSize: "2.5vw"}} />
                    case "contacts": return <PersonIcon style={{fontSize: "2.5vw"}} />
                    case "deleted": return <CancelIcon style={{fontSize: "2.5vw"}} />
                    case "Settings": return <SettingsIcon style={{fontSize: "2.5vw"}} />
                    case "logout": return <LogoutIcon style={{fontSize: "2.5vw"}} />
                    case "help": return <HelpIcon style={{fontSize: "2.5vw"}} />
                }
            })()}

            <Typography level="title-lg" style={{color: "white", fontSize: "1.1vw"}}>{props.iconName}</Typography>

            <div className="animationButton" ref={animButtonRef}></div>
        </div>
    );
}
