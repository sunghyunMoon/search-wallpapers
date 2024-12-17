import reqeust from './request';

// https://pixabay.com/api/?key=47596133-e1f5da60f2034e01296c00df6&q=yellow+flowers&image_type=photo
const BASE_URL = 'https://pixabay.com/api';

const defaultParam = {
    key: process.env.REACT_APP_PIXABAY,
};

const getWallPapers = async (paramObj) => {
    const param = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    console.log(param);
    const fetchData = await reqeust(`${BASE_URL}/?${param}`);
    return fetchData;
};

export default getWallPapers;
