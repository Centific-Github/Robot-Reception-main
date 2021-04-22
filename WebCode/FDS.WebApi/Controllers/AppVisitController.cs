using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FDS.Model;
using FDS.WebApi.Model;
using FDS.WebApi.Service;
using FDS.WebApi.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FDS.WebApi.Controllers
{
    [Route("api/AppVisit")]
    public class AppVisitController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        private IHttpContextAccessor _accessor;
        private readonly FDSContext db;
        private IAppAuthService _auth;

        public AppVisitController(FDSContext db, IHttpContextAccessor accessor, IAppAuthService auth)
        {
            this._accessor = accessor;
            this.db = db;
            this._auth = auth;
        }

        /// <summary>
        /// 记录visit时checkin等各种用户操作
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("VisitorCheckin")]
        public async Task<ResponseResult> VisitorCheckin([FromBody] VisitHistoryInputVM vm)
        {
            if (_auth.CheckAuthorization(_accessor.HttpContext.Request.Headers) == false)
            {
                return ResponseResult.Fail(-401, "授权失败");
            }

            EmployeeInfo emp = null;
            if (string.IsNullOrEmpty(vm.EmpNo))
            {
                emp = db.EmployeeInfos.SingleOrDefault(c => c.EmpNo == vm.EmpNo);
            }

            VisitHistoryInfo model = new VisitHistoryInfo()
            {
                LogId = Guid.NewGuid().ToString(),
                UpdateTime = DateTime.Now,
                VisitorName = vm.VisitorName,
                VisitorPhone = vm.VisitorPhone,
                ContanctEmpNo = vm.EmpNo,
                VisitReason = vm.VisitReason,
                VisitStatus = vm.VisitStatus,
                ContanctEmpDept = emp == null ? "" : emp.Department,
                ContanctEmpName = emp == null ? "" : emp.EmpName
            };

            try
            {
                db.VisitHistoryInfos.Add(model);
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(12132, "数据库操作失败", ex.Message);
            }


            return ResponseResult.Ok(true);
        }

        /// <summary>
        /// 查找联系人
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("FetchEmployees")]
        public async Task<ResponseResult> FetchEmployees()
        {
            if (_auth.CheckAuthorization(_accessor.HttpContext.Request.Headers) == false)
            {
                return ResponseResult.Fail(-401, "授权失败");
            }

            try
            {
                var list = db.EmployeeInfos.ToList();
                return ResponseResult.Ok(list);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(12132, "数据库操作失败", ex.Message);
            }
        }

        /// <summary>
        /// 获取部门列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("FetchDepartments")]
        public async Task<ResponseResult> FetchDepartments()
        {
            if (_auth.CheckAuthorization(_accessor.HttpContext.Request.Headers) == false)
            {
                return ResponseResult.Fail(-401, "授权失败");
            }

            try
            {
                var list = db.DepartmentInfos.ToList().Select(c => c.Department).ToList();
                return ResponseResult.Ok(list);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(12132, "数据库操作失败", ex.Message);
            }
        }

        /// <summary>
        /// 获取拜访原因列表
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("FetchVisitReason")]
        public async Task<ResponseResult> FetchVisitReasons()
        {
            if (_auth.CheckAuthorization(_accessor.HttpContext.Request.Headers) == false)
            {
                return ResponseResult.Fail(-401, "授权失败");
            }

            try
            {
                var list = db.VisitReasonInfos.ToList();
                return ResponseResult.Ok(list);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(12132, "数据库操作失败", ex.Message);
            }
        }
    }
}