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
    [Route("api/Dictionaries")]
    public class DictionariesController : Controller
    {
        private readonly FDSContext db;

        public DictionariesController(FDSContext db)
        {
            this.db = db;
        }

        // GET: api/Dictionaries
        [HttpGet]
        public IEnumerable<Dictionary> GetDictionaries()
        {
            return db.Dictionaries;
        }

        // GET: api/Dictionaries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDictionary([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dictionary = await db.Dictionaries.SingleOrDefaultAsync(m => m.ID == id);

            if (dictionary == null)
            {
                return NotFound();
            }

            return Ok(dictionary);
        }

        // PUT: api/Dictionaries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDictionary([FromRoute] int id, [FromBody] Dictionary dictionary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dictionary.ID)
            {
                return BadRequest();
            }

            db.Entry(dictionary).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DictionaryExists(id))
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

        // POST: api/Dictionaries
        [HttpPost]
        public async Task<IActionResult> PostDictionary([FromBody] Dictionary dictionary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Dictionaries.Add(dictionary);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetDictionary", new { id = dictionary.ID }, dictionary);
        }

        // DELETE: api/Dictionaries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDictionary([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dictionary = await db.Dictionaries.SingleOrDefaultAsync(m => m.ID == id);
            if (dictionary == null)
            {
                return NotFound();
            }

            db.Dictionaries.Remove(dictionary);
            await db.SaveChangesAsync();

            return Ok(dictionary);
        }


        /// <summary>
        /// 获取行业类别和职位类别
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetDictionariesType")]
        public async Task<ResponseResult> GetDictionariesType(int? page, int? size = 3)
        {
            try
            {
                var pageNumber = page ?? 1;
                var query = db.Dictionaries.AsQueryable();


                var industrytypeList = await query.Where(p => p.Category == "1").OrderBy(p => p.Category)
                    .Skip((pageNumber - 1) * size.Value)
                    .Take(size.Value)
                    .ToListAsync()
                    .ConfigureAwait(false);

                var typeList = await query.Where(p => p.Category == "2").OrderBy(p => p.Category)
                   .Skip((pageNumber - 1) * size.Value)
                   .Take(size.Value)
                   .ToListAsync()
                   .ConfigureAwait(false);

                return ResponseResult.Ok(new { industrytypeList = industrytypeList, typeList = typeList }, "");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }

        }


        /// <summary>
        /// 获取所有行业类别和职位类别
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("GetDictionariesTypeAll")]
        public async Task<ResponseResult> GetDictionariesTypeAll(int? page, int? size = 3)
        {
            try
            {
                var query = db.Dictionaries.AsQueryable();
                var industrytypeList = await query.Where(p => p.Category == "1").OrderBy(p => p.ID).ToListAsync()
                    .ConfigureAwait(false);
     

                return ResponseResult.Ok(new { industrytypeList = industrytypeList}, "");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }

        }

        /// <summary>
        /// 获取新闻类别
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("GetDictionariesNewTypeAll")]
        public async Task<ResponseResult> GetDictionariesNewTypeAll(int? page, int? size = 3)
        {
            try
            {
                var query = db.Dictionaries.AsQueryable();
                var list = await query.Where(p => p.Category == "3").OrderBy(p => p.ID).ToListAsync()
                    .ConfigureAwait(false);

                return ResponseResult.Ok(list, "");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }

        /// <summary>
        /// 获取所有字典数据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("GetDictionarieAll")]
        public async Task<ResponseResult> GetDictionarieAll(int? page, int? size = 10, string gatetory = null)
        {
            try
            {
                var pageNumber = page ?? 1;
                var query = db.Dictionaries.AsQueryable();

                if (!string.IsNullOrEmpty(gatetory))
                {
                    query = query.Where(p => p.Category == gatetory);
                }
                var totalCount = query.Count();
                var list = await query.OrderByDescending(p => p.Category)
                      .Skip((pageNumber - 1) * size.Value).Take(size.Value)
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
        /// 添加类别
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("putDictionarys")]
        public async Task<ResponseResult> putDictionarys(string category = null, string name = null, string value = null, string description = null)
        {
            try
            {
                Dictionary d = new Dictionary();
                d.Category = category;
                d.Name = name;
                d.Value = value;
                d.Description = description;
                d.IsEnabled = 1;

                db.Dictionaries.Add(d);
                await db.SaveChangesAsync();
                return ResponseResult.Ok(null, "新增成功");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }

        }



        /// <summary>
        /// 更新类别
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("updateDictionarys")]
        public async Task<ResponseResult> updateDictionarys(int? id = 0, string category = null, string name = null, string value = null, string description = null)
        {
            try
            {
                var d = db.Dictionaries.Find(id);
                d.Category = category;
                d.Name = name;
                d.Value = value;
                d.Description = description;
                d.IsEnabled = 1;
                await db.SaveChangesAsync();
                return ResponseResult.Ok(null, "更新成功！");
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(-1, "获取数据出错", ex.Message);
            }
        }





        private bool DictionaryExists(int id)
        {
            return db.Dictionaries.Any(e => e.ID == id);
        }
    }
}