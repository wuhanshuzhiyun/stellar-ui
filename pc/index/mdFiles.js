function requireAll(requre) {
	const mds = {};
	requre.keys().forEach((path) => {
		console.log(path);
		const key = path.replace(/^.*\/(.+)\/\w+\.md$/, '$1');
		const model = requre(path);
		mds[key] = model;
	});
	const components = Object.keys(mds).map((key) => ({ name: key, key }));
	return { mds, components };
}
const _datas = require.context('@/uni_modules/stellar-ui/components/', true, /README\.md$/);
const datas = requireAll(_datas);
export default datas;
