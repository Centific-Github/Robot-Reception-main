System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            /**
             * 使用类的方式实现,
             *  继承一个基类,基类中的变量是所有环境一样的变量,
             *  子类中的是和环境有关的变量
             */
            config = {
                webapi: "http://localhost:4593",
                //webapi: "https://bot.ipactor.com",
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
                //sysDomain: "http://bot.ipactor.com"
                sysDomain: "http://127.0.0.1:8033"
            };
            exports_1("default", config);
        }
    };
});
//# sourceMappingURL=config.js.map