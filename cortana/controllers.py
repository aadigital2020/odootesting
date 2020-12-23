# -*- coding: utf-8 -*-
from odoo import http
import simplejson

class Cortana(http.Controller):
    @http.route('/cortana/cortana', type='http', auth='user')
    def handler(self, **kw):
        return request.make_response(simplejson.dumps({"response": "OK"}), [('Content-Type', 'application/json')])

    @http.route('/cortana/cortana/example/ajax', type='json', auth='user')
    def handler(self, **kw):
        return 'bbb'