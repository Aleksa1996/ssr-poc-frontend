/**
 * Console log utility
 */
export const consoleLog = (function () {
    let oldConsoleLog = null;
    let methods = {};

    methods.enable = function enable() {
        if (oldConsoleLog == null) return;

        global['console']['log'] = oldConsoleLog;
    };

    methods.disable = function disable() {
        oldConsoleLog = console.log;
        global['console']['log'] = function () { };
    };

    return methods;
})();