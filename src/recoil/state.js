import { atom } from 'recoil';

// Define Action like redux
const ADDRESS_LIST = 'addressListData';

// InitialState
const addressListState = atom({
    key: ADDRESS_LIST,
    default: []
});


// Define Action like redux
const PROVINCE_LIST = 'provinceListData';

// InitialState
const provinceListState = atom({
    key: PROVINCE_LIST,
    default: []
});


export { addressListState, provinceListState };
