cordova.define("com.ibm.mqa.MQA", function(require, exports, module) { var init = function (context) {
    'use strict';

    /*
        pluginName - value used in cordova.exec call, this should be the same value
        as specified in plugin.xml in <config-file><feature> `name` attribute,
        and in component.wcp <CordovaPlugin><Name> element.

        module - mięsko, whole MQA module with it's public functions, internally
        referenced by `internalModule` name.
    */
    var pluginName = 'MQAPlugin',
        module,
        isObject = function (obj) {
            var type = typeof obj;
            return type === 'function' || type === 'object' && !!obj;
        },

        isFunction = function (obj) {
            return typeof obj === 'function' || false;
        };


    /*
        Now let's create public module that will be injected as window.MQA by either Cordova
        or MFP.
    */
    module = (function () {
        /*
            Internal debug switch, If True it will add some console log messages
            on each cordova call to native code.
        */
        var internalDebug = false,

        /* Helper function to set attributes of given `source` object onto given `destination` object*/
        updateObject = function (destination, source) {
            var key;
            for (key in source) {
                if (source.hasOwnProperty(key) && !isObject(source[key])) {
                    destination[key] = source[key];
                }
            }
        },

        /*
            Stacktrace formatting function used for TraceKit library stacktraces.

            We need to send pure string to Native code so we are formatting
            stacktrace objects in this library.
        */
        formatStacktrace = function (stacktrace) {
            var stack = "", i, entry;
            for (i = 0; i < stacktrace.length; i++) {
                entry = stacktrace[i];
                stack += "In " + entry.url + " on line " + entry.line + " in function `" + entry.func + "`:\n";
                stack += entry.context.join('\n');
                stack += "\n";
            }
            return stack;
        },

        /* This function will be called always as cordova.exec successful callback */
        defaultSuccess = function (params) {
            if (internalDebug) {
                console.log("Cordova call success with params:" + JSON.stringify(params));
            }
        },

        /* This function will be called always as cordova.exec failure callback */
        defaultFailure = function (error) {
            if (internalDebug) {
                console.error(error);
            }
        },

        /*
            Main interface to Native SDK, this function is used internally to call
            native cordova plugin.

            `options`:
                It must contain `action` and `data` attributes that specify what
                function should be called by dispatch function in native code.
                `service` attribute is optional and can be used to call other Cordova plugins
                eg. device

                `success` and `error` attributes are optional. They should contain
                callbacks that will handle success and failure scenarios respectively.

        */
        call = function (options) {
            options.callbacks = options.callbacks || {};

            cordova.exec(
                /* Success function. It will always all `defaultSuccess` and `success` callback if given */
                function () {
                    defaultSuccess.apply(this, arguments);
                    if (isFunction(options.callbacks.success)) {
                        options.callbacks.success.apply(this, arguments);
                    }
                },
                /* Failure function. It will always all `defaultFailure` and `error` callback if given */
                function () {
                    defaultFailure.apply(this, arguments);
                    if (isFunction(options.callbacks.error)) {
                        options.callbacks.error.apply(this, arguments);
                    }
                },
                /* Cordova Plugin name, check `pluginName` docs at the top of this file. */
                options.service || pluginName,
                /* String `action` that will be used by native dispatch function to run given functionality */
                options.action,
                /* Additional data specific for given `action` */
                options.data || []
            );
        },

        /*
            This is public interface and main code for MQA library
        */
        innerModule = {
            /* Set insternal debug flag to given value */
            setDebug: function (debugFlag) {
                internalDebug = !!debugFlag;
            },

            /*

                Logging methods

            */
            log: function (tag, message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'log',
                    data: [tag, message, 'LOG']
                });
            },
            verbose: function (tag, message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'log',
                    data: [tag, message, 'VERBOSE']
                });
            },
            info: function (tag, message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'log',
                    data: [tag, message, 'INFO']
                });
            },
            warn: function (tag, message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'log',
                    data: [tag, message, 'WARNING']
                });
            },
            error: function (tag, message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'log',
                    data: [tag, message, 'ERROR']
                });
            },
            fatal: function (tag, message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'log',
                    data: [tag, message, 'FATAL']
                });
            },

            /*

                Feedback/Bugs Reporting

            */
            feedback: function (title, placeholder, callbacks) {
                var data = [title, placeholder];

                if (arguments.length === 2) {
                    if (isObject(placeholder)) {
                        callbacks = placeholder;
                        data = [title];
                    }
                } else if (arguments.length === 1) {
                    if (isObject(title)) {
                        callbacks = title;
                        data = [];
                    } else {
                        data = [title];
                    }
                } else if (arguments.length === 0) {
                    data = [];
                }

                call({
                    callbacks: callbacks,
                    action: 'feedback',
                    data: data
                });
            },

            sendFeedback: function (message, callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'sendFeedback',
                    data: [message]
                });
            },

            showReportScreen: function (callbacks) {
                call({
                    callbacks: callbacks,
                    action: 'report'
                });
            },

            /*

                Session initialization.

            */
            startNewSession: function (config, callbacks) {
                callbacks = callbacks || {};
                var self = this,
                    platform = device.platform.toLowerCase(),
                    platformConfig = {},
                    // For backward compatibility, call success with MQA module
                    callback = function () {
                        try {
                            if (isFunction(callbacks)) {
                                callbacks(self);
                            } else if (isFunction(callbacks.success)) {
                                callbacks.success(self);
                            } else {
                                //No function passed. Error ???
                                self.log("No callback function passed to startNewSession() call.");
                            }
                        } catch (e) {
                            context.MQATrace.report(e);
                        }
                    };

                updateObject(platformConfig, config);
                updateObject(platformConfig, config[platform]);

                call({
                    callbacks: {
                        success: callback,
                        error: callbacks.error
                    },
                    action: 'start',
                    data: [platformConfig || {}]
                });
            },

            /*

                Crash Reporting

            */
            onError: function (error) {
                call({
                    action: 'crash',
                    data: [error.message, formatStacktrace(error.stack)]
                });
            },

            /*

                Public Information

            */
            VERSION: '3.0.14',
            NATIVE_VERSION: {
                android: '2.9.4',
                ios: '2.4.1'
            }
        };
        return innerModule;
    }());

    if(!isObject(context.MQATrace)){
        context.MQATrace = {
            report: {
                subscribe: function () {}
            }
        }
    }

    context.MQATrace.report.subscribe(module.onError);

    return module
};

if (typeof module === 'object' && !!module) {
    module.exports = init(this);
} else {
    window.MQA = init(window);
}

});
