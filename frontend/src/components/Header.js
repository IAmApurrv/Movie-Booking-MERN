import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, IconButton, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MovieIcon from "@mui/icons-material/Movie"
import { getAllMovies } from '../api/api-helpers';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {

	const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);
	const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);
	const logout = (isAdmin) => {
		dispatch(isAdmin ? adminActions.logout() : userActions.logout());
	};

	const [movies, setMovies] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		getAllMovies()
			.then((data) => setMovies(data.movies))
			.catch((err) => console.log(err));
	}, []);


	const handleChange = (e, val) => {
		const movie = movies.find((m) => m.title === val);
		if (movie) {
			navigate(`movie-details/${movie._id}`)
		}
	}

	return (
		<AppBar position="sticky" sx={{ bgcolor: "#17a2b8", padding: '3px', height: "65px" }}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box display="flex" alignItems="center">
					<IconButton LinkComponent={Link} to="/">
						<MovieIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ display: 'inline', marginLeft: '10px', fontWeight: 'bold', color: 'white' }}>
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ShowSpot</Link>
					</Typography>
				</Box>

				<Box width={"50%"} margin={"auto"}>
					<Autocomplete
						id="free-solo-demo"
						onChange={handleChange}
						freeSolo
						options={movies && movies.map((option) => option.title)}
						renderInput={(params) =>
							<TextField sx={{ input: { color: "white" } }} variant='standard' {...params} placeholder="Search movies" />}
					/>
				</Box>

				<Box display={"flex"}>
					<Tabs textColor='inherit' indicatorColor='secondary'>

						<Tab LinkComponent={Link} to="/" label="Home" />
						<Tab LinkComponent={Link} to="/movies" label="Movies" />

						{!isAdminLoggedIn && !isUserLoggedIn &&
							<>
								<Tab LinkComponent={Link} to="/user" label="User" />
								<Tab LinkComponent={Link} to="/admin" label="Admin" />
							</>
						}

						{isUserLoggedIn &&
							<>
								<Tab LinkComponent={Link} to="/user-profile" label="Profile" />
								<Tab LinkComponent={Link} to="/" label="Logout" onClick={() => logout(false)} />
							</>
						}

						{isAdminLoggedIn &&
							<>
								<Tab LinkComponent={Link} to="/add" label="Add Movies" />
								<Tab LinkComponent={Link} to="/admin-profile" label="Profile" />
								<Tab LinkComponent={Link} to="/" label="Logout" onClick={() => logout(true)} />
							</>
						}
					</Tabs>

				</Box>
			</Toolbar>
		</AppBar >
	);
};

export default Header;





