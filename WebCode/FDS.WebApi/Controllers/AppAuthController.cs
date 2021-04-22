using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FDS.Model;
using FDS.WebApi.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using FDS.WebApi.Service;

namespace FDS.WebApi.Controllers
{
    [Route("api/AppAuth")]
    public class AppAuthController : Controller
    {
        private readonly FDSContext _db;
        private IHttpContextAccessor _accessor;
        private IAppAuthService _auth;
        private readonly ILogService LogService;

        public AppAuthController(FDSContext db, IHttpContextAccessor accessor, IAppAuthService auth,ILogService logService)
        {
            this._db = db;
            this._accessor = accessor;
            this._auth = auth;
            LogService = logService;
        }

        /// <summary>
        /// 更新authkey时，用于验证密码
        /// </summary>
        /// <param name="psw"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("CheckPsw")]
        public async Task<ResponseResult> CheckPsw(string psw)
        {
            try
            {
                var pw = _db.CommonConfigs.SingleOrDefault(c => c.Name == StaticData.ConfigName_PSW && c.Value == psw);
                if (pw != null)
                {
                    return ResponseResult.Ok(true);
                }
                else
                {
                    return ResponseResult.Ok(false);
                }
            }
            catch (Exception ex)
            {
                LogService.AddLogAsync(new ViewModel.LogInfoAddVM() { Info = "", LogType = EnumLogType.Erro }, EnumLogSide.AppService);
                return ResponseResult.Fail(12132, "数据库操作失败", ex.Message);
            }
        }
    }
}
