import React, { useState, useEffect, useFocus, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../Layout/Layout';
import DataTable from 'react-data-table-component';
import { APIUrl } from '../../Helper/APIUrl.js';
import { SnackbarProvider, useSnackbar } from "notistack";
import { data } from 'autoprefixer';

function SZType() {
    const { enqueueSnackbar } = useSnackbar();

    const [val, setVal] = useState(0);

    const [search, setsearch] = useState("");
    const [sztype, setsztype] = useState([]);
    const [filtersztype, setfiltersztype] = useState([]);

    //Use Ref for Focus
    const TypeNameInputRef = useRef(null);

    const [zsection, setzsection] = useState([]);

    //Insert and Update UseStates

    const [TypeId, setTypeId] = useState("");
    const [TypeName, setTypeName] = useState("");
    const [SectionId, setSectionId] = useState(0);
    const [SectionName, setSectionName] = useState("");

    const [IsActive, setisactive] = useState(true);
    const [CreatedBy, setCreatedBy] = useState(1);
    const [CreatedOn, setCreatedOn] = useState("");
    const [ModifiedBy, setModifiedBy] = useState(1);
    const [ModifiedOn, setModifiedOn] = useState("");

    //Edit Populates States
    const [edit, setEdit] = useState(false);
    const [returnId, setreturnId] = useState(0);

    //API : Base Url + Controller Name
    const ConcateURL = APIUrl.SZType;


    function doEmptyStates() {
        setTypeName("");
        setSectionId("");
        setSectionName("");
        setEdit(false)
    }

    const getAllZSections = async () => {

        try {
            fetch(APIUrl.ZSections + 'GetAllZSections',
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
                            console.log('dsdsdd', result.data)
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    const getAllsztypes = async () => {
        try {

            fetch(ConcateURL + 'GetAllSZType',
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
                            setsztype(result.data);
                            setfiltersztype(result.data);
                            console.log(result.data)
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllsztypes();
        getAllZSections();
    }, []);

    const insertsztypes = async () => {
        try {
            debugger
            if (SectionId === 0 || SectionId === "0") {
                enqueueSnackbar("Select Section", { variant: "warning" });
                return;
            }
            else if (TypeName.length == 0) {
                enqueueSnackbar("Enter SZType ", { variant: "warning" });
                return;
            }
            else {
                console.warn(returnId);
                let data = { TypeName, SectionId, IsActive, CreatedBy, ModifiedBy }
                fetch(ConcateURL + 'InsertSZType',
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

                            getAllsztypes();
                            doEmptyStates();
                        })
                    })
            }

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
            name: "Section Name",
            selector: (row) => row.SectionName,
            sortable: true,
            reorder: true
        },
        {
            name: "Type Name",
            selector: (row) => row.TypeName,
        },
        {
            name: <strong>Activated/Deactivated</strong>,
            selector: (row) => row.IsActive ? <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Activated</label> : <label class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Deactivated</label>,
        },
        {
            name: "Action",
            cell: row =>
                <div>
                    <Button onClick={() => editsztypes(row.TypeId)} data-tip="Click to Edit Details" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Edit</Button>
                    {
                        <>
                            {
                                !row.IsActive
                                    ?
                                    <Button onClick={() => activateDeactiveUser(row.TypeId, "activate")} data-tip="Click to Activate User" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"  >Click to Activate</Button>
                                    :
                                    <Button onClick={() => activateDeactiveUser(row.TypeId, "deactivate")} data-tip="Click to Deactivate User" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">Click to Deactivate</Button>
                            }
                        </>
                    }
                </div>
        }
    ];

    const editsztypes = async (Id) => {
        try {

            let items = sztype.filter(x => {
                return x.TypeId === Id;
            });

            items.map(item => {
                console.warn(item);
                setTypeId(item.TypeId)
                setTypeName(item.TypeName)
                setSectionId(item.SectionId)

                setreturnId(item.TypeId)
            })

            setEdit(true)

            TypeNameInputRef.current.focus();

        }
        catch (error) {
            console.log(error);
        }
    };

    const updatesztypes = async (Id) => {
        try {

            if (TypeName.length >= 1) {
                console.warn("hdn Id : " + returnId);
                let data = { TypeId, TypeName, SectionId, ModifiedBy }
                fetch(ConcateURL + 'UpdateSZType/' + Id,
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
                            getAllsztypes();
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
            fetch(ConcateURL + 'ActivateDeactivateSZType/' + Id,
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

                        getAllsztypes();
                        doEmptyStates();

                        Value == "activate" ?
                            enqueueSnackbar("Successfully Activated", { variant: "success" })
                            :
                            enqueueSnackbar("Successfully Deactivated", { variant: "success" });
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const result = sztype.filter(x => {
            return x.UserName && x.UserName.toLowerCase().match(search.toLowerCase());
        })
        setfiltersztype(result);
    }, [search]);

    const tableData = { coloumn, filtersztype };


    return (
        <div>
            <Layout>
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Add New SZType
                            </h2>


                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Section
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        onChange={(e)=>setSectionId(e.target.value)}
                                    >
                                        <option value="0" selected>Select Section</option>
                                        {
                                            zsection && zsection !== undefined
                                                ?
                                                zsection.map((dis, index) => {
                                                    return (
                                                        <option value={dis.SectionId} >{dis.SectionName}</option>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Type Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        ref={TypeNameInputRef}
                                        value={TypeName}
                                        onChange={(e) => { setTypeName(e.target.value) }}
                                        placeholder="Enter Type Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-3">
                                {
                                    edit == false ?
                                        <Button
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            onClick={() => insertsztypes()}
                                        >
                                            <span>Add</span>
                                        </Button> :
                                        <Button
                                            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            onClick={() => updatesztypes(returnId)}
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
                                    title="Manage SZType"
                                    columns={coloumn}
                                    data={filtersztype}
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

export default SZType