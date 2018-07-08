import os
import tornado.web
import tornado.ioloop
import tornado.httpserver # 新引入httpserver模块

class IndexHandler(tornado.web.RequestHandler):
	"""主路由处理类"""
	def get(self):
		"""对应http的get请求方式"""
		self.render("main.html")

settings = {
"static_path": os.path.join(os.path.dirname(os.path.dirname(__file__)), "Gobang")
}

if __name__ == "__main__":
	app = tornado.web.Application([
	   (r"/", IndexHandler),
	])
	# ------------------------------
	# 我们修改这个部分
	# app.listen(8000)
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(8000)
	# ------------------------------
	tornado.ioloop.IOLoop.current().start()
