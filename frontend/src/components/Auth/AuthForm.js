import React, { useState } from 'react'
import { Dialog, Typography, Box, TextField, Button, IconButton, FormLabel } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

// const labelStyle = { mt: 1, mb: 1 };
const labelStyle = {};

const AuthForm = ({ onSubmit, isAdmin }) => {

    const [inputs, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isSignUp, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // to prevent refresh
        // console.log(inputs);
        onSubmit({ inputs, signup: isAdmin ? false : isSignUp });

        setInput({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <Dialog open={true} PaperProps={{ style: { borderRadius: 20 } }}>
            <Box>
                <Box sx={{ ml: "auto", padding: 1 }}>
                    <IconButton LinkComponent={Link} to="/">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
            <Typography variant='h4' textAlign="center" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize", }} >
                {isSignUp ? "Signup" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box margin={"auto"} alignContent={"center"} padding={4} display="flex" justifyContent="center" flexDirection="column" width={400} mx="auto"  >

                    {!isAdmin && isSignUp && (
                        <>
                            <FormLabel sx={labelStyle}>Name</FormLabel>
                            <TextField value={inputs.name} onChange={handleChange} variant='standard' margin="normal" type={'text'} name="name" />
                        </>
                    )}

                    <FormLabel sx={labelStyle}>Email</FormLabel>
                    <TextField value={inputs.email} onChange={handleChange} variant='standard' margin="normal" type={'email'} name="email" />

                    <FormLabel sx={labelStyle}>Password</FormLabel>
                    <TextField value={inputs.password} onChange={handleChange} variant='standard' margin="normal" type={'password'} name="password" />

                    <Button
                        type='submit' fullWidth variant='contained'
                        sx={{
                            mt: 2,
                            borderRadius: 10,
                            bgcolor: "#17a2b8",
                            "&:hover": { bgcolor: "#28a745" }
                        }}
                    >
                        {isSignUp ? "Signup" : "Login"}
                    </Button>

                    {!isAdmin && (
                        <Button
                            onClick={() => setIsSignup(!isSignUp)}
                            sx={{
                                mt: 2, borderRadius: 10, bgcolor: "transparent", color: "#17a2b8", cursor: "pointer",
                                "&:hover": { color: "#28a745", textDecoration: "underline" }
                            }}
                            fullWidth
                        >
                            Switch To {isSignUp ? "Login" : "Signup"}
                        </Button>
                    )}
                </Box>
            </form>
        </Dialog>
    )
}

export default AuthForm
