# -*- coding: utf-8 -*-
from odoo import http
import pdfkit
import json

class Cortana(http.Controller):
    @http.route('/cortana/cortana/export', type='json', auth='user')
    def export(self, **kw):
        models = http.request.env['x_this_is_tour_123'].search([]) # Change model name

        # Print models
        raw_data = models.read()
        return raw_data

    @http.route('/cortana/cortana/export2', type='http', auth='user')
    def export2(self, **kw):
        models = http.request.env['x_this_is_tour_123'].search([]) # Change model name

        pdfkit.from_string('Hello!', 'out.pdf')

        # Download PDF
        # pdf = 'abc'
        # headers = [
        #     ('Content-Type', 'application/pdf'),
        #     ('Content-Length', len(pdf))
        # ]
        # return http.request.make_response(pdf, headers=headers)
    
    @http.route('/cortana/cortana/download_json', type='http', auth='user')
    def download_json(self, **kw):
        data = json.dumps(
            {
                'name': 'John',
                'age': 30,
                'city': 'New York'
            }
        )
        return http.request.make_response(data, [
            ('Content-disposition', 'attachment; filename=export.json'),
            ('Content-Type', 'application/json'),
        ])