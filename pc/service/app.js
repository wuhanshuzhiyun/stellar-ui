const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const router = require('./src/routers');
const { origins, port } = require('./src/utils/getConfig')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: origins }));

app.use('/api', router);

// 静态资源
app.use('/static', express.static(path.join(process.cwd(), '/static')));

app.use((err, req, res, next) => {
	console.log('app.err', err);
	if (err.code) {
		res.send(err);
	} else {
		res.send({ code: 500, message: typeof err === 'string' ? err : JSON.stringify(err) });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
