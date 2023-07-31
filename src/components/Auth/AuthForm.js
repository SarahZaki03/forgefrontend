import React from "react";
// import { useState } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";
import logo from "../../images/main-logo.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@mui/material";

const AuthForm = () => {
  const data = useActionData();
  console.log(data);
  console.log("data");
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const isSubmitting = navigation.state === "submitting";

  // const [isLogin, setIsLogin] = useState(true);
  // function switchAuthHandler() {
  //   setIsLogin((loginCase) => !loginCase);
  // }

  return (
    <Form method="post" className="mt-1 login-form">
      <div className="d-flex justify-content-center my-5">
        <img src={logo} width={250} />
      </div>
      <Box autoComplete="off" width="100%">
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => {
              <li key={err}>{err}</li>;
            })}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <div>
          <TextField
            sx={{ bgcolor: "#dbe2ef" }}
            required
            id="outlined-required"
            label="Required"
            name="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            defaultValue="Your username or e-mail"
            fullWidth
          />
          <TextField
            sx={{
              bgcolor: "#dbe2ef",
              fontFamily: "monospace",
              mt: 4,
            }}
            name="password"
            id="outlined-password-input"
            label="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            type="password"
            fullWidth
          />
          <div className="d-flex mt-4">
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: "capitalize" }}
            >
              Register
            </Button>
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: "capitalize", ml: 2 }}
            >
              Forget password?
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: "auto", px: 4 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Log In"}
            </Button>
          </div>
        </div>
      </Box>
    </Form>
  );
};

export default AuthForm;
