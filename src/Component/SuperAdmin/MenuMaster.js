import React, { useState, useEffect, useFocus, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../Layout/Layout.js';
import DataTable from 'react-data-table-component';
import { APIUrl } from '../../Helper/APIUrl.js';
import { SnackbarProvider, useSnackbar } from "notistack";


function MenuMaster() {

    const { enqueueSnackbar } = useSnackbar();

    const [search, setsearch] = useState("");
    const [lstCMenu, setlstCMenu] = useState([]);
    const [filterCMenu, setfilterCMenu] = useState([]);
    const [ParentIdList, setParentIdList] = useState([]);

    const [error, seterror] = useState("NOERROR");

    //Use Ref for Focus
    const DisplayNameRef = useRef(null);
    const PageURLRef = useRef(null);
    const ParentIdRef = useRef(null);
    const ParentOrderRef = useRef(null);
    const ChildOrderRef = useRef(null);
    const CssClassRef = useRef(null);

    //Insert and Update UseStates
    const [MenuId, setMenuId] = useState("");
    const [DisplayName, setDisplayName] = useState("");
    const [PageURL, setPageURL] = useState("");
    const [ParentId, setParentId] = useState(0);
    const [ParentOrder, setParentOrder] = useState(0);
    const [ChildOrder, setChildOrder] = useState(0);
    const [CssClass, setCssClass] = useState("");
    const [MaskUrl, setMaskUrl] = useState("");
    const [IsActive, setisactive] = useState(true);
    const [CreatedBy, setCreatedBy] = useState(1);
    const [CreatedOn, setCreatedOn] = useState("2022-08-12 00:00:00.000");
    const [ModifiedBy, setModifiedBy] = useState(1);
    const [ModifiedOn, setModifiedOn] = useState("2022-08-12 00:00:00.000");

    //Edit Populates States
    const [edit, setEdit] = useState(false);
    const [returnId, setreturnId] = useState(0);

    //API : Base Url + Controller Name
    const ConcateURL = APIUrl.CMenu;

    const getAllCMenu = async () => {
        try {
            fetch(ConcateURL + 'GetAllCMenu',
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
                            setlstCMenu(result.data);
                            setfilterCMenu(result.data);
                            //setParentIdList(result.data);
                            let PartentListData = result.data.filter(x => x.ParentId == 0);
                            setParentIdList(PartentListData);

                            //console.log("ParentIdList : ", PartentListData)
                        }
                        else {
                            setlstCMenu([]);
                            setfilterCMenu([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCMenu();
    }, []);


    const insertCmenu = async () => {
        try {
            console.warn(returnId);
            let data = { DisplayName, PageURL, ParentId, ParentOrder, ChildOrder, CssClass, MaskUrl, IsActive, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn }
            fetch(ConcateURL + 'InsertCMenu',
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
                        getAllCMenu();
                        doEmptyStates();
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const ValidateCMenuandSubmit = async () => {
        try {
            if (DisplayName.length <= 2) {
                enqueueSnackbar("Enter Menu Display Name", { variant: "warning" });
                DisplayNameRef.current.focus();
                return false;
            }

            if (ParentOrder.length == 0) {
                enqueueSnackbar("Enter parent order or enter 0", { variant: "warning" });
                ParentOrderRef.current.focus();
                return false;
            }

            if (PageURL.length == 0) {
                enqueueSnackbar("Enter page url", { variant: "warning" });
                PageURLRef.current.focus();
                return false;
            }

            if (ChildOrder.length == 0) {
                enqueueSnackbar("Enter child order or enter 0", { variant: "warning" });
                ChildOrderRef.current.focus();
                return false;
            }


            insertCmenu()

        }
        catch (error) {
            console.log(error);
        }
    };



    function doEmptyStates() {
        // setDistrictId(0);
        // setprofileid(1);

        setDisplayName("");
        setPageURL("");
        setParentId(0);
        setParentOrder(0);
        setChildOrder(0);
        setCssClass("");

        setEdit(false)
    }


    const conditionalRowStyles = [
        {
            when: row => row.IsActive === false,
            style: {
                backgroundColor: "text-warning",
            }
        }
    ];


    const coloumn = [
        {
            name: "SNo.",
            width: "60px",
            selector: (row, index) => index + 1
        },
        {
            name: "Display Name",
            selector: (row) => row.DisplayName,
            sortable: true,
            reorder: true
        },
        {
            name: "Parent ID",
            selector: (row) => row.ParentId,
            sortable: true,
            reorder: true
        },
        {
            name: "Parent Order",
            selector: (row) => row.ParentOrder,
        },
        {
            name: "Page URL",
            selector: (row) => row.PageURL,
        },
        {
            name: "Icon Css Class",
            selector: (row) => row.CssClass,
        },
        {
            name: "Child Order",
            selector: (row) => row.ChildOrder,
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
                    <Button onClick={() => editCMenu(row.MenuId)} data-tip="Click to Edit Details" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Edit</Button>
                    {
                        <>
                            {
                                !row.IsActive
                                    ?
                                    <Button onClick={() => activateDeactiveCMenu(row.MenuId, "activate")} data-tip="Click to Activate User" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"  >Click to Activate</Button>
                                    :
                                    <Button onClick={() => activateDeactiveCMenu(row.MenuId, "deactivate")} data-tip="Click to Deactivate User" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">Click to Deactivate</Button>
                            }
                        </>
                    }
                </div>


        }
    ];

    const editCMenu = async (Id) => {
        try {
            console.warn("edit function called", Id);
            let items = lstCMenu.filter(x => {
                return x.MenuId === Id;
            });

            let PartentListData = lstCMenu.filter(x => x.ParentId == 0);
            setParentIdList(PartentListData);

            items.map(item => {
                console.warn(item);
                setDisplayName(item.DisplayName)
                setParentId(item.ParentId)
                setChildOrder(item.ChildOrder)
                setCssClass(item.CssClass)
                setPageURL(item.PageURL)
                setParentOrder(item.ParentOrder)

                setreturnId(item.MenuId)
            })

            setEdit(true)

            DisplayNameRef.current.focus();

        }
        catch (error) {
            console.log(error);
        }
    };

    const updateCMenu = async (Id) => {
        try {
            console.warn("hdn Id : " + returnId);
            let data = { DisplayName, PageURL, ParentId, ParentOrder, ChildOrder, CssClass, MaskUrl, ModifiedBy, ModifiedOn }

            fetch(ConcateURL + 'UpdateCMenu/' + Id,
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
                        getAllCMenu();
                        doEmptyStates();
                        enqueueSnackbar("Successfully Updated", { variant: "success" });
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };


    const activateDeactiveCMenu = async (Id, Value) => {
        try {
            console.log("Id Called :" + Id)

            let data = { Value }
            fetch(ConcateURL + 'ActivateDeactivateCMenu/' + Id,
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

                        getAllCMenu();
                        doEmptyStates();

                        Value == "activate" ?
                            enqueueSnackbar("Successfully Activated", { variant: "success" })
                            :
                            enqueueSnackbar("Successfully Deactivated", { variant: "success" })
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const result = lstCMenu.filter(x => {
            return x.DisplayName.toLowerCase().match(search.toLowerCase()) || x.PageURL.toLowerCase().match(search.toLowerCase());
        })

        setfilterCMenu(result);
    }, [search]);

    const tableData = { coloumn, filterCMenu };



    return (
        <div>
            <Layout>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Add New Side Menu Page
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Display Menu Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter Menu Name" maxLength={30} ref={DisplayNameRef} value={DisplayName} onChange={(e) => { setDisplayName(e.target.value) }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent Page
                                    </label>
                                    <select
                                        ref={ParentIdRef} value={ParentId} onChange={(e) => { setParentId(e.target.value) }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="0" selected>Select Parent Page</option>
                                        {
                                            ParentIdList && ParentIdList !== undefined
                                                ?
                                                ParentIdList.map((dis, index) => {
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent Order
                                    </label>
                                    <input
                                        type="text"
                                        ref={ParentOrderRef} maxLength={2} value={ParentOrder} onChange={(e) => { setParentOrder(e.target.value.replace(/\D/g, '')) }} placeholder="Enter Parent Order"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Page URL
                                    </label>
                                    <input
                                        type="text"
                                        ref={PageURLRef} maxLength={40} value={PageURL} onChange={(e) => { setPageURL(e.target.value) }} placeholder="Enter Page URL"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        CSS Icon
                                    </label>
                                    <input
                                        type="email"
                                        ref={CssClassRef} maxLength={50} value={CssClass} onChange={(e) => { setCssClass(e.target.value) }} placeholder="Enter Icon CSS"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Child Order
                                    </label>
                                    <input
                                        type="email"
                                        ref={ChildOrderRef} maxLength={2} value={ChildOrder} onChange={(e) => { setChildOrder(e.target.value.replace(/\D/g, '')) }} placeholder="Enter Child Order"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-3">
                                {
                                    edit == false ?
                                        <Button
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            onClick={() => ValidateCMenuandSubmit()}
                                        >
                                            <span>Add</span>
                                        </Button> :
                                        <Button
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            onClick={() => updateCMenu(returnId)}
                                        >
                                            <span>Update</span>
                                        </Button>
                                }

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
                                    title="Manage Menu Master"
                                    columns={coloumn}
                                    data={filterCMenu}
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

export default MenuMaster