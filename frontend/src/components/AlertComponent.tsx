import { Snackbar, Alert, AlertTitle, AlertColor } from "@mui/material";

export default function AlertComponent({
  open,
  handleClose,
  severity,
  alertTitle,
  alertMessage,
}: {
  open: boolean;
  handleClose: any;
  severity?: AlertColor;
  alertTitle: string;
  alertMessage: string;
}) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity={severity}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
