import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { Typography } from '@mui/joy';
import { useContext } from 'react';
import { ContactContext } from '../page';

export default function ProfileCard(props: {
    profile: ProfileInterface;
    index: number;
}) {
    const contactContext = useContext(ContactContext);

    const handleProfileCardClick = () => {
        contactContext?.setPrevContact(contactContext.selectedContact);
        contactContext?.setSelectedContact(props.index);
    }

    return (
        <div className={`profileCard ${contactContext?.selectedContact == props.index ? "profileCardSelected" : ""}`} onClick={handleProfileCardClick}>
            <div 
                style={{
                    height: "23vh", width: "5vw",
                    display: "flex", alignItems: "center",
                }}
            >
                <SupervisedUserCircleOutlinedIcon style={{fontSize: "5vw"}} />
            </div>
            <div
                style={{
                    height: "23vh", width: "19vw",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    paddingTop: "1vh", overflow: "hidden"
                }}
            >
                <Typography level="title-lg" fontSize={"0.9vw"}>{props.profile.displayName}</Typography>
                <Typography level="body-xs" fontSize={"0.6vw"}>Last logged in: 00:19</Typography>
            </div>
        </div>
    );
}