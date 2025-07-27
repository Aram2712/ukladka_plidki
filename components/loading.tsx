
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ClipLoader from "react-spinners/ClipLoader";

const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -47%)",
    width: 300,
    height: 100,
    maxWidth: "90%",
    maxHeight: "95%",
    margin: "auto",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    outline: "none",
    padding: "10px",
}

type TProps = {
    loading: boolean;
}

function Loading(props: TProps) {

    const { loading } = props;

    return (
        <Modal
            open = { loading }
            sx={{
                backgroundColor: 'rgba(0,0,0,0.8)'
            }}
        >
            <Box sx = { style }>
                <ClipLoader
                    color = { 'white' }
                    cssOverride = {{
                        display: "block",
                        margin: "0 auto",
                        borderWidth: "5px"
                        // borderColor: "red",
                    }}
                    aria-label = "Loading Spinner"
                    data-testid = "loader"
                    size = { 60 }
                    speedMultiplier = {0.8}
                />
            </Box>
        </Modal>
    )
}

export default Loading;