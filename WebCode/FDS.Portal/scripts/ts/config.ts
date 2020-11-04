﻿/**
 * 使用类的方式实现,
 *  继承一个基类,基类中的变量是所有环境一样的变量,
 *  子类中的是和环境有关的变量
 */
const config = {
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
    casLoginUrl : "https://auth.pactera.com/login",
    //sysDomain: "http://bot.ipactor.com"
    sysDomain: "http://127.0.0.1:8033"
};
interface IConfig {
    webapi: string;
    uploadFileMaxSize50: number;
    uploadFileMaxSize20: number;
    casServerUrl: string;
    casLoginUrl: string;
    sysDomain: string
}
export default config;