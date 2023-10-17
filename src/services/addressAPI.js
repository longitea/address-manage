import axios from 'axios';
import instance from './axiosInstance';
import { PROVINCE_URL } from '../constants/API_URL';



const loginData = {
    id: '0869017747',
    name: 'Phát',
    company_id: '9'
}

export const FakeLogin = async () => {
    try {
        // Nếu gọi thành công -> set token into LocalStorage
        const response = await instance.post('/sign-up-zalo', loginData)
        localStorage.setItem("loginToken", JSON.stringify(response.data.data.token));
        return response.data.data.token

    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
        throw error
    }
}

export const GetAddress = async () => {
    const loginToken = JSON.parse(localStorage.getItem('loginToken'));

    try {
        const response = await instance.get('/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country', {
            headers: {
                Authorization: `Bearer ${loginToken}`,
            }

        })
        return response.data

    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                try {
                    // Xử lý lỗi 401 ở đây
                    let newToken = await FakeLogin()
                    const newResponse = await instance.get('/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country', {
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                        }
                    })

                    return newResponse.data
                } catch (error) {
                    console.error('Lỗi ở lần gọi token thứ 2', error.response);
                }

            }
        }
    }
}

// Get by Fetch
export const GetAddressOld = async () => {
    const loginToken = localStorage.getItem('loginToken');

    // Gọi lần đầu tiên
    try {
        let response = await fetch(`${GET_ADDRESS_URL}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${loginToken}`,
            },
        });
        if (!response.ok) {
            // Nếu bị lỗi 401 thực hiện login lại và gán lại Login Token
            if (response.status === 401) {
                const newToken = await FakeLogin();
                const newResponse = await fetch(`${GET_ADDRESS_URL}`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${newToken}`,
                    },
                });

                // handle nếu login lại mà vẫn còn bị lỗi
                if (!newResponse.ok) {
                    throw new Error("Failed to Fake Login");
                }

                // thành công thì gán lại token mới và trả về data thôi
                Token = newToken
                let newData = await newResponse.json();
                return newData

            } else {
                throw new Error("Failed to Fake Login");
            }
        }

        // Nếu thành công trả về data
        let data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get Addressed');
    }
}

export const GetProvince = async () => {
    try {
        const response = await axios.get(PROVINCE_URL);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Lỗi từ API (status code không phải 2xx)
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Không nhận được response từ server
            console.error('No response from server:', error.request);
            throw 'API_URL Không hoạt động'
        } else {
            // Lỗi không xác định
            console.error('Không lấy được thông tin thành phố:', error.message);
        }
        throw error;
    }
}

export const addNewAddress = async (address) => {
    // lấy token
    const loginToken = JSON.parse(localStorage.getItem('loginToken'));

    try {
        const response = await instance.post(`/self/address`, {
            name: address.fullName,
            email: address.email,
            phone: address.phoneNumber,
            address: address.detailAddress,
            shipping_address: address?.detailAddress,
            zipcode: 1,
            city: address.city,
            state: address.district,
            country: 'VN'
        }, {
            headers: {
                Authorization: `Bearer ${loginToken}`,
            }
        });
        // if sucessful return data
        return response.data.message;
    } catch (error) {
        if (error.response) {
            // Hanle Mã lỗi trả về từ API 
            if (error.response.status === 401) {
                try {
                    // Xử lý lỗi 401 ở đây
                    let newToken = await FakeLogin()
                    const newResponse = await instance.post('/self/address', {
                        name: address.fullName,
                        email: address.email,
                        phone: address.phoneNumber,
                        address: address.detailAddress,
                        shipping_address: address.detailAddress,
                        zipcode: 1,
                        city: address.city,
                        state: address.district,
                        country: 'VN',

                    }, {
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                        }
                    })

                    return newResponse.data.message;
                } catch (error) {
                    console.error('Lỗi ở lần gọi token thứ 2', error.response);
                }
            }
        } else {
            console.error('Lỗi khi thêm mới Address:', error.message);
        }
    }
}

export const callEditAddress = async (addressId, address) => {

    const loginToken = JSON.parse(localStorage.getItem('loginToken'));

    try {

        const response = await instance.put(`/self/address/${addressId}`, {
            name: address.fullName,
            email: address.email,
            phone: address.phoneNumber,
            address: address.detailAddress,
            shipping_address: address.detailAddress,
            zipcode: 1,
            city: address.city,
            state: address.district,
            country: 'VN'
        }, {
            headers: {
                Authorization: `Bearer ${loginToken}`,
            }
        });
        // if sucessful return data
        return response.data.message;
    } catch (error) {
        if (error.response.status === 401) {
            try {
                // Xử lý lỗi 401 ở đây
                let newToken = await FakeLogin()
                const newResponse = await instance.put(`/self/address/${addressId}`, {
                    name: address.fullName,
                    email: address.email,
                    phone: address.phoneNumber,
                    address: address.detailAddress,
                    shipping_address: address.detailAddress,
                    zipcode: 1,
                    city: address.city,
                    state: address.district,
                    country: 'VN'
                }, {
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                    }
                })

                return newResponse.data.message;
            } catch (error) {
                console.error('Lỗi ở lần gọi token thứ 2', error.response);
            }

        } else {
            console.error('Failed to update address:', error);
        }
    }
}