using FDS.Model;
using FDS.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FDS.WebApi.Service
{

    public class LogService : ILogService
    {
        private readonly FDSContext _db;

        public LogService(FDSContext db)
        {
            this._db = db;
        }

        /// <summary>
        /// 添加日志
        /// </summary>
        /// <param name="vm"></param>
        /// <param name="side"></param>
        public virtual async Task<bool> AddLogAsync(LogInfoAddVM vm, EnumLogSide side)
        {
            try
            {
                LogInfo log = new LogInfo()
                {
                    Info = vm.Info,
                    LogSide = side,
                    LogType = vm.LogType,
                    Time = DateTime.Now
                };

                // await Task.Delay(10000);
                await _db.LogInfos.AddAsync(log);
                _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
