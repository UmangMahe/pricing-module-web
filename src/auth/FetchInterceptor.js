import axios from 'axios'
import { API_BASE_URL } from '../configs/AppConfig'
import { notification } from 'antd';

const service = axios.create({
	baseURL: API_BASE_URL,
	timeout: 60000,
	errorNotification: true
})

// API Request interceptor
service.interceptors.request.use(config => {

	return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use((response) => {
	return response.data
}, (error) => {

	const { errorNotification } = error.response.config
	if (errorNotification) {
		// Do something with response error here
		let notificationParam = {
			message: ''
		}
		// Remove token and redirect 
		if (error.response?.status === 401) {
			notificationParam.message = 'Authentication Fail'
			notificationParam.description = 'Please login again'
		}

		else if (error.response?.status === 404) {
			notificationParam.message = 'Not Found'
		}

		else if (error.response.status === 500) {
			notificationParam.message = 'Internal Server Error'
		}

		else if (error.response?.status === 508) {
			notificationParam.message = 'Time Out'
		}

		else {
			if(error.response.data.message)
				notificationParam.message = error.response.data.message
			else
				notificationParam.message = error.message
		}

		notification.error(notificationParam)
	}

	return Promise.reject(error);
});

export default service