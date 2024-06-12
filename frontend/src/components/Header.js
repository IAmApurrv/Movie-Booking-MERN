import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, Drawer, IconButton, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MovieIcon from "@mui/icons-material/Movie"
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from '@mui/material/useMediaQuery';
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

	const [drawerOpen, setDrawerOpen] = useState(false);
	const isSmallScreen = useMediaQuery('(max-width:960px)');

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


	const tabStyles = {
		// textDecoration: 'none',
		// position: 'relative',
		color: "#ffffff",
		fontWeight: 'bold',
		'&:hover': {
			color: 'aqua',
			transform: 'scale(1.10) !important',
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			bottom: 8,
			width: '0%',
			height: '2px',
			backgroundColor: 'aqua',
			transition: 'width 1.3s ease',
		},
		'&:hover::after': {
			width: '100%',
		}
	};

	const drawerStyles = {
		width: 200,
		marginTop: '65px',
		backgroundColor: '#17a2b8',
	};

	return (
		<AppBar position="sticky" sx={{ bgcolor: "#17a2b8", padding: '3px', height: "65px" }}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Box display="flex" alignItems="center">
					<IconButton LinkComponent={Link} to="/">
						<MovieIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ display: 'inline', marginRight: '30px', fontWeight: 'bold', color: 'white' }}>
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ShowSpot</Link>
					</Typography>
				</Box>

				<Box width={isSmallScreen ? "70%" : "50%"} margin={"auto"}>
					<Autocomplete
						id="free-solo-demo"
						onChange={handleChange}
						freeSolo
						options={movies && movies.map((option) => option.title)}
						renderInput={(params) =>
							<TextField sx={{ input: { color: "white" } }} variant='standard' {...params} placeholder="Search movies" />}
					/>
				</Box>


				{/* <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<MenuIcon size={40} style={{ color: "#ffffff", cursor: "pointer" }} />
				</button> */}


				{isSmallScreen ? (
					<>
						<IconButton onClick={() => setDrawerOpen(true)} color="inherit">
							<MenuIcon />
						</IconButton>
						<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { ...drawerStyles, height: 'auto' } }}>
							<Tabs
								orientation="vertical"
								value={false}
								onChange={() => setDrawerOpen(false)}
								textColor='inherit'
								indicatorColor='secondary'
								sx={{ padding: 2 }}
							>
								<Tab LinkComponent={Link} to="/" label="Home" sx={tabStyles} />
								<Tab LinkComponent={Link} to="/movies" label="Movies" sx={tabStyles} />
								{!isAdminLoggedIn && !isUserLoggedIn &&
									<>
										<Tab LinkComponent={Link} to="/user" label="User" sx={tabStyles} />
										<Tab LinkComponent={Link} to="/admin" label="Admin" sx={tabStyles} />
									</>
								}
								{isUserLoggedIn &&
									<>
										<Tab LinkComponent={Link} to="/user-profile" label="Profile" sx={tabStyles} />
										<Tab LinkComponent={Link} to="/" label="Logout" onClick={() => { logout(false); setDrawerOpen(false); }} sx={tabStyles} />
									</>
								}
								{isAdminLoggedIn &&
									<>
										<Tab LinkComponent={Link} to="/add" label="Add Movies" sx={tabStyles} />
										<Tab LinkComponent={Link} to="/admin-profile" label="Profile" sx={tabStyles} />
										<Tab LinkComponent={Link} to="/" label="Logout" onClick={() => { logout(true); setDrawerOpen(false); }} sx={tabStyles} />
									</>
								}
							</Tabs>
						</Drawer>
					</>) : (
					<Box display={"flex"}>
						<Tabs textColor='inherit' indicatorColor='secondary' sx={{ marginLeft: '30px' }}>

							<Tab LinkComponent={Link} to="/" label="Home" sx={tabStyles} />
							<Tab LinkComponent={Link} to="/movies" label="Movies" sx={tabStyles} />

							{!isAdminLoggedIn && !isUserLoggedIn &&
								<>
									<Tab LinkComponent={Link} to="/user" label="User" sx={tabStyles} />
									<Tab LinkComponent={Link} to="/admin" label="Admin" sx={tabStyles} />
								</>
							}

							{isUserLoggedIn &&
								<>
									<Tab LinkComponent={Link} to="/user-profile" label="Profile" sx={tabStyles} />
									<Tab LinkComponent={Link} to="/" label="Logout" onClick={() => logout(false)} sx={tabStyles} />
								</>
							}

							{isAdminLoggedIn &&
								<>
									<Tab LinkComponent={Link} to="/add" label="Add Movies" sx={tabStyles} />
									<Tab LinkComponent={Link} to="/admin-profile" label="Profile" sx={tabStyles} />
									<Tab LinkComponent={Link} to="/" label="Logout" onClick={() => logout(true)} sx={tabStyles} />
								</>
							}
						</Tabs>

					</Box>
				)}


			</Toolbar>
		</AppBar >
	);
};

export default Header;





