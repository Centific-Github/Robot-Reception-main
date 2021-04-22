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
    [Route("api/WebAppAuth")]
    public class WebAppAuthController : Controller
    {
        private readonly FDSContext _db;
        private readonly IHttpContextAccessor _accessor;
        private readonly IAppAuthService _auth;

        public WebAppAuthController(FDSContext db, IHttpContextAccessor accessor, IAppAuthService auth)
        {
            this._db = db;
            this._accessor = accessor;
            this._auth = auth;
        }

        [HttpPost]
        [Route("UpateAppAuth")]
        public async Task<ResponseResult> UpateAppAuth([FromBody] AppAuthVM vm)
        {
            if (string.IsNullOrEmpty(vm.Psw) || string.IsNullOrEmpty(vm.AuthKey))
            {
                return ResponseResult.Fail(-1, "psw and authkey can not be null");
            }

            try

            {
                var ak = _db.CommonConfigs.SingleOrDefault(c => c.Name == StaticData.ConfigName_AuthKey);
                if (ak != null)
                {
                    ak.Value = vm.AuthKey;
                }
                else
                {
                    CommonConfig newAk = new CommonConfig()
                    {
                        Value = vm.AuthKey,
                        IsSystem = true,
                        Name = StaticData.ConfigName_AuthKey
                    };
                    _db.CommonConfigs.Add(newAk);
                }

                var pw = _db.CommonConfigs.SingleOrDefault(c => c.Name == StaticData.ConfigName_PSW);
                if (pw != null)
                {
                    pw.Value = vm.Psw;
                }
                else
                {
                    CommonConfig newPsw = new CommonConfig()
                    {
                        Value = vm.Psw,
                        IsSystem = true,
                        Name = StaticData.ConfigName_PSW
                    };
                    _db.CommonConfigs.Add(newPsw);
                }

                _auth.FreshAuthKey();
                await _db.SaveChangesAsync();
                return ResponseResult.Ok();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }
        }


        [HttpGet]
        [Route("GetAppAuth")]
        public async Task<ResponseResult> GetAppAuth()
        {
            AppAuthVM vm = new AppAuthVM();

            try
            {
                var ak = _db.CommonConfigs.SingleOrDefault(c => c.Name == StaticData.ConfigName_AuthKey);
                vm.AuthKey = ak == null ? "" : ak.Value;


                var pw = _db.CommonConfigs.SingleOrDefault(c => c.Name == StaticData.ConfigName_PSW);
                vm.Psw = pw == null ? "" : pw.Value;

                return ResponseResult.Ok(vm);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }
        }
    }
}
