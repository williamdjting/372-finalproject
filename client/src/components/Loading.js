import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loading() {
    return (
        <PropagateLoader color="#3874d4" style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
        }} />
    );
}

