# -*- coding: utf-8 -*-
{
    'name': "Cortana",

    'summary': """Cortana""",

    'description': """Cortana""",

    'author': "A&A Limited",
    'website': "http://www.aa-limited.com",

    'category': 'Test',
    'version': '0.6',

    'depends': ['base', 'web'],

    'data': [
        'views/assets.xml',
    ],

    'external_dependencies': {
        'python' : ['pdfkit'],
    },

    'qweb': [
        'qweb/export_button.xml',
    ],
}