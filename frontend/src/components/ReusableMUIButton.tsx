import {Button} from "@mui/material";

export default function ReusableMUIButton({buttonText, onClickHandler, sx}: {buttonText: string, onClickHandler: () => void, sx?: Object} ) {
    return (
        <Button onClick={onClickHandler} variant="contained" sx={{mt: 3, ...sx}}>
            {buttonText}
        </Button>
    )
}