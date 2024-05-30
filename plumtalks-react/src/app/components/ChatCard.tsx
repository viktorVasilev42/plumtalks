import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { Typography } from '@mui/joy';
import LegendBadge from './LegendBadge';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { ContactContext } from '../page';
import "./styles/chatCard.css";

export default function ChatCard(props: {
    title: string,
    timestamp: Date,
    message: string,
    contactId: number,
    legendBadgeColor: string,
    currChatCardMenu: number,
    setCurrChatCardMenu: (val: number) => void;
}) {
    const dateFromTimeStamp = new Date(props.timestamp);
    const contactContext = useContext(ContactContext);
    const [currMousePosition, setCurrMousePosition] = useState<MousePositionInterface>({x: 30, y: 50});

    const handleChatCardClick = () => {
        contactContext?.setSelectedContact(props.contactId);
    }

    const handleChatCardRightClick = (e: MouseEvent) => {
        e.preventDefault();
        if (props.currChatCardMenu != props.contactId) setCurrMousePosition({x: e.clientX, y: e.clientY});
        props.setCurrChatCardMenu(props.contactId);
    }

    useEffect(() => {
        window.addEventListener("resize", () => props.setCurrChatCardMenu(-1));

        return () => {
            window.removeEventListener("resize", () => props.setCurrChatCardMenu(-1));
        }
    }, [props]);

    return (
        <div className={`chatCard ${(contactContext?.selectedContact == props.contactId) ? "chatCardSelected" : ""}`} onClick={handleChatCardClick} onContextMenu={(e) => handleChatCardRightClick(e)}>
            <div 
                style={{
                    height: "23vh", width: "5vw",
                    display: "flex",
                }}
            >
                <SupervisedUserCircleOutlinedIcon style={{fontSize: "5vw"}} />
            </div>
            <div
                style={{
                    height: "23vh", width: "18.75vw",
                    display: "flex", flexDirection: "column",
                    paddingTop: "1vh", overflow: "hidden"
                }}
            >
                <Typography level="title-lg" fontSize={"0.9vw"}>{props.title}</Typography>
                <Typography level="body-xs" fontSize={"0.6vw"}>{`${dateFromTimeStamp.toDateString()} ${dateFromTimeStamp.getHours()}:${dateFromTimeStamp.getMinutes()}`}</Typography>
                <Typography fontSize={"0.8vw"}>{(props.message.length > 240 ? `${props.message.substring(0, 240)}...` : props.message)}</Typography>
            </div>
            <div
                style={{
                    height: "23vh", width: "0.25vw",
                    display: "flex", flexDirection: "column",
                    paddingTop: "1vh"
                }}
            >
                <LegendBadge color={props.legendBadgeColor} />
            </div>

            <div
                className={`chatCardMenu ${props.currChatCardMenu == props.contactId && "chatCardMenuActive"}`}
                style={{
                    display: "flex",
                    position: "absolute", left: currMousePosition.x, top: currMousePosition.y,
                }}
            >
                {props.currChatCardMenu == props.contactId && (
                    <div>
                        <div className="chatCardMenuItem" onClick={(e) => console.log("EJJJJ")}>
                            <div className="itemBadge">
                                <div style={{backgroundColor: "rgb(205, 10, 92)", borderRadius: "50%", height: "1vh", width: "1vh"}}></div>
                            </div>
                            <div className="itemText">Family</div>
                        </div>
                        <div className="chatCardMenuItem">
                            <div className="itemBadge">
                                <div style={{backgroundColor: "rgb(232, 171, 58)", borderRadius: "50%", height: "1vh", width: "1vh"}}></div>
                            </div>
                            <div className="itemText">Work</div>
                        </div>
                        <div className="chatCardMenuItem">
                            <div className="itemBadge">
                                <div style={{backgroundColor: "rgb(82, 207, 177)", borderRadius: "50%", height: "1vh", width: "1vh"}}></div>
                            </div>
                            <div className="itemText">Friends</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}