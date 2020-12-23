# -*- coding: utf-8 -*-
from odoo import http
import simplejson

class Cortana(http.Controller):
    @http.route('/cortana/cortana/export', type='http', auth='user')
    def export(self, **kw):
        request.make_response(
            simplejson.dumps({'response': 'OK'}),
            [('Content-Type', 'application/json'),
        ])

    @http.route('/cortana/cortana/example/ajax', type='json', auth='user')
    def ajax(self, **kw):
        return 'bbb'