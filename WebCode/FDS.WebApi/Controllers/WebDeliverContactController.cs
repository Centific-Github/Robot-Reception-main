using FDS.Model;
using FDS.WebApi.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FDS.WebApi.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Cors;

namespace FDS.WebApi.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/WebDeliverContact")]
    public class WebDeliverContactController : Controller
    {
        private readonly FDSContext _db;
        private IHostingEnvironment _hostingEnvironment;

        private string imageFileName = "deliver.jpg";

        public WebDeliverContactController(FDSContext db, IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            this._db = db;
        }

        /// <summary>
        /// 获取快递联系人
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Get")]
        public async Task<ResponseResult> Get()
        {
            try
            {
                var list = _db.DeliveryContactInfos.ToList();
                if (list != null && list.Count > 0)
                {
                    var d = list[0];
                    var vm = new DeliverContractVM() { Name = d.EmpName, OfficePhone = d.OfficePhone, PersonalPhone = d.PersonalPhone, ImgPath = d.ImgPath };
                    return ResponseResult.Ok(vm);
                }
                return ResponseResult.Ok(new DeliverContractVM() { ImgPath = "", PersonalPhone = "", OfficePhone = "", Name = "" });
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }

        /// <summary>
        /// 保存快递联系人
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveDeliver")]
        public async Task<ResponseResult> SaveDeliver(string Name, string OfficePhone, string PersonalPhone, string iconUrl)
        {
            // 更新字段
            try
            {
                _db.DeliveryContactInfos.RemoveRange(_db.DeliveryContactInfos);
                DeliveryContactInfo d = new DeliveryContactInfo()
                {
                    OfficePhone = OfficePhone,
                    PersonalPhone = PersonalPhone,
                    EmpName = Name,
                    ImgPath=iconUrl,
                    CreateDate = DateTime.Now
                };

                _db.DeliveryContactInfos.Add(d);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "数据保存失败", ex.Message);
            }

            return ResponseResult.Ok();
        }


        [HttpPost]
        [Route("Import")]
        public async Task<ResponseResult> ImportAsync()
        {
            try
            {
                string sWebRootFolder = _hostingEnvironment.WebRootPath + "\\Files\\images\\deliver";
                var FileName = DateTime.Now.ToString("yyyyMMddHHmmss");

                var files = Request.Form.Files;
                string[] FileType = null;
                foreach (var item in files)
                {
                    FileType = item.FileName.Split('.');
  

                    using (FileStream fs = System.IO.File.Create(sWebRootFolder + "\\" + FileName+ "."+ FileType[FileType.Count() - 1]))
                    {
                        //将上载文件的内容复制到目标流
                        item.CopyTo(fs);
                        //清除此流的缓冲区并导致将任何缓冲数据写入
                        fs.Flush();
                        fs.Close();
                    }
                }
             
                return ResponseResult.Ok(new
                {
                    FilePath = "\\Files\\images\\deliver" + "\\" + FileName + "." + FileType[FileType.Count() - 1]
                });
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(description: ex.ToString());
            }
        }


    }
}
