using System;
using System.Collections.Generic;
using System.Text;

namespace FDS.Model
{
    public enum EnumLogType
    {
        Erro = 0,
        Warning = 1,
        Message = 2
    }

    public enum EnumLogSide
    {
        Unknown = 0,
        /// <summary>
        /// app 前端
        /// </summary>
        AppFront = 1,
        /// <summary>
        /// app 服务
        /// </summary>
        AppService = 2,
        /// <summary>
        /// web 前端
        /// </summary>
        WebFront = 3,
        /// <summary>
        /// web 后端
        /// </summary>
        WebService = 4
    }
}
