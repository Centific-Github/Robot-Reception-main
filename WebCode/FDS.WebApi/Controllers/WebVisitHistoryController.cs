using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FDS.Model;
using FDS.WebApi.Model;
using FDS.WebApi.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FDS.WebApi.Controllers
{
    [Route("api/WebVisitHistory")]
    public class WebVisitHistoryController : Controller
    {
        private readonly FDSContext _db;

        public WebVisitHistoryController(FDSContext db)
        {
            this._db = db;
        }

        /// <summary>
        /// 分页查询拜访记录
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SearchHistoryPage")]
        public async Task<ResponseResult> SearchHistoryPage([FromBody] HistorySearchVM vm)
        {
            try
            {
                var pageNumber = vm.Page;
                var query = _db.VisitHistoryInfos.AsQueryable();

                if (vm.StartTime != null && vm.EndTime != null)
                {
                    //query = query.Where(c => c.UpdateTime > (DateTime)vm.StartTime.Value.Date && c.UpdateTime < (DateTime)vm.StartTime.Value.AddDays(1).Date);

                    query = query.Where(c => c.UpdateTime > (DateTime)vm.StartTime.Value && c.UpdateTime < (DateTime)vm.StartTime.Value);
                }

                query = query.Where(p => (string.IsNullOrEmpty(vm.VisitName) || p.VisitorName.Contains(vm.VisitName)) && (string.IsNullOrEmpty(vm.EmployeeName) || p.ContanctEmpName.Contains(vm.EmployeeName) && (int)(vm.CheckInType) == p.VisitStatus));

                var totalCount = query.Count();
                var list = await query.OrderByDescending(p => p.UpdateTime)
                      .Skip((pageNumber - 1) * vm.Size).Take(vm.Size)
                      .ToListAsync()
                      .ConfigureAwait(false);

                return ResponseResult.Ok(new { list = list, totalCount = totalCount }, "");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }
    }
}