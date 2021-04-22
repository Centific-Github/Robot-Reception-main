using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FDS.Model;
using FDS.WebApi.Model;

namespace FDS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Members")]
    public class MembersController : Controller
    {
        private readonly FDSContext _context;

        public MembersController(FDSContext context)
        {
            _context = context;
        }

        // GET: api/Members
        [HttpGet]
        public IEnumerable<Member> GetMembers()
        {
            return _context.Members;
        }

        // GET: api/Members/5
        [HttpGet("{id}")]
        public async Task<ResponseResult> GetMember([FromRoute] int id)
        {
            var member = await _context.Members.SingleOrDefaultAsync(m => m.ID == id);

            return ResponseResult.Ok(member, "");
        }

        // PUT: api/Members/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember([FromRoute] int id, [FromBody] Member member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != member.ID)
            {
                return BadRequest();
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
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

        // POST: api/Members
        [HttpPost]
        public async Task<IActionResult> PostMember([FromBody] Member member)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMember", new { id = member.ID }, member);
        }

        // DELETE: api/Members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var member = await _context.Members.SingleOrDefaultAsync(m => m.ID == id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return Ok(member);
        }

        private bool MemberExists(int id)
        {
            return _context.Members.Any(e => e.ID == id);
        }


        /// <summary>
        /// 根据会员名称和手机号获取所有会员列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMembersAll")]
        public async Task<ResponseResult> GetMembersAll(int? page, int? size = 20, string name = null, string phone = null)
        {
            try
            {
                var pageNumber = page ?? 1;

                var query = _context.Members.AsQueryable();
                if (!string.IsNullOrEmpty(name))
                {
                    query = query.Where(p => p.name.Contains(name));
                }
                if (!string.IsNullOrEmpty(phone))
                {
                    query = query.Where(p => p.phone.Contains(phone));
                }

                var totalCount = query.Count();


                var list = await query.AsQueryable().OrderByDescending(p => p.UpdateDate)
                      .Skip((pageNumber - 1) * size.Value)
                      .Take(size.Value).Select(c => new
                      {
                          c.ID,
                          c.name,
                          c.phone,
                          c.money,
                          c.number,
                          c.remark,
                          //c.type,
                          c.whiteSpiritMoney,
                          c.whiteSpiritNumber,
                          c.cashMoney,
                          //c.whiteSpiritType,
                          //types = _context.Dictionaries.FirstOrDefault(p => p.ID == c.type).Value,
                          c.CreateDate,
                          c.UpdateDate
                      })
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
        /// 新增会员
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("PutInsertMembers")]
        public async Task<ResponseResult> PutInsertMembers(string name = null, string phone = null, string money = null, int number = 0, string remark = null, string whiteSpiritMoney = null, int whiteSpiritNumber = 0, string cashMoney = null)
        {
            try
            {
                Member member = new Member();
                member.name = name;
                member.phone = phone;
                member.money = decimal.Parse(money);
                member.number = number;

                member.whiteSpiritMoney = decimal.Parse(whiteSpiritMoney);
                member.whiteSpiritNumber = whiteSpiritNumber;
                member.remark = remark;
                member.cashMoney = decimal.Parse(cashMoney);
                member.type = 0;
                member.UpdateDate = DateTime.Now;
                member.CreateDate = DateTime.Now;

                _context.Members.Add(member);
                await _context.SaveChangesAsync();
                return ResponseResult.Ok(null, "新增成功！");

            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }

        }

        /// <summary>
        /// 更新会员信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("PutUpdateMembers")]
        public async Task<ResponseResult> PutUpdateMembers(int id, string name = null, string phone = null, string money = null, int number = 0, string remark = null, string whiteSpiritMoney = null, int whiteSpiritNumber = 0, string cashMoney = null)
        {
            try
            {
                var members = _context.Members.Find(id);
                members.name = name;
                members.phone = phone;
                members.money = decimal.Parse(money);
                members.number = number;
                members.remark = remark;
                members.whiteSpiritMoney = decimal.Parse(whiteSpiritMoney);
                members.whiteSpiritNumber = whiteSpiritNumber;
                members.cashMoney = decimal.Parse(cashMoney);
                //members.type = type;
                members.UpdateDate = DateTime.Now;
                await _context.SaveChangesAsync();
                return ResponseResult.Ok(null, "更新成功！");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }

        }

    }
}