import React, { useState, useEffect, useFocus, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APIUrl } from '../../Helper/APIUrl.js';



function DynamicMenus(props) {
    const navigate = useNavigate();

    const [lstCMenu, setlstCMenu] = useState([]);
    const [ParentIdlstCMenu, setParentIdlstCMenu] = useState([]);
    const [MyUserId, setMyUserId] = useState();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState('dashboard');


    const [active, setactive] = useState("");
    const [show, setshow] = useState("");

    const PathURL = window.location.pathname;
    const UserId = parseInt(window.localStorage.getItem('myuserid'));
    //setMyUserId(UserId)
    //console.log("LocalStorage DynamicMenus", UserId);

    //API : Base Url + Controller Name
    const AAuthorizationsURL = APIUrl.AAuthorizations;
    const CMenuURL = APIUrl.CMenu;

    const toggleMenu = (menuId) => {
        setActiveMenu(activeMenu === menuId ? null : menuId);
    };

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setSidebarOpen(false);
    };

    const getAllCMenuEnteredinAuthorization = async () => {
        try {
            fetch(CMenuURL + 'GetCMenuByUserId_entered_in_Authorization/' + UserId,
                {
                    method: "Post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify()
                })
                .then((response) => {
                    response.json().then((result) => {
                        if (result.data !== null) {
                            setlstCMenu(result.data.sort((a, b) => a.ChildOrder - b.ChildOrder));

                            let UserWiseData = result.data.filter(x => x.ParentId == "0");
                            setParentIdlstCMenu(UserWiseData);

                            console.log('Cmenu List', result.data)
                            console.log('ParentId', UserWiseData)
                        }
                        else {
                            setlstCMenu([]);

                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCMenuEnteredinAuthorization();
    }, [UserId]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <button
                    onClick={() => handleNavClick('/dashboard')}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 ${currentPage === 'dashboard'
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                        }`}
                >
                    <span className="text-xl">📊</span>
                    <span className="font-medium">Dashboard</span>
                </button>

                {ParentIdlstCMenu.map((lst, index) => (
                    <div key={lst.MenuId}>
                        {(
                            <>
                                <button
                                    onClick={() => {toggleMenu(lst.MenuId)}}
                                    className="w-full flex items-center justify-between px-3 py-2.5 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-200 group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">📊</span>
                                        <span className="font-medium">{lst.DisplayName}</span>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${activeMenu === lst.MenuId ? 'rotate-90' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <div className={`mt-2 ml-6 space-y-1 transition-all duration-300 ${activeMenu === lst.MenuId ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}>
                                    {lstCMenu.filter(cmenus => cmenus.ParentId == lst.MenuId).map((subItem) => (
                                        <button
                                            key={subItem.MenuId}
                                            onClick={() => {navigate(subItem.PageURL);props.setCurrentPage(subItem.DisplayName)}}
                                            className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${currentPage === subItem.PageURL
                                                ? 'bg-indigo-100 text-indigo-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            {subItem.DisplayName}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
                
            </nav>
        </>
    )
}

export default DynamicMenus