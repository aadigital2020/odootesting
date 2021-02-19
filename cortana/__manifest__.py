# -*- coding: utf-8 -*-
{
    'name': "Cortana",

    'summary': """Cortana""",

    'description': """Cortana""",

    'author': "A&A Limited",
    'website': "http://www.aa-limited.com",

    'category': 'Test',
    'version': '8.0',

    'depends': ['base', 'web', 'web_studio', 'studio_customization'],

    'data': [
        'views/assets.xml',
        # 'views/today_search.xml',
    ],

    'external_dependencies': {
        'python' : [],
    },

    'qweb': [
        'qweb/export_button.xml',
    ],
}