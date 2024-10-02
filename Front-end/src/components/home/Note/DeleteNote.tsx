import { DialogActions, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { toast } from "react-toastify";
import NoteAPI from "../../../utils/NoteAPI";
import LoadingComponentVersion2 from "../../common/loading/Backdrop";
import { NoteType } from "../../../types/Note/NoteType";
import { QueryClient } from "@tanstack/react-query";

type ModalDeleteNoteProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queryClient: QueryClient
  data: NoteType | null;
};
export default function ModalDeleteNote({
  open,
  setOpen,
  queryClient,
  data,
}: ModalDeleteNoteProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    try {
      const response = await NoteAPI.delete(data?.id || "");
      console.log({ response });
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({queryKey: ['notes']})
    } catch (error: any) {
      toast.error(
        error?.response?.data ? error?.response?.data?.error : "Xóa thất bại"
      );
    }
  };
  if (data)
    return (
      <>
        <Dialog open={open} fullWidth maxWidth="sm">
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              textAlign: "center",
              backgroundImage:
                "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)",
            }}
          >
            {"XÁC NHẬN XÓA!"}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{mt: 1}}>
              Bạn muốn xóa ghi chú với tiêu đề <span style={{fontWeight:600}}>{data.title}</span> này ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Stack direction={"row"} sx={{ mt: 2 }} spacing={1}>
              <Button
                fullWidth
                color="info"
                onClick={handleClose}
                variant="outlined"
              >
                Hủy
              </Button>
              <Button
                fullWidth
                variant="contained"
                autoFocus
                color="error"
                type="submit"
                onClick={handleDelete}
              >
                Xóa
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </>
    );
  else return <LoadingComponentVersion2 open={data ? false : true} />;
}
