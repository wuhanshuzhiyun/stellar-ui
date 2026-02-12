/**
 * @param {'WXSceneSession' | 'WXSceneTimeline' | 'WXSceneFavorite'} scene
 * @param {{id: string;path: string;type: number;webUrl: string}} miniProgram
 * @param {{page: string;image: string;name: string;desc: string;price:string}} data
 */
export const share = (scene, miniProgram, data) => {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: data.image,
			success: (res) => {
				console.log('imageUrl===', res.tempFilePath);
				const options = {
					provider: 'weixin',
					scene,
					type: 5,
					miniProgram: Object.assign({ type: 0, webUrl: res.tempFilePath }, miniProgram),
					imageUrl: res.tempFilePath,
					title: data.name,
					summary: `${data.name} #${data.desc}`,
				};
				console.log('options====', options);
				uni.share({
					...options,
					success: (res) => {
						console.log('分享成功', res);
						resolve(res);
					},
					fail: (err) => {
						console.log('分享失败', err);
						reject(err);
					},
				});
			},
			fail: (err) => {
				console.log('下载失败', err);
				reject(err);
			},
		});
	});
};
