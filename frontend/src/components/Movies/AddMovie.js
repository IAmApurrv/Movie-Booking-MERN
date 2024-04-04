import { Box, Button,  TextField, Typography, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addMovie } from "../../api/api-helpers";

export const AddMovie = () => {

  useEffect(() => {
      document.title = "Add New Movie";
  }, []);

  const [inputs, setInputs] = useState({
    title: "",
    director: "",
    posterURL: "",
    releaseDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const handleActorChange = (e) => {
    setActor(e.target.value);
  };
  const handleAddActor = () => {
    if (actor.trim() !== "") {
      setActors([...actors, actor]);
      setActor("");
    }
  };
  const handleDeleteActor = (index) => {
    const updatedActors = [...actors];
    updatedActors.splice(index, 1);
    setActors(updatedActors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => {
        console.log(res);
        setInputs({ title: "", director: "", posterURL: "", releaseDate: "", description: "" });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          margin={"auto"}
          marginTop={"20px"}
          padding={5}
          // paddingY={2}
          bgcolor={"#f8f9fa"}
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography variant='h4' textAlign="center" sx={{ color: "#17a2b8", fontWeight: "bold", textTransform: "capitalize" }} >
            Add new Movie
          </Typography>
          {/* <FormLabel sx={labelProps}>Title</FormLabel> */}
          <TextField
            value={inputs.title}
            label="Title"
            name="title"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          {/* <FormLabel sx={labelProps}>Director</FormLabel> */}
          <TextField
            value={inputs.director}
            label="Director"
            name="director"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          {/* <FormLabel sx={labelProps}>Poster URL</FormLabel> */}
          <TextField
            value={inputs.posterURL}
            label="Poster URL"
            name="posterURL"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          {/* <FormLabel sx={labelProps}>Release Date</FormLabel> */}
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            label="Release Date"
            name="releaseDate"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={handleChange}
          />
          {/* <FormLabel sx={labelProps}>Description</FormLabel> */}
          <TextField
            value={inputs.description}
            label="Description"
            name="description"
            variant="outlined"
            margin="normal"
            multiline
            rows={2}
            onChange={handleChange}
          />
          {/* <FormLabel sx={labelProps}>Actor</FormLabel> */}
          <Box display="flex" alignItems="center" justifyContent="flex-start" mt={2}>
            <TextField
              value={actor}
              label="Actor"
              name="actor"
              variant="outlined"
              margin="normal"
              onChange={handleActorChange}
              sx={{ width: "40%", marginRight: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddActor}
              sx={{ height: "100%", marginLeft: 1 }}
            >
              Add Actor
            </Button>
          </Box>


          <Box display="flex" flexWrap="wrap" mt={1}>
            {actors.map((actor, index) => (
              <Chip
                key={index}
                label={actor}
                onDelete={() => handleDeleteActor(index)}
                size="medium"
                sx={{ mr: 1, mb: 1, bgcolor: "#2196f3", color: "#fff" }}
              />
            ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "80%", height: "50px", margin: "auto", backgroundColor: "red", color: "white", textDecoration: 'none', ":hover": { bgcolor: "#121217" } }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div >
  );
};
