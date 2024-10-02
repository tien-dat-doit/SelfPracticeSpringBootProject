import {
  Box,
  CardMedia,
  DialogActions,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import NoteAPI from "../../../utils/NoteAPI";

import { NoteType } from "../../../types/Note/NoteType";
import LoadingComponentVersion2 from "../../common/loading/Backdrop";
import { QueryClient } from "@tanstack/react-query";

const validationSchema = Yup.object({
  title: Yup.string().required("*Tên tiêu đề không được để trống!"),
  content: Yup.string().required("*Mô tả không được để trống!"),
});

type ModalUpdateNoteProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queryClient: QueryClient
  data: NoteType;
};
export default function ModalUpdateNote({
  open,
  setOpen,
  queryClient,
  data,
}: ModalUpdateNoteProps) {
  
  const handleClose = () => {
    setOpen(false);
  };
  if (data)
    return (
      <>
        <Dialog 
        open={open}
        fullWidth 
        maxWidth="sm">
          <Formik
            initialValues={{
              title: data.title || "",
              content: data.content || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {

              try {
                const submitData = {
                  ...values,              
                 
                };
                const response = await NoteAPI.update(data.id, submitData);
                console.log({ response });
                setOpen(false);
                toast.success("Cập nhật thành công !");
                queryClient.invalidateQueries({queryKey: ['notes']})
              } catch (error) {
                toast.error("Cập nhật thất bại !");
              }
            }}
          >
            {({ values }) => (
              <Form>
                <DialogTitle
                  id="alert-dialog-title"
                  sx={{
                    textAlign: "center",
                    backgroundImage:
                      "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)",
                  }}
                >
                  {"CẬP NHẬT GHI CHÚ"}
                </DialogTitle>
                <DialogContent>
                  <Field name={`title`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1, mt: 2 }}
                        >
                          Tiêu đề*
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          size="small"
                          placeholder="Nhập tiêu đề ..."
                          fullWidth
                          autoComplete="off"
                          sx={{ minWidth: 400 }}
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Box mb={3}></Box>
                  <Field name={`content`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}
                        >
                          Nội dung*
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          multiline
                          minRows={3}
                          placeholder="Nhập mô tả..."
                          fullWidth
                          autoComplete="off"
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Box mb={3}></Box>
                  {data.imageURL && <Box>
                    <Typography  variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}>Ảnh bìa</Typography>
                    <CardMedia sx={{ height: '150px' }} alt='avatar' image={data.imageURL} component={"img"}/>
                  </Box>}
                </DialogContent>
                <DialogActions>
                  <Stack direction={"row"} sx={{ mt: 4 }} spacing={3}>
                    <Button
                      fullWidth
                      color="error"
                      onClick={handleClose}
                      variant="outlined"
                    >
                      Hủy
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      autoFocus
                      color="info"
                      type="submit"
                    >
                      Nộp
                    </Button>
                  </Stack>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </>
    );
  else return <LoadingComponentVersion2 open={data ? false : true} />;
}
