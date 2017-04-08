"use strict";
//引入核心模块
const http = require('http');
const fs = require('fs');
const path = require('path');
//创建一个服务器
http.createServer(function (req, res) {
	let url = req.url;
	if(!url.includes('.')){
		url = 'index.html';
	}
	//根据请求的url扩展名选择加载响应的静态页面
	let absPath = path.join(__dirname,url);
	fs.readFile(absPath, function (err, data) {
		if (err) {
			return res.end(err.message);
		}
		getContentTypeByExtName(path.extname(absPath), function (err, mime) {
			if (err) {
				return res.end(err.message);
			}
			//设置响应头
			res.writeHead(200, {
				"Content-Type" : mime
			});
			res.end(data);
		});
	});
}).listen(8080,'127.0.0.1');
function getContentTypeByExtName(extName, callback) {
	fs.readFile(path.join(__dirname, 'mime.txt'), 'utf8', function (err, data) {
		if (err) {
			return callback(err, null);
		}
		try {
			let jsonObj = JSON.parse(data);
			callback(null, jsonObj[extName] ? jsonObj[extName] : 'text/plain');
		}catch (e) {
			callback(e, null);
		}
	});
}