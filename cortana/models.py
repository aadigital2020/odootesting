# -*- coding: utf-8 -*-

from odoo import models, fields, api

class InBoundTourExtend(models.Model):
    _inherit = 'studio_customization.x_in_bound_tour'

    field_1 = fields.Char(required=True,string="Field One")
    
    @api.model
    def create(self, vals):
        ## Definition
        return super(models.Model, self).create(vals)