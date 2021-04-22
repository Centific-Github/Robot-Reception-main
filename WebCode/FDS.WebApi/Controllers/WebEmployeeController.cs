using FDS.Model;
using FDS.WebApi.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FDS.WebApi.ViewModel;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using OfficeOpenXml;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Cors;

namespace FDS.WebApi.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/WebEmployee")]
    public class WebEmployeeController : Controller
    {
        private readonly FDSContext _db;
        private IHostingEnvironment _hostingEnvironment;

        public WebEmployeeController(FDSContext db, IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            this._db = db;
        }

        /// <summary>
        /// 分页查询联系人
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetEmployeePage")]
        public async Task<ResponseResult> GetEmployeePage([FromBody] EmplyoeeSearchVM vm)
        {
            try
            {
                var pageNumber = vm.Page;
                var query = _db.EmployeeInfos.AsQueryable();

                query = query.Where(p => (string.IsNullOrEmpty(vm.Dept) || p.Department == vm.Dept) && (string.IsNullOrEmpty(vm.EmpNo) || p.EmpNo.Contains(vm.EmpNo) && string.IsNullOrEmpty(vm.Name) || p.EmpName.Contains(vm.Name)));

                var totalCount = query.Count();
                var list = await query.OrderByDescending(p => p.EmpNo)
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

        /// <summary>
        /// 添加联系人
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<ResponseResult> AddEmployee([FromBody] EmployeeInfo vm)
        {
            try
            {
                if (_db.EmployeeInfos.Any(o => o.EmpNo == vm.EmpNo))
                {
                    return ResponseResult.Fail(-1, "该员工号已存在");
                }
                _db.EmployeeInfos.Add(vm);
                _db.SaveChanges();

                return ResponseResult.Ok();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "数据操作出错", ex.Message);
            }
        }

        /// <summary>
        /// 删除联系人
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteEmployeeByEmpNo")]
        public async Task<ResponseResult> DeleteEmployeeByEmpNo(int id)
        {
            try
            {
                var emp = _db.EmployeeInfos.SingleOrDefault(o => o.Id == id);
                if (emp != null)
                {
                    _db.EmployeeInfos.Remove(emp);
                    _db.SaveChanges();
                    return ResponseResult.Ok();
                }
                else
                {
                    return ResponseResult.Fail(Erros.InstanceNotFound.Code, "该员工不存在");
                }
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "数据操作出错", ex.Message);
            }
        }

        /// <summary>
        /// 编辑联系人
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("EditEmployee")]
        public async Task<ResponseResult> EditEmployee([FromBody] EmployeeInfo vm)
        {
            try
            {
                if (_db.EmployeeInfos.Any(c => c.Id != vm.Id && c.EmpNo == vm.EmpNo))
                {
                    return ResponseResult.Fail(-1, "该员工号已存在");
                }

                var emp = _db.EmployeeInfos.SingleOrDefault(o => o.Id == vm.Id);
                if (emp != null)
                {
                    emp.Department = vm.Department;
                    emp.EmpName = vm.EmpName;
                    emp.EmpNo = vm.EmpNo;
                    emp.Gender = vm.Gender;
                    emp.ImgPath = vm.ImgPath;
                    emp.Level = vm.Level;
                    emp.OfficePhone = vm.OfficePhone;
                    emp.PersonalPhone = vm.PersonalPhone;
                    emp.Title = vm.Title;
                    emp.WorkPlace = vm.WorkPlace;

                    _db.SaveChanges();
                    return ResponseResult.Ok();
                }
                else
                {
                    return ResponseResult.Fail(Erros.InstanceNotFound.Code, "该员工不存在");
                }
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "数据操作出错", ex.Message);
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
            try
            {
                var list = _db.DepartmentInfos.ToList();
                return ResponseResult.Ok(list);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(12132, "数据库操作失败", ex.Message);
            }
        }

        [HttpGet]
        [Route("Export")]
        public async Task<IActionResult> Export()
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            var list = await _db.EmployeeInfos.ToListAsync();

            //var m = _db.Members.Find(id);
            var fileName = DateTime.Now.ToString("yyyyMMddHHMMss") + ".xlsx";
            FileInfo file = new FileInfo(Path.Combine(sWebRootFolder, fileName));
            using (ExcelPackage package = new ExcelPackage(file))
            {
                // 添加worksheet
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Sheet1");
                //添加头
                worksheet.Cells[1, 1].Value = "EmpNo";
                worksheet.Cells[1, 2].Value = "EmpName";
                worksheet.Cells[1, 3].Value = "Gender";
                worksheet.Cells[1, 4].Value = "Title";
                worksheet.Cells[1, 5].Value = "OfficePhone";
                worksheet.Cells[1, 6].Value = "PersonalPhone";
                worksheet.Cells[1, 7].Value = "Department";
                worksheet.Cells[1, 8].Value = "Level";

                //添加值
                for (int i = 1; i <= list.Count; i++)
                {
                    var r = list[i - 1];
                    worksheet.Cells[i + 1, 1].Value = r.EmpNo;
                    worksheet.Cells[i + 1, 2].Value = r.EmpName;
                    worksheet.Cells[i + 1, 3].Value = r.Gender == null ? "" : r.Gender.ToString();
                    worksheet.Cells[i + 1, 4].Value = r.Title;
                    worksheet.Cells[i + 1, 5].Value = r.OfficePhone;
                    worksheet.Cells[i + 1, 6].Value = r.PersonalPhone;
                    worksheet.Cells[i + 1, 7].Value = r.Department;
                    worksheet.Cells[i + 1, 8].Value = r.Level;
                }
           
               package.Save();
      
               
            }

            return File(fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            //return ResponseResult.Ok(File(fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        }


        [HttpPost]
        [Route("Import")]
        public async Task<ResponseResult> ImportAsync()
        {
            try
            {
                string sWebRootFolder = _hostingEnvironment.WebRootPath+ "\\Files\\import";
                var sFileName = DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx";
               
                var files = Request.Form.Files;
                foreach (var item in files)
                {
                    string[] FileType = item.FileName.Split('.');
                    if (FileType[FileType.Count() - 1] != "xlsx")
                    {
                        return ResponseResult.Fail(-1, "你导如的文件格式不正确，请导入excel文件格式（.xlsx,xls)");
                    }
                    using (FileStream fs = System.IO.File.Create(sWebRootFolder+"\\"+ sFileName))
                    {
                       //将上载文件的内容复制到目标流
                       item.CopyTo(fs);
                       //清除此流的缓冲区并导致将任何缓冲数据写入
                       fs.Flush();
                    }
                }
                //创建文件对象
                FileInfo file = new FileInfo(sWebRootFolder + "\\" + sFileName);
            
                using (ExcelPackage package = new ExcelPackage(file))
                {
                        StringBuilder sb = new StringBuilder("Fail：");
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
                        int rowCount = worksheet.Dimension.Rows;
                        int ColCount = worksheet.Dimension.Columns;
                        int errCount = 0;

                        if (worksheet.Cells[1, 1].Value == null
                            || worksheet.Cells[1, 2].Value == null
                            || worksheet.Cells[1, 3].Value == null
                            || worksheet.Cells[1, 4].Value == null
                            || worksheet.Cells[1, 5].Value == null
                            || worksheet.Cells[1, 6].Value == null
                            || worksheet.Cells[1, 7].Value == null
                            || worksheet.Cells[1, 8].Value == null
                            || !string.Equals(worksheet.Cells[1, 1].Value.ToString(), "EmpNo", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 2].Value.ToString(), "EmpName", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 3].Value.ToString(), "Gender", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 4].Value.ToString(), "Title", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 5].Value.ToString(), "OfficePhone", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 6].Value.ToString(), "PersonalPhone", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 7].Value.ToString(), "Department", StringComparison.CurrentCultureIgnoreCase)
                            || !string.Equals(worksheet.Cells[1, 8].Value.ToString(), "Level", StringComparison.CurrentCultureIgnoreCase))
                        {
                            return ResponseResult.Fail(-1, "wrong table header,please export file first and use it as template");
                        }


                        List<EmployeeInfo> list = new List<EmployeeInfo>();
                        // 下面是，如果所有数据都匹配成功了，那就要执行导入操作了。
                        for (int row = 2; row <= rowCount; row++)
                        {
                            if (errCount >= 10)
                            {
                                return ResponseResult.Fail(-777, sb.ToString());
                            }


                            EmployeeInfo newImp = new EmployeeInfo();

                            // 第一列：EmpNo
                            if (worksheet.Cells[row, 1].Value == null || string.IsNullOrEmpty(worksheet.Cells[row, 1].Value.ToString()))
                            {
                                sb.Append(string.Format("row:{0},cloumn{1}, employee number should not be empty", row, 1));
                                errCount++;
                            }
                            else
                            {
                                newImp.EmpNo = worksheet.Cells[row, 1].Value.ToString();
                            }

                            // 第二列 EmpName
                            newImp.EmpName = worksheet.Cells[row, 2].Value == null ? "" : worksheet.Cells[row, 2].Value.ToString();

                            // 第三列 Gender
                            if (worksheet.Cells[row, 3].Value == null)
                            {
                                sb.Append(string.Format("row:{0},cloumn{1}, wrong gender value, should be 'male' or 'female'", row, 3));
                                errCount++;
                            }
                            else
                            {
                                string rr = worksheet.Cells[row, 3].Value.ToString();
                                if (string.IsNullOrEmpty(rr))
                                {
                                    newImp.Gender = EnumGender.Unknown;
                                }
                                else if (string.Equals(rr, "male", StringComparison.CurrentCultureIgnoreCase))
                                {
                                    newImp.Gender = EnumGender.Male;
                                }
                                else if (string.Equals(rr, "female", StringComparison.CurrentCultureIgnoreCase))
                                {
                                    newImp.Gender = EnumGender.Female;
                                }
                                else
                                {
                                    sb.Append(string.Format("row:{0},cloumn{1}, wrong gender value, should be 'male' or 'female'", row, 3));
                                    errCount++;
                                }
                            }



                            // 第四列 Title
                            newImp.Title = worksheet.Cells[row, 4].Value == null ? "" : worksheet.Cells[row, 4].Value.ToString();
                            // 第五列 OfficePhone
                            newImp.Title = worksheet.Cells[row, 5].Value == null ? "" : worksheet.Cells[row, 5].Value.ToString();
                            // 第六列 PersonalPhone
                            newImp.Title = worksheet.Cells[row, 6].Value == null ? "" : worksheet.Cells[row, 6].Value.ToString();
                            // 第七列 Department
                            newImp.Title = worksheet.Cells[row, 7].Value == null ? "" : worksheet.Cells[row, 7].Value.ToString();
                            // 第八列 Level
                            newImp.Title = worksheet.Cells[row, 8].Value == null ? "" : worksheet.Cells[row, 8].Value.ToString();

                            list.Add(newImp);
                        }

                        if (errCount > 0)
                        {
                            return ResponseResult.Fail(-777, sb.ToString());
                        }
                        else
                        {
                            _db.EmployeeInfos.RemoveRange(_db.EmployeeInfos);
                            _db.EmployeeInfos.AddRange(list);
                            await _db.SaveChangesAsync();
                        }

                        file.Delete();//删除刚创建的临时文件。
                        return ResponseResult.Ok();
                    }

                
            }

            catch (Exception ex)
            {
                return ResponseResult.Fail(description: ex.ToString());
            }
        }
    }
}
