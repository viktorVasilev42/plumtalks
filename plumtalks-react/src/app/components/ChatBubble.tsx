import "./styles/chatBubble.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ChatBubble(props: {
    direction: string,
    text: string
}) {
    return (
        <div>
            {props.direction == "left" && (
                <div className="chatBubbleLeft">
                    <AccountCircleIcon style={{fontSize: "4vw", marginTop: "3vh", color: "darkcyan"}} />
                    <div className={`bubble ${props.direction}`}>{props.text}</div>
                </div>
            )}

            {props.direction == "right" && (
                <div className="chatBubbleRight">
                    <div className={`bubble ${props.direction}`}>{props.text}</div>
                    <AccountCircleIcon style={{fontSize: "4vw", marginTop: "3vh", color: "darkcyan"}} />
                </div>
            )}
            
        </div>
    );
}