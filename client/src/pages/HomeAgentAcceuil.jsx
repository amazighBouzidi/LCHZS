import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/dashboard.css'
import { Menu, Dashboard, Settings, Logout } from '@mui/icons-material'
import useStore from '../data/store'
import fetchData from '../helper/fetchData'
import { useLocation } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description'



export default function HomeAgentAcceuil() {
  const location = useLocation();
  const [test, setTest] = useState(location.state.activeDashboard)
  const activePage = location.state.activePage;
  const navigate = useNavigate()
  const user = useStore((state) => state.user);

  useEffect(() => {
	fetchData()
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    const sidebar = document.getElementById('sidebar');
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    const switchMode = document.getElementById('switch-mode');

    allSideMenu.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
      });
    });

    searchButton.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    });

    if (window.innerWidth < 768) {
		setTest(false)
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
      searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
    });

    switchMode.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });

    return () => {
      searchButton.removeEventListener('click', () => {});
      window.removeEventListener('resize', () => {});
      switchMode.removeEventListener('change', () => {});
    };
  }, []);

  const handleLogOut = () => {
	localStorage.removeItem('tokenUser')
	navigate('/login')
  }

  return (
    <div>
	<section id="sidebar" className={test === true ? "show" : "hide"}>
		<a href="#" className="brand">
			<i className='bx bxs-smile'></i>
			<span className="text">Agent Acceuil</span>
		</a>
		<ul className="side-menu top">
			<li className={activePage === '/homeAgentAcceuil' ? 'active' : ''}>
				<a onClick={() => navigate('/homeAgentAcceuil', {state: { activePage: '/homeAgentAcceuil', activeDashboard: test }})}>
					<i className='bx bxs-dashboard' ><Dashboard/></i>
					<span className="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a onClick={() => navigate('/listePatients', {state: { activePage: '/listePatients', activeDashboard: test }})}>
					<i className='bx bxs-shopping-bag-alt' ><AccountBoxIcon/></i>
					<span className="text">Patients</span>
				</a>
			</li>
			<li>
				<a onClick={() => navigate('/listePrescriptions', {state: { activePage: '/listePrescriptions', activeDashboard: test }})}>
					<i className='bx bxs-shopping-bag-alt' ><DescriptionIcon/></i>
					<span className="text">Ordonnance</span>
				</a>
			</li>
			<li className={activePage === '/profileAdmin' ? 'active' : ''}>
				<a onClick={() => navigate('/profileAdmin', {state: { activePage: '/profileAdmin', activeDashboard: test }})}>
					<i className='bx bxs-cog' ><Settings/></i>
					<span className="text">Settings</span>
				</a>
			</li>
		</ul>
		<ul className="side-menu">
			<li>
				<a className="logout" onClick={handleLogOut}>
					<i className='bx bxs-log-out-circle'><Logout/></i>
					<span className="text">Logout</span>
				</a>
			</li>
		</ul>
	</section>
	
	<section id="content">

		<nav>
			<i className='bx bx-menu' ><Menu onClick={() => setTest(!test)} /></i>
			<a href="#" className="nav-link">Categories</a>
			<form action="#">
				<div className="form-input">
					<input type="search" placeholder="Search..." />
					<button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden />
			<label htmlFor="switch-mode" className="switch-mode"></label>
			<a href="#" className="notification">
				<i className='bx bxs-bell' ></i>
				<span className="num">8</span>
			</a>
			<a href="#" className="profile">
				<img src={user.profile}  alt='img'/>
			</a>
		</nav>

		<main>
			<div className="head-title">
				<div className="left">
					<h1>Dashboard</h1>
					<ul className="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><ChevronRightIcon style={{marginTop: '8px'}} /></li>
						<li>
							<a className="active" href="#">Home</a>
						</li>
					</ul>
				</div>
			</div>
			<ul className="box-info">
				<li>
					<span className="text">
						<h3>Welcome Back</h3>
						<p>{user.lastName} {user.firstName}</p>
					</span>
				</li>
			</ul>
		</main>
	</section>
    </div>
  )
}
