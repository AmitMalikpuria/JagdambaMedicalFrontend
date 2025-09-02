import React, { useState, useEffect, useFocus, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../Layout/Layout.js';
import DataTable from 'react-data-table-component';
import { APIUrl } from '../../Helper/APIUrl';
import { SnackbarProvider, useSnackbar } from "notistack";

function Authorizations() {
    const { enqueueSnackbar } = useSnackbar();

    const [search, setsearch] = useState("");
    const [lstAppUsers, setlstAppUsers] = useState([]);
    const [lstRole, setlstRole] = useState([]);
    const [lstParentPage, setlstParentPage] = useState([]);
    const [lstChildPage, setlstChildPage] = useState([]);

    const [lstAuthorization, setlstAuthorization] = useState([]);
    const [filterAuthorization, setfilterAuthorization] = useState([]);

    //Use Ref for Focus
    const UserIdRef = useRef(null);
    const RoleIdRef = useRef(null);
    const ParentIdRef = useRef(null);
    const ChildIdRef = useRef(null);

    //Insert and Update UseStates
    const [ParentMenuId, setParentMenuId] = useState(0);
    const [ChildMenuId, setChildMenuId] = useState(0);

    //Insert and Update UseStates
    //const [AuthId, setAuthId] = useState();
    const [MenuIds, setMenuIds] = useState("");
    const [IsVisible, setIsVisible] = useState(true);
    const [UserId, setUserId] = useState(0);
    const [RoleId, setRoleId] = useState(0);
    const [IsActive, setisactive] = useState(true);
    const [CreatedBy, setCreatedBy] = useState(1);
    const [CreatedOn, setCreatedOn] = useState("2022-08-12 00:00:00.000");
    const [ModifiedBy, setModifiedBy] = useState(1);
    const [ModifiedOn, setModifiedOn] = useState("2022-08-12 00:00:00.000");

    //Edit Populates States
    const [edit, setEdit] = useState(false);
    const [returnId, setreturnId] = useState(0);

    //API : Base Url + Controller Name
    const AAuthorizationsURL = APIUrl.AAuthorizations;
    const AppUsersURL = APIUrl.Account;
    const SZTYpeURL = APIUrl.SZType;
    const CMenuURL = APIUrl.CMenu;

    const getAllAuthorization = async () => {
        try {
            fetch(AAuthorizationsURL + 'GetAllAAuthorizations',
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
                            setlstAuthorization(result.data);
                            setfilterAuthorization(result.data);
                        }
                        else {
                            setlstAuthorization([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllAppUsers = async () => {
        try {
            fetch(AppUsersURL + 'GetAllAUsers',
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
                            setlstAppUsers(result.data);
                            console.log('alll Users', result.data)
                        }
                        else {
                            setlstAppUsers([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllUserRole = async () => {
        try {
            fetch(SZTYpeURL + 'GetSZTypeBySectionId/4',
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
                            setlstRole(result.data);
                        }
                        else {
                            setlstRole([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllCMenu = async () => {
        try {
            fetch(CMenuURL + 'GetAllCMenu/',
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

                            let PartentListData = result.data.filter(x => x.ParentId == 0 && x.IsActive == true);
                            setlstParentPage(PartentListData);
                        }
                        else {
                            setlstParentPage([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllMenus = async (e) => {
        try {
            setParentMenuId(e.target.value);
            fetch(CMenuURL + 'GetCMenuByUserId_not_entered_in_Authorization/' + UserId,
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

                            let _ParentId = e.target.value;
                            console.log('ParentId', _ParentId)
                            let ChildListData = result.data.filter(x => x.ParentId == _ParentId || x.MenuId == _ParentId && x.IsActive == true);
                            setlstChildPage(ChildListData);
                            console.log('setlstChildPage', ChildListData)
                        }
                        else {
                            setlstChildPage([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getAllAuthorization();
        getAllAppUsers();
        getAllUserRole();
        getAllCMenu();
    }, []);

    function doEmptyStates() {

        setUserId("");
        setRoleId(0);
        setParentMenuId(0);
        setChildMenuId(0);

        setMenuIds("");
        setlstChildPage([]);

        setEdit(false)
    }

    const getallSelectedItems = async (event) => {
        {
            var s = "";
            // alert(event.target.options[0].selected);
            for (var i = 0; i < event.target.length; i++) {
                if (event.target.options[i].selected) {
                    if (s.length > 0) {
                        s = s + ',' + event.target.options[i].value;
                    }
                    else {
                        s = event.target.options[i].value;
                    }
                }
            }
            console.log('Selected Id', s);
            setMenuIds(s)
        }
    }

    const ValidateAuthorizationandSubmit = async () => {
        try {
            if (UserId == 0) {
                enqueueSnackbar("Please Select Username", { variant: "warning" });
                UserIdRef.current.focus();
                return false;
            }
            if (RoleId == 0) {
                enqueueSnackbar("Please Select User Role", { variant: "warning" });
                RoleIdRef.current.focus();
                return false;
            }
            if (ParentMenuId == 0) {
                enqueueSnackbar("Please Select Parent Menu", { variant: "warning" });
                ParentIdRef.current.focus();
                return false;
            }
            if (MenuIds == 0) {
                enqueueSnackbar("Please Select Child Menu", { variant: "warning" });
                ChildIdRef.current.focus();
                return false;
            }
            InsertAuthorizations()
        }
        catch (error) {
            console.log(error);
        }
    };

    const InsertAuthorizations = async () => {
        try {
            let data = { MenuIds, IsVisible, UserId, RoleId, IsActive, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn }
            fetch(AAuthorizationsURL + 'InsertAAuthorizations',
                {
                    method: "Post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    response.json().then((result) => {
                        setreturnId(result.returnID);
                        enqueueSnackbar("Successfully Added", { variant: "success" });
                        getAllAuthorization();
                        getAllAppUsers();
                        getAllUserRole();
                        getAllCMenu();

                        doEmptyStates();
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const activateDeactiveAuthorizations = async (Id, Value) => {
        try {
            console.log("Id Called :" + Id)
            debugger;
            let data = { Value }
            fetch(AAuthorizationsURL + 'ActivateDeactivateAAuthorizations/' + Id,
                {
                    method: "Post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    debugger;
                    response.json().then((result) => {
                        setreturnId(result.returnID);

                        getAllAuthorization();
                        doEmptyStates();
                        Value == "activate" ?
                            enqueueSnackbar("Successfully Activated", { variant: "success" })
                            :
                            enqueueSnackbar("Successfully Dectivated", { variant: "warning" });

                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const DeleteAuthorizations = async (Id) => {
        try {
            fetch(AAuthorizationsURL + 'DeleteAAuthorizations/' + Id,
                {
                    method: "Post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then((response) => {
                    response.json().then((result) => {
                        if (result.returnID != null) {
                            getAllAuthorization();
                            enqueueSnackbar("Successfully Deleted", { variant: "success" })
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const coloumn = [
        {
            name: "SNo.",
            width: "60px",
            selector: (row, index) => index + 1
        },
        {
            name: "UserName",
            selector: (row) => row.UserName,
            sortable: true,
            reorder: true
        },
        {
            name: "User Role",
            selector: (row) => row.RoleName,
        },
        {
            name: "Menu Name",
            selector: (row) => row.DisplayName,
            sortable: true,
            reorder: true
        },
        {
            name: <strong>Activated/Deactivated</strong>,
            selector: (row) => row.IsActive ? <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Activated</label> : <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Deactivated</label>,
        },
        {
            name: "Action",
            width: "200px",
            cell: row =>
                <div>
                    {
                        <>
                            {
                                !row.IsActive
                                    ?
                                    <Button onClick={() => activateDeactiveAuthorizations(row.MenuId, "activate")} data-tip="Click to Activate User" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"  >Click to Activate</Button>
                                    :
                                    <Button onClick={() => activateDeactiveAuthorizations(row.MenuId, "deactivate")} data-tip="Click to Deactivate User" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">Click to Deactivate</Button>
                            }
                        </>
                    }&nbsp;&nbsp;
                    <Button onClick={() => DeleteAuthorizations(row.AuthId)} data-tip="Click to Delete" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">Delete</Button>
                </div>
        }
    ];

    useEffect(() => {
        const result = lstAuthorization.filter(x => {
            return x.UserName.toLowerCase().match(search.toLowerCase()) || x.DisplayName.toLowerCase().match(search.toLowerCase());
        })

        setfilterAuthorization(result);
    }, [search]);

    const tableData = { coloumn, filterAuthorization };

    return (
        <div>
            <Layout>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Authorizations
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <select
                                        ref={UserIdRef} value={UserId} onChange={(e) => { setUserId(e.target.value) }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="0" selected>Select Username</option>
                                        {
                                            lstAppUsers && lstAppUsers !== undefined
                                                ?
                                                lstAppUsers.map((dis, index) => {
                                                    return (
                                                        <option value={dis.UserID} >{dis.UserName}</option>
                                                    )
                                                })
                                                :
                                                "None"
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        User Role
                                    </label>
                                    <select
                                        ref={RoleIdRef} value={RoleId} onChange={(e) => { setRoleId(e.target.value) }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="0" selected>Select Role</option>
                                        {
                                            lstRole && lstRole !== undefined
                                                ?
                                                lstRole.map((dis, index) => {
                                                    return (
                                                        <option value={dis.TypeId} >{dis.TypeName}</option>
                                                    )
                                                })
                                                :
                                                "None"
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent Page
                                    </label>
                                    <select
                                        ref={ParentIdRef} value={ParentMenuId} onChange={(e) => getAllMenus(e)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="0" selected>Select Parent Page</option>
                                        {
                                            lstParentPage && lstParentPage !== undefined
                                                ?
                                                lstParentPage.map((dis, index) => {
                                                    return (
                                                        <option value={dis.MenuId} >{dis.DisplayName}</option>
                                                    )
                                                })
                                                :
                                                "None"
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Child Page
                                    </label>
                                    <select
                                        ref={ChildIdRef} multiple={true} onChange={(e) => getallSelectedItems(e)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        {
                                            lstChildPage && lstChildPage !== undefined
                                                ?
                                                lstChildPage.map((dis, index) => {
                                                    return (
                                                        <option value={dis.MenuId} >{dis.DisplayName}</option>
                                                    )
                                                })
                                                :
                                                "None"
                                        }
                                    </select>
                                </div>

                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-3">

                                <Button
                                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                    onClick={() => ValidateAuthorizationandSubmit()}
                                >
                                    <span>Submit</span>
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => doEmptyStates()}
                                    className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Reset
                                </button>

                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div class="overflow-x-auto">
                                <DataTable
                                    title="Manage Authorizations"
                                    columns={coloumn}
                                    data={filterAuthorization}
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight="550px"
                                    selectableRows
                                    selectableRowsHighlight
                                    highlightOnHover
                                    // actions={<button className="btn btn-sm btn-info">Export</button>}                                                
                                    subHeader
                                    subHeaderAlign="right"
                                    subHeaderComponent={
                                        <input type="text"
                                            placeholder="search username"
                                            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            value={search}
                                            onChange={(e) => setsearch(e.target.value)}
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </Layout >

        </div >
    )
}

export default Authorizations