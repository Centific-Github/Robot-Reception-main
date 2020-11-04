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
    [Route("api/AppDelivery")]
    public class AppDeliveryController : Controller
    {
        private readonly FDSContext _db;
        private IHttpContextAccessor _accessor;
        private IAppAuthService _auth;

        public AppDeliveryController(FDSContext db, IHttpContextAccessor accessor, IAppAuthService auth)
        {
            this._db = db;
            this._accessor = accessor;
            this._auth = auth;
        }

        /// <summary>
        /// 获取快递联系人信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("DeliveryContact")]
        public async Task<ResponseResult> DeliveryContact()
        {
            if (_auth.CheckAuthorization(_accessor.HttpContext.Request.Headers) == false)
            {
                return ResponseResult.Fail(-401, "授权失败");
            }

            try
            {
                var emp = _db.DeliveryContactInfos.FirstOrDefault();
                return ResponseResult.Ok(emp);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(12132, "数据库操作失败",ex.Message);
            }
        }


        ///// <summary>
        ///// 获取信息
        ///// </summary>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("getDeliveryContactList")]
        //public async Task<ResponseResult> getDeliveryContactList(int? page, int? size = 10, int? id = 0)
        //{
        //    try
        //    {
        //        var pageNumber = page ?? 1;
        //        var query = _db.DeliveryContactInfos.AsQueryable();
        //        var totalCount = query.Count();
        //        var list = await query.OrderBy(p => p.CreateDate)
        //        .Skip((pageNumber - 1) * size.Value).Select(c => new
        //        {
        //            c.CreateDate,
        //            c.EmpNo,
        //            c.EmpName,
        //            c.OfficePhone,
        //            c.PersonalPhone,
        //            c.ImgPath,
        //            c.Address
        //        })
        //        .Take(size.Value)
        //        .ToListAsync()
        //        .ConfigureAwait(false);

        //        return ResponseResult.Ok(new { list = list, totalCount = totalCount });
        //    }
        //    catch (Exception ex)
        //    {
        //        return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
        //    }
        //}


    }
}