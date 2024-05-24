export default function LegendBadge(props: {
    color: string
}) {
    return (
        <div className="legendBadge"
            style={{
                backgroundColor: props.color,
            }}
        ></div>
    );
}