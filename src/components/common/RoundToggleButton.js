import {styled} from "@mui/material/styles";
import {ToggleButton} from "@mui/material";

const RoundToggleButton = styled(ToggleButton)({
    "&.MuiToggleButtonGroup-grouped": {
        "border-width": "1px",
        "border-style": "solid",
        "border-radius": "2rem",
        "font-weight": "bold",
        "font-size": "1rem",
        "margin": "1rem 1.6rem",
        "&:not(:last-of-type), &:not(:first-of-type)": {
            "border-width": "1px",
            "border-style": "solid",
            "border-radius": "2rem",
            "border-color": "inherit"
        }
    }
});

export default RoundToggleButton;