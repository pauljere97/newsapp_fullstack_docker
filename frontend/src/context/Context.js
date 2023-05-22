import { createContext } from "react";

export const Context = createContext({})

export const State = {
    user:null,
    auth:null,
    preference:null,
    feed:[],
    query_string:'',
    date_from:'',
    date_to:'',
    source:'',
    category:'',
    author:'',
    page:1,
    is_loading: false,
    mobile_pref_out: false,
    mobile_filter_out: false
}
