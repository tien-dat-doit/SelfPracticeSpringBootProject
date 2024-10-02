import {
  Box,
  CardMedia,
  DialogActions,
  Stack,
  TextField,
  Typography,
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
import { QueryClient } from "@tanstack/react-query";

const validationSchema = Yup.object({
  title: Yup.string().required("*Tên tiêu đề không được để trống!"),
  content: Yup.string().required("*Mô tả không được để trống!"),
  file: Yup.mixed().required("Hình ảnh cho ghi chú cần phải có!"),
});

type ModalCreateNoteProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queryClient: QueryClient
};
export default function ModalCreateNote({
  open,
  setOpen,
  queryClient,
}: ModalCreateNoteProps) {
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <Formik
          initialValues={{
            title: "",
            content: "",
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const formData = new FormData();
              if (values.file) formData.append("file", values.file);
              const payload = {
                title: values.title,
                content: values.content,
                formData,
              };
              const response = await NoteAPI.create(payload);
              console.log({ response });
              setOpen(false);
              toast.success("Tạo thành công !");
              queryClient.invalidateQueries({queryKey: ['notes']})
            } catch (error) {
              toast.error("Tạo thất bại !");
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
                {"TẠO GHI CHÚ MỚI"}
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
                {imgSrc && (
                  <CardMedia
                    sx={{ height: "150px", mb: 5 }}
                    alt="avatar"
                    image={imgSrc}
                    component={"img"}
                  />
                )}
                <Field name="file">
                  {({ field, form, meta }: any) => (
                    <Stack direction={"row"}>
                      <Button
                        component="label"
                        color="primary"
                        variant="contained"
                        htmlFor="mainImage"
                        size="small"
                      >
                        Chọn hình
                        <input
                          hidden
                          type="file"
                          id="mainImage"
                          accept="image/png, image/jpeg"
                          onChange={(event: any) => {
                            const reader = new FileReader();
                            const files = event.currentTarget.files;
                            if (files && files.length !== 0) {
                              reader.onload = () =>
                                setImgSrc(reader.result as string);
                              reader.readAsDataURL(files[0]);
                            }
                            form.setFieldValue(
                              field.name,
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </Button>
                      {imgSrc && (
                        <Button
                          color="error"
                          sx={{ ml: 2 }}
                          variant="outlined"
                          onClick={() => {
                            setImgSrc("");
                            form.setFieldValue(field.name, "");
                          }}
                        >
                          Xóa
                        </Button>
                      )}
                      {meta.touched && !!meta.error && (
                        <div style={{ color: "red" }}>{meta.error}</div>
                      )}
                    </Stack>
                  )}
                </Field>
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
}
