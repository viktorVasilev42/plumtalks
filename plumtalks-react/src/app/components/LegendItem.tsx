import { Chip, Typography } from "@mui/joy";

export default function LegendItem(props: {
    color: string,
    name: String
}) {
    return (
        <div className="legendItem">
            <div 
                className="legendItemBadge"
                style={{backgroundColor: props.color}}
            >
            </div>
            <Typography fontSize={"0.8vw"}>{props.name}</Typography>
        </div>
    );
}