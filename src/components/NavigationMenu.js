import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from '../services/auth.service';
import { 
UserOutlined,
HomeOutlined,
UsergroupAddOutlined,
PoweroffOutlined,
CloseOutlined,
LoginOutlined,
ExportOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import useWindowWide from '../common/Windowwidth';
 


function NavigationMenu() {
    const {width} = useWindowWide();
    // const [AllUsers, setAlltUsers] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [Isloggedin, setIsloggedin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setuser] = useState();
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setuser(user);
        if (user) {
            setCurrentUser(user);
            setIsloggedin(true);
        } else {
            logOut();
        }
    }, [location.pathname]);

    const logOut = () => {
        AuthService.logout();
        setIsloggedin(false);
        setCurrentUser(undefined);
        // navigate('/login');
    };

    function getItem(label, key, icon,title, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
          title
        };
      }
      

  const items = [
    getItem(<div className='menu_title' >Menu</div>, '1', <CloseOutlined className='close_icon' onClick={()=>{isOpen()}} />,),
    Isloggedin && getItem('Home', '2', <HomeOutlined />,'home'),
    Isloggedin && getItem('Users List', '3', <UsergroupAddOutlined />,'users'),
    Isloggedin && currentUser &&  getItem(`${user&&user.name}`, '4', <UserOutlined />,'profile'),
    Isloggedin && currentUser && getItem('Logout', '5', <PoweroffOutlined />,'logout'),
    !Isloggedin && !currentUser &&  getItem(`Login`, '4', <LoginOutlined />,'login'),
    !Isloggedin && !currentUser &&  getItem('Sign up', '5', <ExportOutlined />,'register')

  ];

  
  const [Open, setOpen] = useState(false);
  const isOpen=()=>{
    setOpen(!Open);
  }

  const onselect=({ item, key })=>{
    if(key === '1'){
        isOpen();
    }else if(item.props.title === 'logout'){
        logOut();
        navigate(`/login`);
    }else if(item.props.title === 'register'){
        isOpen();
        navigate(`/${item.props.title}`);
    }else{
        isOpen();
        navigate(`/${item.props.title}`);
    }
  }


    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    <img alt={'logo'} src='https://www.sciflare.com/images/flogo.png'/>
                </Link>

                {width > 768 ?
                <>
                <div className="navbar-nav mr-auto">
                    {Isloggedin && (
                        <>
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/users"} className="nav-link">
                                    Users List
                                </Link>
                            </li>
                        </>
                    )}
                </div>

                {Isloggedin && currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
                </>
                :<img onClick={isOpen} className={`menu_icon`}src="/logo/hamburger-menu.svg" alt="menu_icon" />}
            </nav>
            <div className='mobile_menu' style={!Open?{ right:'-300px'}:{ right:'0px'}}>
                <Menu
                    className='mobile_menu_comp'
                    // defaultSelectedKeys={['2']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    // inlineCollapsed={collapsed}
                    items={items}
                    onSelect={onselect}
                />
            </div>
        </>
    )
}

export default NavigationMenu