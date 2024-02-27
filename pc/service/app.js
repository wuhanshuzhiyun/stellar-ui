const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./src/routers');
const { origins, port } = require(path.join(process.cwd(), './config'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: origins }));

app.use(router);

app.use((err, req, res, next) => {
	console.log(err);
	res.send({ code: 500, err: JSON.stringify(err) });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
