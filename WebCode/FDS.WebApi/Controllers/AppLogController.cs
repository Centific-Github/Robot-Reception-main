using FDS.Model;
using FDS.WebApi.Model;
using FDS.WebApi.Service;
using FDS.WebApi.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.Controllers
{
    [Route("api/AppLog")]
    public class AppLogController : Controller
    {
        private readonly FDSContext _db;
        private IHttpContextAccessor _accessor;
        private IAppAuthService _auth;
        private readonly ILogService LogService;

        public AppLogController(FDSContext db, IHttpContextAccessor accessor, IAppAuthService auth, ILogService logService)
        {
            this._db = db;
            this._accessor = accessor;
            this._auth = auth;
            this.LogService = logService;
        }

        /// <summary>
        /// app端添加日志
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("AddLog")]
        public async Task<ResponseResult> AddLog([FromBody]LogInfoAddVM vm)
        {
            if (_auth.CheckAuthorization(_accessor.HttpContext.Request.Headers) == false)
            {
                return ResponseResult.Fail(-401, "授权失败");
            }

            LogService.AddLogAsync(vm, EnumLogSide.AppFront);
            return ResponseResult.Ok();
        }
    }
}
