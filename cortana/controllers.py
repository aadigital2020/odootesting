class MyController(odoo.http.Controller):
    @route('/cortana/export_button', type='http', auth='user')
    def handler(self):
        return 'test test'