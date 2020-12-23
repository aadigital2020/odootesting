# -*- coding: utf-8 -*-
from odoo import http

class Cortana(http.Controller):
    @http.route('/cortana/export', type='json', auth='user')
    def handler(self, **kw):
        return 'aaa'