export const getToken = () => {
	return uni.getStorageSync("token");
}

export const setToken = (token) => {
	uni.setStorageSync("token", token);

}

export const removeToken = () => {
	uni.removeStorageSync("token");
	uni.removeStorageSync("user-info");
}