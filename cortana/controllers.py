# -*- coding: utf-8 -*-
from odoo import http

class Cortana(http.Controller):
    @http.route('/cortana/export', type='http', auth='user')
    def handler(self, **kw):
        return 'aaa'

    @http.route('/cortana/example/ajax', type='json', auth='user')
    def handler(self, **kw):
        return 'bbb'