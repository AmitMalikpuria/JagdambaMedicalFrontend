import React, { useState, useEffect, useFocus, useRef } from 'react'
import Layout from '../Layout/Layout.js';
import { APIUrl } from '../../Helper/APIUrl.js';
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component';

function ZSection() {

    const { enqueueSnackbar } = useSnackbar();


    const [val, setVal] = useState(0);

    const [search, setsearch] = useState("");
    const [zsection, setzsection] = useState([]);
    const [filterzsection, setfilterzsection] = useState([]);

    //Use Ref for Focus
    const ZSectionInputRef = useRef(null);

    //Insert and Update UseStates

    const [SectionId, setSectionId] = useState("");
    const [SectionName, setSectionName] = useState("");
    const [Remarks, setRemarks] = useState("");
    const [IsActive, setisactive] = useState(true);
    const [CreatedBy, setCreatedBy] = useState(1);
    const [CreatedOn, setCreatedOn] = useState("");
    const [ModifiedBy, setModifiedBy] = useState(1);
    const [ModifiedOn, setModifiedOn] = useState("");

    //Edit Populates States
    const [edit, setEdit] = useState(false);
    const [returnId, setreturnId] = useState(0);

    //API : Base Url + Controller Name
    const ConcateURL = APIUrl.ZSections;


    function doEmptyStates() {
        setSectionName("");
        setRemarks("");

        setEdit(false)
    }

    const getAllZSections = async () => {
        try {

            fetch(ConcateURL + 'GetAllZSections',
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
                            setzsection(result.data);
                            setfilterzsection(result.data);
                            console.log('GetAllZSections', result.data)
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllZSections();
    }, []);

    const insertzsections = async () => {
        try {
            if (SectionName.length >= 1 && Remarks.length > 3) {
                console.warn(returnId);
                let data = { SectionName, Remarks, IsActive, CreatedBy, ModifiedBy }
                fetch(ConcateURL + 'InsertZSections',
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

                            getAllZSections();
                            doEmptyStates();

                        })
                    })
            }
            else {
                enqueueSnackbar("fill all the required details to submit", { variant: "warning" });               
            }

        }
        catch (error) {
            console.log(error);
        }
    };

    const coloumn = [
        {
            name: <strong> SNo.</strong>,
            selector: (row, index) => index + 1
        },
        {
            name: <strong>Reference Ids</strong>,
            selector: (row) => row.SectionId,
        },
        {
            name: <strong>Section Name</strong>,
            selector: (row) => row.SectionName,
            sortable: true,
            reorder: true
        },
        {
            name: <strong>Remarks</strong>,
            selector: (row) => row.Remarks,
        },
        {
            name: <strong>Activated/Deactivated</strong>,
            selector: (row) => row.IsActive ? <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Activated</label> : <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Deactivated</label>,
        },
        {
            name: <strong>Action</strong>,
            cell: row =>
                <div>
                    <Button onClick={() => editzsections(row.SectionId)} data-tip="Click to Edit Details" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Edit</Button>
                    {
                        <>
                            {
                                !row.IsActive
                                    ?
                                    <Button onClick={() => activateDeactiveUser(row.SectionId, "activate")} data-tip="Click to Activate User" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"  >Click to Activate</Button>
                                    :
                                    <Button onClick={() => activateDeactiveUser(row.SectionId, "deactivate")} data-tip="Click to Deactivate User" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">Click to Deactivate</Button>
                            }
                        </>
                    }
                </div>
        }
    ];

    const editzsections = async (Id) => {
        try {

            console.warn("edit function called", Id);
            let items = zsection.filter(x => {
                return x.SectionId === Id;
            });

            items.map(item => {
                console.warn(item);
                setSectionId(item.SectionId)
                setSectionName(item.SectionName)
                setRemarks(item.Remarks)

                setreturnId(item.SectionId)
            })

            setEdit(true)

            ZSectionInputRef.current.focus();

        }
        catch (error) {
            console.log(error);
        }
    };

    const updatezsections = async (Id) => {
        try {
            if (SectionName.length > 3 && Remarks.length > 3) {
                console.warn("hdn Id : " + returnId);
                let data = { SectionId, SectionName, Remarks, ModifiedBy }
                fetch(ConcateURL + 'UpdateZSections/' + Id,
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
                            //<AppToast data={{ color: "success", message: "Updated Successfully" }} />
                            getAllZSections();
                            doEmptyStates();
                            enqueueSnackbar("Successfully Updated", { variant: "Success" })
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
        debugger
        try {
            let data = { Value }
            fetch(ConcateURL + 'ActivateDeactivateZSections/' + Id,
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

                        getAllZSections();
                        doEmptyStates();

                        Value == "activate" ?
                            enqueueSnackbar("Successfully Activated", { variant: "success" })
                            :
                            enqueueSnackbar("Successfully Dectivated", { variant: "warning" })
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const result = zsection.filter(x => {
            return x.UserName.toLowerCase().match(search.toLowerCase());
        })

        setfilterzsection(result);
    }, [search]);

    const tableData = { coloumn, filterzsection };

    return (
        <div>
            <Layout>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Add New ZSection (Master Main Id / Reference Id)
                            </h2>


                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Section Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={SectionName}
                                        ref={ZSectionInputRef}
                                        onChange={(e) => { setSectionName(e.target.value) }}
                                        placeholder="Enter Section Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Remarks
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={Remarks}
                                        onChange={(e) => { setRemarks(e.target.value) }}
                                        placeholder="Enter Remarks"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>


                                {/* <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"


                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="">Select a role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Manager">Manager</option>
                                        <option value="User">User</option>
                                        <option value="Guest">Guest</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"


                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div> */}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-3">
                                {
                                    edit == false ?
                                        <Button                                            
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            onClick={() => insertzsections()}
                                        >
                                            <span>Add</span>
                                        </Button> :
                                        <Button                                            
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            onClick={() => updatezsections(returnId)}
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
                                    title="Manage ZSection (Master Main Id / Reference Id)"
                                    columns={coloumn}
                                    data={filterzsection}
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

export default ZSection