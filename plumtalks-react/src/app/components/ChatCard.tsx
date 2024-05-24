import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { Typography } from '@mui/joy';
import LegendBadge from './LegendBadge';
import { useContext } from 'react';
import { ContactContext } from '../page';

export default function ChatCard(props: {
    title: string,
    timestamp: Date,
    message: string,
    contactId: number,
    legendBadgeColor: string
}) {
    const dateFromTimeStamp = new Date(props.timestamp);
    const contactContext = useContext(ContactContext);

    const handleChatCardClick = () => {
        contactContext?.setSelectedContact(props.contactId);
    }

    return (
        <div className={`chatCard ${(contactContext?.selectedContact == props.contactId) ? "chatCardSelected" : ""}`} onClick={handleChatCardClick}>
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
        </div>
    );
}