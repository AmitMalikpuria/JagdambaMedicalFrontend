import { Component } from "react"
import React from 'react'

// Base URL
const BaseUrl = "https://localhost:44369/";
//const BaseUrl = "https://erpapi.dlcsupva.ac.in/";

//Base URL + Controller Names

const ZSections = BaseUrl + "ZSections/";

const SZType = BaseUrl + "SZType/"

const CMenu = BaseUrl + "CMenu/"

const AAuthorizations = BaseUrl + "AAuthorizations/"

const UserRole = BaseUrl + "UserRole/"

const Account = BaseUrl + "Account/"

const ActivityLog = BaseUrl + "ActivityLog/"



export const APIUrl = {
    ZSections,
    SZType,
    CMenu,
    AAuthorizations,
    UserRole,
    Account,
    ActivityLog
}

