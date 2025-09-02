
import React, { useState, useEffect, useFocus, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../../Component/Layout/Layout.js';
import DataTable from 'react-data-table-component';
import { SnackbarProvider, useSnackbar } from "notistack";
import { APIUrl } from '../../Helper/APIUrl.js';


function AppUser() {
    const { enqueueSnackbar } = useSnackbar();

    const [val, setVal] = useState(0);
    const [search, setsearch] = useState("");
    const [appuser, setappuser] = useState([]);
    const [filterappuser, setfilterappuser] = useState([]);
    const [DistrictList, setDistrictList] = useState([]);

    const [error, seterror] = useState("NOERROR");

    //Use Ref for Focus
    const ProfileInputRef = useRef(null);
    const DistrictIdRef = useRef(null);
    const UserNameRef = useRef(null);
    const PasswordRef = useRef(null);
    const RemarksRef = useRef(null);

    //Insert and Update UseStates
    const [UserID, setUserID] = useState("");
    const [ProfileId, setprofileid] = useState(1);
    const [UserName, setusername] = useState("");
    const [DistrictId, setDistrictId] = useState(0);
    const [DistrictName, setDistrictName] = useState("");
    const [Password, setpassword] = useState("");
    const [LastPassword, setlastpassword] = useState("ugfhjk");
    const [Remarks, setremarks] = useState("");
    const [IsActive, setisactive] = useState(true);
    const [CreatedBy, setCreatedBy] = useState(1);
    const [CreatedOn, setCreatedOn] = useState("2022-08-12 00:00:00.000");
    const [ModifiedBy, setModifiedBy] = useState(1);
    const [ModifiedOn, setModifiedOn] = useState("2022-08-12 00:00:00.000");

    //Edit Populates States
    const [edit, setEdit] = useState(false);
    const [returnId, setreturnId] = useState(0);

    //API : Base Url + Controller Name
    const ConcateURL = APIUrl.Account;
    const ConcateURL_SZType = APIUrl.SZType;

    function doEmptyStates() {
        setDistrictId(0);
        setprofileid(1);
        setusername("");
        setpassword("");
        setremarks("");

        setEdit(false)
    }

    const getAllAppUsers = async () => {
        try {
            fetch(ConcateURL + 'GetAllAUsers',
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
                            setappuser(result.data);
                            setfilterappuser(result.data);
                            //console.log(result.data)
                        }
                        else {
                            setappuser([]);
                            setfilterappuser([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllsztypesDistrictListWithOutLogin = async () => {
        try {
            fetch(ConcateURL_SZType + 'GetAllSZTypeDistrictListWithOutLogin',
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

                            setDistrictList(result.data);

                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        getAllsztypesDistrictListWithOutLogin();
        getAllAppUsers();
    }, []);

    const insertAppUsers = async () => {
        try {
            console.warn(returnId);
            let data = { ProfileId, UserName, Password, DistrictId, DistrictName, LastPassword, Remarks, IsActive, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn }
            fetch(ConcateURL + 'InsertAUsers',
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

                        getAllAppUsers();
                        getAllsztypesDistrictListWithOutLogin();
                        doEmptyStates();
                        enqueueSnackbar("Successfully Added", { variant: "success" });
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const ValidateAusersandSubmit = async () => {
        try {
            if (DistrictId == '0') {
                enqueueSnackbar("choose district", { variant: "warning" });
                DistrictIdRef.current.focus();
                return false;
            }

            if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(UserName)) {
                enqueueSnackbar("valid email must contain @ , .  ", { variant: "warning" });
                UserNameRef.current.focus();
                return false;
            }

            if (Password.length <= 7) {
                enqueueSnackbar("password length must be 8 characters", { variant: "warning" });
                PasswordRef.current.focus();
                return false;
            }

            if (Remarks.length <= 3) {
                enqueueSnackbar("enter remarks", { variant: "warning" });
                RemarksRef.current.focus();
                return false;
            }
            insertAppUsers()

        }
        catch (error) {
            console.log(error);
        }
    };

    const coloumn = [
        {
            name: "SNo.",
            selector: (row, index) => index + 1
        },
        {
            name: "District Name",
            selector: (row) => row.DistrictName,
            sortable: true,
            reorder: true
        },
        {
            name: "UserName",
            selector: (row) => row.UserName,
            sortable: true,
            reorder: true
        },
        {
            name: "Password",
            selector: (row) => row.Password,
        },
        {
            name: "Remarks",
            selector: (row) => row.Remarks,
        },
        {
            name: <strong>Activated/Deactivated</strong>,
            selector: (row) => row.IsActive ? <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Activated</label> : <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Deactivated</label>,
        },
        {
            name: "Action",
            cell: row =>
                <div>
                    {
                        <>
                            {
                                !row.IsActive
                                    ?
                                    <Button onClick={() => activateDeactiveUser(row.UserID, "activate")} data-tip="Click to Activate User" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"  >Click to Activate</Button>
                                    :
                                    <Button onClick={() => activateDeactiveUser(row.UserID, "deactivate")} data-tip="Click to Deactivate User" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">Click to Deactivate</Button>
                            }
                        </>
                    }&nbsp;&nbsp;
                    <Button onClick={() => DeleteAppUsers(row.UserID)} data-tip="Click to Delete" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">Delete</Button>
                </div>
        }
    ];

    const editAppUsers = async (Id) => {
        try {
            let items = appuser.filter(x => {
                return x.UserID === Id;
            });

            items.map(item => {
                console.warn(item);
                setUserID(item.UserID)
                setprofileid(item.ProfileId)
                setusername(item.UserName)
                setpassword(item.Password)
                setremarks(item.Remarks)

                setreturnId(item.UserID)
            })



            setEdit(true)


            ProfileInputRef.current.focus();

        }
        catch (error) {
            console.log(error);
        }
    };

    const DeleteAppUsers = async (Id) => {
        try {
            fetch(ConcateURL + 'DeleteAUsers/' + Id,
                {
                    method: "Post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then((response) => {
                    response.json().then((result) => {
                        if (result.returnID != null) {
                            getAllAppUsers();
                            getAllsztypesDistrictListWithOutLogin();
                            enqueueSnackbar("Successfully Deleted", { variant: "success" });

                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };


    const updateAppUsers = async (Id) => {
        try {
            if (UserName.length > 3 && Password.length > 3 && Remarks.length > 3) {
                console.warn(returnId);
                let data = { UserID, ProfileId, UserName, Password, LastPassword, Remarks, ModifiedBy, ModifiedOn }
                fetch(ConcateURL + 'UpdateAUsers/' + Id,
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

                            getAllAppUsers();
                            doEmptyStates();
                            enqueueSnackbar("Successfully Updated", { variant: "success" });
                        })
                    })
            }
            else {
                alert("fill all the required details to update")
            }

        }
        catch (error) {
            console.log(error);
        }
    };

    const activateDeactiveUser = async (Id, Value) => {
        try {
            let data = { Value }
            fetch(ConcateURL + 'ActivateDeactivateAUsers/' + Id,
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

                        getAllAppUsers();
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

    useEffect(() => {
        const result = appuser.filter(x => {
            return x.UserName.toLowerCase().match(search.toLowerCase());
        })

        setfilterappuser(result);
    }, [search]);

    const OnChangeDistrictListHandler = async (e) => {
        try {
            setDistrictId(e.target.value)
            setDistrictName(e.target.selectedOptions[0].text)
        }
        catch (error) {
            console.log(error);
        }
    };

    const tableData = { coloumn, filterappuser };

    return (
        <div>
            <Layout>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                App User
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <select
                                        ref={DistrictIdRef} value={DistrictId} onChange={(e) => { OnChangeDistrictListHandler(e) }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="0" selected>Select District Name</option>
                                        {
                                            DistrictList && DistrictList !== undefined
                                                ?
                                                DistrictList.map((dis, index) => {
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Profile Id
                                    </label>
                                    <input
                                        type="text"
                                        readOnly={edit} ref={ProfileInputRef} value={ProfileId} onChange={(e) => { setprofileid(e.target.value) }} placeholder="Enter Profile Id"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        ref={UserNameRef} value={UserName} onChange={(e) => { setusername(e.target.value) }} placeholder="Enter UserName"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div >
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div >
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Remarks
                                    </label>
                                    <input
                                        type="text"
                                        ref={RemarksRef} value={Remarks} onChange={(e) => { setremarks(e.target.value) }} placeholder="Enter Remarks"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>

                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-3">

                                <Button
                                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                    onClick={() => ValidateAusersandSubmit()}
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
                                    title="Manage App Users"
                                    columns={coloumn}
                                    data={filterappuser}
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight="550px"
                                    selectableRows
                                    selectableRowsHighlight
                                    highlightOnHover  // actions={<button className="btn btn-sm btn-info">Export</button>}                                                
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

export default AppUser