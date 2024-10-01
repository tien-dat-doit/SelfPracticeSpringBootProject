import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { LoadingComponentVersion2 } from "../../../components/common/loading/Backdrop";
import AuthAPI from "../../../utils/AuthAPI";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("*Tên đăng nhập không được để trống !"),
  password: Yup.string()
    .required("*Mật khẩu không được để trống !")
    .min(6, "*Mật khẩu phải có ít nhất 6 kí tự !")
    .max(20, "*Mật khẩu tối đa 20 kí tự !"),
  firstName: Yup.string()
  .required("*Tên không được để trống !"),
  lastName: Yup.string()
  .required("*Tên Họ không được để trống !"),
 
});

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      sx={{       
        height: "100vh",
        p:3,
        backgroundImage: 'url("/login.jpg")',
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <LoadingComponentVersion2 open={isLoading} />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", p: 5 }}
      >
        <Box
          sx={{
            // m: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#ff5722",
            }}
          >
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Chào mừng bạn đến với PET SPA
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              fullName: "",
              phoneNumber: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                setIsLoading(true);              
                await AuthAPI.customerRegistAccount(values)
                toast.success("Đăng kí tài khoản thành công !");
                navigate("/login")
              } catch (error) {
                toast.error("Đăng kí tài khoả thất bại !");
              } finally {
                setIsLoading(false);
              }
            }}
          >
            {({ values }) => (
              <Form>
                <Field name={`lastName`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Họ:
                      </Typography>
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        placeholder="Nhập họ..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>
                <Field name={`firstName`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Tên:
                      </Typography>
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        placeholder="Nhập tên..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>
                <Box mb={2}></Box>
                <Field name={`username`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Tên đăng nhập:
                      </Typography>
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        placeholder="Nhập tên đăng nhập..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>
                <Box mb={2}></Box>
                <Field name={`password`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Mật khẩu:
                      </Typography>
                      <TextField
                        {...field}
                        type="password"
                        size="small"
                        placeholder="Nhập mật khẩu..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>        
                <Box mb={2}></Box>
                <Field name={`dob`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Ngày sinh:
                      </Typography>
                      <TextField
                        {...field}
                        type="date"
                        size="small"
                        placeholder="Nhập ngày sinh..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>                                        

                <Button
                  type="submit"
                  fullWidth
                  style={{
                    borderRadius: 35,
                    backgroundColor: "#ff5722",
                    // padding: "18px 36px",
                    fontSize: "18px",
                  }}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Đăng kí tài khoản
                </Button>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={1}
                  sx={{ mt: 2, cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  <KeyboardBackspaceIcon fontSize="small" />
                  <Typography align="center" variant="body2">
                    Đăng nhập
                  </Typography>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}
