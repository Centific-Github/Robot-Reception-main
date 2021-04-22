using FDS.Model;
using FDS.WebApi.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FDS.WebApi.Controllers
{
    [Route("api/WebVisitReason")]
    public class WebVisitReasonController : Controller
    {
        private readonly FDSContext _db;

        public WebVisitReasonController(FDSContext db)
        {
            this._db = db;
        }

        /// <summary>
        /// 获取VisitReason
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAll")]
        public async Task<ResponseResult> GetAll()
        {
            try
            {
                return ResponseResult.Ok(_db.VisitReasonInfos.ToList());
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }

        /// <summary>
        /// 添加VisitReason
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddReason")]
        public async Task<ResponseResult> AddReason(string reason)
        {
            try
            {
                if (!string.IsNullOrEmpty(reason))
                {
                    VisitReasonInfo re = new VisitReasonInfo()
                    {
                        VisitReason = reason
                    };

                    _db.VisitReasonInfos.Add(re);
                    _db.SaveChanges();
                    return ResponseResult.Ok(re);
                }

                return ResponseResult.Fail(-1, "no data to add");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }

        /// <summary>
        /// 删除VisitReason
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteReason")]
        public async Task<ResponseResult> DeleteReason(int reasonId)
        {
            try
            {
                var re = _db.VisitReasonInfos.SingleOrDefault(c => c.Id == reasonId);
                if (re == null)
                {
                    return ResponseResult.Fail(Erros.InstanceNotFound.Code, "can't find this reason");
                }

                _db.VisitReasonInfos.Remove(re);
                _db.SaveChanges();
                return ResponseResult.Ok(re);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }

        /// <summary>
        /// 修改VisitReason
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("EditReason")]
        public async Task<ResponseResult> EditReason([FromBody] VisitReasonInfo reason)
        {
            try
            {
                var re = _db.VisitReasonInfos.SingleOrDefault(c => c.Id == reason.Id);
                if (re == null)
                {
                    return ResponseResult.Fail(Erros.InstanceNotFound.Code, "can't find this reason");
                }

                re.VisitReason = reason.VisitReason;
                _db.SaveChanges();
                return ResponseResult.Ok(re);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }


        ///// <summary>
        ///// 保存
        ///// </summary>
        ///// <param name="vm"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("SaveVisitReasons")]
        //public async Task<ResponseResult> SaveVisitReasons([FromBody] List<VisitReasonVM> reasons)
        //{
        //    try
        //    {
        //        _db.VisitReasonInfos.RemoveRange(_db.VisitReasonInfos);
        //        reasons.RemoveAll(c => string.IsNullOrEmpty(c.VisitReason));

        //        List<VisitReasonInfo> list = new List<VisitReasonInfo>();

        //        if (reasons != null && reasons.Count > 0)
        //        {
        //            foreach (var reason in reasons)
        //            {
        //                if (!string.IsNullOrEmpty(reason.VisitReason))
        //                {
        //                    list.Add(new VisitReasonInfo() { VisitReason = reason.VisitReason });
        //                }
        //            }

        //            _db.VisitReasonInfos.AddRange(list);
        //            _db.SaveChanges();
        //            return ResponseResult.Ok();
        //        }
        //        else
        //        {
        //            return ResponseResult.Fail(Erros.InstanceNotFound.Code, "至少需要一个数据");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return ResponseResult.Fail(-1, "数据操作出错", ex.Message);
        //    }
        //}
    }
}
