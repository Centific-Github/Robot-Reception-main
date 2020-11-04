using FDS.Model;
using FDS.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.Service
{
    public interface ILogService
    {
        /// <summary>
        /// 添加日志
        /// </summary>
        /// <param name="vm"></param>
        /// <param name="side"></param>
        Task<bool> AddLogAsync(LogInfoAddVM vm, EnumLogSide side);
    }
}
