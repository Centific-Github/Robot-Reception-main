System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            config = {
                //webapi: "http://localhost:4593",
                webapi: "https://bot.ipactor.com",
                tinymceBaseConfig: {
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor textcolor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table contextmenu paste code help'
                    ],
                    toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | mygallery | help',
                },
                uploadFileMaxSize50: 50 * 1024 * 1024,
                uploadFileMaxSize20: 20 * 1024 * 1024,
                casServerUrl: "https://auth.pactera.com/",
                casLoginUrl: "https://auth.pactera.com/login",
                sysDomain: "http://bot.ipactor.com"
            };
            exports_1("default", config);
        }
    };
});
//# sourceMappingURL=config.prd.js.map