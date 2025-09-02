import React, { useState, useEffect, useFocus, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import Layout from '../../Component/Layout/Layout.js';
import DataTable from 'react-data-table-component';
import { SnackbarProvider, useSnackbar } from "notistack";
import { APIUrl } from '../../Helper/APIUrl.js';

function ActivityLog() {
    const { enqueueSnackbar } = useSnackbar();
    const ConcateURL = APIUrl.ActivityLog;

    const [val, setVal] = useState(0);
    const [search, setsearch] = useState("");
    const [ActivityLog, setActivityLog] = useState([]);
    const [filterActivityLog, setfilterActivityLog] = useState([]);

    const getAllActivityLogs = async () => {
        try {
            fetch(ConcateURL + 'GetAllActivityLog',
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
                            setActivityLog(result.data);
                            setfilterActivityLog(result.data);
                            //console.log(result.data)
                        }
                        else {
                            setActivityLog([]);
                            setfilterActivityLog([]);
                        }
                    })
                })
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllActivityLogs();
    }, []);

    const tableData = { coloumn, filterActivityLog };

    const coloumn = [
        {
            name: "SNo.",
            selector: (row, index) => index + 1
        },      
        {
            name: "UserName",
            selector: (row) => row.UserName,
            sortable: true,
            reorder: true
        },
        {
            name: "Time Stamp",
            selector: (row) => row.TimeStamp,
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    >
                                        <option value="0" selected>Select District Name</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div class="overflow-x-auto">
                                <DataTable
                                    title="Manage App Users"
                                    columns={coloumn}
                                    data={filterActivityLog}
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
    );
}

export default ActivityLog;
