using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FDS.Model;
using FDS.WebApi.Model;
using System.IO;
using OfficeOpenXml;
using Microsoft.AspNetCore.Hosting;

namespace FDS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Records")]
    public class RecordsController : Controller
    {
        private readonly FDSContext _context;
        private IHostingEnvironment _hostingEnvironment;
        public RecordsController(FDSContext context, IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }

        // GET: api/Records
        [HttpGet]
        public IEnumerable<Record> GetRecords()
        {
            return _context.Records;
        }

        // GET: api/Records/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecord([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.Records.SingleOrDefaultAsync(m => m.id == id);

            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        // PUT: api/Records/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecord([FromRoute] int id, [FromBody] Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != record.id)
            {
                return BadRequest();
            }

            _context.Entry(record).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Records
        [HttpPost]
        public async Task<IActionResult> PostRecord([FromBody] Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", new { id = record.id }, record);
        }

        // DELETE: api/Records/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.Records.SingleOrDefaultAsync(m => m.id == id);
            if (record == null)
            {
                return NotFound();
            }

            _context.Records.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }

        private bool RecordExists(int id)
        {
            return _context.Records.Any(e => e.id == id);
        }


        [HttpGet]
        [Route("getRecordList")]
        public async Task<ResponseResult> getRecordList(int? page, int? size = 10, int? id = 0)
        {
            try
            {
                var pageNumber = page ?? 1;
                var members = _context.Members.Find(id);
                var query = _context.Records.AsQueryable();
                var totalCount = query.Where(m => m.memberId == id).Count();
                var list = await query.Where(m => m.memberId == id).OrderBy(p => p.CreateDate)
                .Skip((pageNumber - 1) * size.Value).Select(c => new
                {
                    name = members.name,
                    phone = members.phone,
                    totalMoney = members.money,
                    whiteSpirittotalmoney = members.whiteSpiritMoney,
                    cashTotalMoney = members.cashMoney,
                    c.CreateDate,
                    c.money,
                    c.Description,
                    c.memberId,
                    c.type,
                    types = _context.Dictionaries.FirstOrDefault(p => p.ID == c.type).Value,

                })
                .Take(size.Value)
                .ToListAsync()
                .ConfigureAwait(false);

                return ResponseResult.Ok(new { list = list, totalCount = totalCount });
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }

        [HttpPost]
        [Route("export")]
        public async Task<IActionResult> ExportAsync(int? id = 0)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            var list = await _context.Records.Where(p => p.memberId == id).ToListAsync();

            var m = _context.Members.Find(id);
            var fileName = m.name + "-" + DateTime.Now.ToString("yyyyMMddHHMMss") + ".xlsx";
            FileInfo file = new FileInfo(Path.Combine(sWebRootFolder, fileName));
            using (ExcelPackage package = new ExcelPackage(file))
            {
                // 添加worksheet
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Sheet1");
                //添加头
                worksheet.Cells[1, 1].Value = "会员名称";
                worksheet.Cells[1, 2].Value = "联系电话";
                worksheet.Cells[1, 3].Value = "消费日期";
                worksheet.Cells[1, 4].Value = "消费类别";
                worksheet.Cells[1, 5].Value = "消费金额";
                worksheet.Cells[1, 6].Value = "消费详情";

                //添加值
                for (int i = 1; i <= list.Count; i++)
                {
                    var r = list[i - 1];
                    worksheet.Cells[i + 1, 1].Value = m.name;
                    worksheet.Cells[i + 1, 2].Value = m.phone;
                    worksheet.Cells[i + 1, 3].Value = r.CreateDate.ToString("yyyy-MM-dd HH:MM:ss");
                    worksheet.Cells[i + 1, 4].Value = _context.Dictionaries.FirstOrDefault(p => p.ID == r.type).Value;
                    worksheet.Cells[i + 1, 5].Value = r.money;
                    worksheet.Cells[i + 1, 6].Value = r.Description;
                }
                package.Save();
            }
            return File(fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }


        /// <summary>
        /// 更新会员信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("putInsertRecords")]
        public async Task<ResponseResult> putInsertRecords(int id, string money = null, string remark = null, int type = 0)
        {
            try
            {
                var mo = _context.Members.Find(id);
                if (type == 1)
                {
                    mo.money = mo.money - decimal.Parse(money);
                }
                else if (type == 2)
                {
                    mo.whiteSpiritMoney = mo.whiteSpiritMoney - decimal.Parse(money);
                }
                else if (type == 3)
                {
                    mo.cashMoney = mo.cashMoney - decimal.Parse(money);
                }

                var record = new Record();
                record.memberId = id;
                record.money = money;
                record.Description = remark;
                record.type = type;
                record.CreateDate = DateTime.Now;
                _context.Records.Add(record);
                await _context.SaveChangesAsync();
                return ResponseResult.Ok(null, "新增成功！");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }

        }


    }
}