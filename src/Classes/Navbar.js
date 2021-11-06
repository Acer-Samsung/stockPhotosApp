import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    Input: {
        width: "100%",
        borderRight:"unset !important",
        borderTopRightRadius: "0px !important",
        borderBottomRightRadius: "0px !important"
    },
    SearchButton: {
        borderLeft:"unset !important",
        borderBottomLeftRadius:"unset !important",
        borderTopLeftRadius:"unset !important"
    },
    Link: {
        textDecoration: "none",
        color: "#000",
    }
}));