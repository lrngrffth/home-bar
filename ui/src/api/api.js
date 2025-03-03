import axios from "axios";

const api = axios.create({baseURL: process.env.REACT_APP_BASE_URL});
const axiosConfig = {
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_NOTION_KEY}`,
        'Notion-Version': "2022-06-28",
        'Content-Type': "application/json"
    }
};

export async function getDatabase() {
    await api.get(`/v1/databases/${process.env.REACT_APP_RECIPES_PAGE_ID}`, {
        headers: {
            'Authorization': process.env.REACT_APP_NOTION_KEY,
            'Notion-Version': "2022-06-28",
        }
    }).then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    });
};



export async function getItemsFromDatabase(query) {
    let response = await api.post(`/v1/databases/${process.env.REACT_APP_RECIPES_PAGE_ID}/query`, query, axiosConfig
    ).then(response => {
        return response["data"]["results"];
    }).catch(error => {
        console.log(error)
        return []
    });
    return response;
};