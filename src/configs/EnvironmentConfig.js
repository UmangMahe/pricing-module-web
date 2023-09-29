const dev = {
	API_ENDPOINT_URL: 'http://localhost:3002/api/v1',
};

const prod = {
	API_ENDPOINT_URL: 'http://localhost:3002/api/v1',
};


const getEnv = () => {
	switch (import.meta.env.MODE) {
		case 'development':
			return dev
		case 'production':
			console.log = () => {}
			console.error = ()=>{}
			return prod
		default:
			break;
	}
}

export const env = getEnv()
