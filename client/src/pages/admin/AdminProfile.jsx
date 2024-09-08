import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/dashboard.css'
import { Menu, Dashboard, Store, Message, Analytics, Settings, Logout } from '@mui/icons-material'
import useStore from '../../data/store'
import fetchData from '../../helper/fetchData'
import MyProfile from '../../components/MyProfile'
import { useLocation } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TopicIcon from '@mui/icons-material/Topic';


export default function AdminProfile() {
  const location = useLocation();
  const [test, setTest] = useState(location.state.activeDashboard)
  const navigate = useNavigate()
  const activePage = location.state.activePage;
  const user = useStore((state) => state.user);
  useEffect(() => {
	fetchData()
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    const sidebar = document.getElementById('sidebar');
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    const switchMode = document.getElementById('switch-mode');

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
			<span className="text">Administrateur</span>
		</a>
		<ul className="side-menu top">
			<li className={activePage === '/homeAdmin' ? 'active' : ''}>
				<a onClick={() => navigate('/homeAdmin', {state: { activePage: '/homeAdmin', activeDashboard: test }}) }>
					<i className='bx bxs-dashboard' ><Dashboard/></i>
					<span className="text">Dashboard</span>
				</a>
			</li>
			<li>
				<a onClick={() => navigate('/listeEmployers', {state: { activePage: '/listeEmployers', activeDashboard: test }})}>
					<i className='bx bxs-shopping-bag-alt' ><AccountBoxIcon/></i>
					<span className="text">Employers</span>
				</a>
			</li>
			<li className={activePage === '/listeAnalyses' ? 'active' : ''}>
				<a onClick={() => navigate('/listeAnalyses', {state: { activePage: '/listeAnalyses', activeDashboard: test }})}>
					<i className='bx bxs-doughnut-chart' ><Analytics/></i>
					<span className="text">Analyse</span>
				</a>
			</li>
			<li className={activePage === '/validatePrescriptionResults' ? 'active' : ''}>
				<a onClick={() => navigate('/validatePrescriptionResults', {state: { activePage: '/validatePrescriptionResults', activeDashboard: test }})}>
					<i className='bx bxs-doughnut-chart' ><FactCheckIcon/></i>
					<span className="text">Validation des analyses</span>
				</a>
			</li>
			<li className={activePage === '/medicalFolder' ? 'active' : ''}>
                <a onClick={() => navigate('/medicalFolder', {state: { activePage: '/medicalFolder', activeDashboard: test }})}>
                    <i className='bx bxs-doughnut-chart' ><TopicIcon/></i>
                    <span className="text">Dossier medical patient</span>
                </a>
            </li>
			<li>
				<a href="#">
					<i className='bx bxs-message-dots' ><Message/></i>
					<span className="text">Message</span>
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
				<a className="logout">
					<i className='bx bxs-log-out-circle' onClick={handleLogOut}><Logout/></i>
					<span className="text" onClick={handleLogOut}>Logout</span>
				</a>
			</li>
		</ul>
	</section>
	
	<section id="content">

		<nav>
			<i className='bx bx-menu' ><Menu onClick={() => setTest(!test)} /></i>
			<form action="#">
				<div className="form-input">
					<input type="search" placeholder="Search..." />
					<button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden />
			<label htmlFor="switch-mode" className="switch-mode"></label>
			<a className="profile">
				<img src={user.profile}  alt='img'/>
			</a>
		</nav>

		<main>
			<ul className="box-info">
				<li>
					<span className="text">
						<h3>Welcome Back in your profile</h3>
						<p>{user.lastName} {user.firstName}</p>
					</span>
				</li>
			</ul>
			<ul className='box-info'>
				<MyProfile userProfile={user} />
			</ul>
		</main>
	</section>
    </div>
  )
}
