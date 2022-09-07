"use strict";
exports.__esModule = true;
exports["default"] = [
    {
        method: 'GET',
        path: '/',
        handler: 'settingsController.index',
        config: {
            policies: []
        }
    },
    {
        method: 'PUT',
        path: '/update-settings',
        handler: 'settingsController.updateSettings',
        config: {
            policies: []
        }
    },
];
