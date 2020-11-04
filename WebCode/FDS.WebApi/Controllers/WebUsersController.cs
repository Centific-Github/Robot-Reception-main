using FDS.Model;
using FDS.WebApi.Model;
using FDS.WebApi.ViewModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;


namespace FDS.WebApi.Controllers
{
    [EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/WebUsers")]
    public class WebUsersController : Controller
    {
        private readonly FDSContext db;


        // Ticket manager fields
        //private static IServiceTicketManager _serviceTicketManager;
        //private static IProxyTicketManager _proxyTicketManager;

        private readonly XNamespace _ns = "http://www.yale.edu/tp/cas";
        //CasOptions _options;
        public WebUsersController(FDSContext db)
        {
            this.db = db;
            //_options=options;
        //_serviceTicketManager = serviceTicketManager;
        //_proxyTicketManager = proxyTicketManager;
    }

        /// <summary>
        /// 获取所有用户
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUsers")]
        public async Task<ResponseResult> GetUsers()
        {
            if (!ModelState.IsValid)
            {
                return ResponseResult.Fail(Erros.ModelStateInvalid.Code, Erros.ModelStateInvalid.Message);
            }

            try
            {

                return ResponseResult.Ok(db.Users.ToList().Select(c => UserVM.MapperFromDb(c)));
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }
        }

        /// <summary>
        /// 根据id查询用户
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUserById")]
        public async Task<ResponseResult> GetUserById(int id)
        {
            if (!ModelState.IsValid)
            {
                return ResponseResult.Fail(Erros.ModelStateInvalid.Code, Erros.ModelStateInvalid.Message);
            }

            try
            {
                var user = await db.Users.SingleOrDefaultAsync(m => m.Id == id);
                return ResponseResult.Ok(UserVM.MapperFromDb(user));
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }
        }

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        //[HttpPut("{id}")]
        [HttpPost]
        [Route("UpdateUser")]
        public async Task<ResponseResult> UpdateUser([FromBody] UserUpdateVM user)
        {
            if (!ModelState.IsValid)
            {
                return ResponseResult.Fail(Erros.ModelStateInvalid.Code, Erros.ModelStateInvalid.Message);
            }

            try
            {
                var d = db.Users.Find(user.Id);
                if (d == null)
                {
                    return ResponseResult.Fail(Erros.InstanceNotFound.Code, Erros.InstanceNotFound.Message);
                }

                if (db.Users.Any(c => c.Id != user.Id && c.Account == user.Account))
                {
                    return ResponseResult.Fail(Erros.DuplicateDataToAddOrUpdate.Code, "The account is already exsist");
                }

                d.Account = user.Account;
                d.Comments = user.Comments;
                d.Role = (EnumUserRole)user.Role;

                await db.SaveChangesAsync();
                return ResponseResult.Ok();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }
        }

        /// <summary>
        /// 新增用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddUser")]
        public async Task<ResponseResult> AddUser([FromBody] UserAddVM user)
        {
            if (!ModelState.IsValid)
            {
                return ResponseResult.Fail(Erros.ModelStateInvalid.Code, Erros.ModelStateInvalid.Message);
            }

            User U = new User()
            {
                Account = user.Account,
                Comments = user.Comments,
                Role = (EnumUserRole)user.Role
            };

            try
            {
                if (db.Users.Any(c => c.Account == user.Account))
                {
                    return ResponseResult.Fail(Erros.DuplicateDataToAddOrUpdate.Code, "The account is already exsist");
                }

                db.Users.Add(U);
                await db.SaveChangesAsync();
                return ResponseResult.Ok(U);
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }


        }

        // DELETE: api/Users/5
        //[HttpDelete("{id}")]
        [HttpPost]
        [Route("DeleteUser")]
        public async Task<ResponseResult> DeleteUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return ResponseResult.Fail(Erros.ModelStateInvalid.Code, Erros.ModelStateInvalid.Message);
            }

            var user = await db.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return ResponseResult.Fail(Erros.InstanceNotFound.Code, Erros.InstanceNotFound.Message);
            }

            try
            {
                db.Users.Remove(user);
                await db.SaveChangesAsync();
                return ResponseResult.Ok();
            }
            catch (Exception ex)
            {
                return ResponseResult.Fail(Erros.DBOperationErro.Code, Erros.DBOperationErro.Message, ex.Message);
            }
        }

        private bool UserExists(int id)
        {
            return db.Users.Any(e => e.Id == id);
        }

        //======================================================================
        [HttpPost]
        [Route("Login")]
        public async Task<object> Login(string userName, string password)
        {
            var user = await db.Users.FirstOrDefaultAsync(p => p.Account == userName && p.Password == password).ConfigureAwait(false);
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(new
            {
                user.Id,
                user.Name
            });
        }

        [HttpPost]
        [Route("loginSso")]
        public async Task<object> loginSso([FromBody] UserTiketVM userTiketVM)
        {
            try
            {
                var validateEndpoint = "https://auth.pactera.com/serviceValidate";
                var validateUrl = $"{validateEndpoint}?service={userTiketVM.ServiceUrl}&ticket={Uri.EscapeDataString(userTiketVM.ServiceTicket)}";
                HttpClient _httpClient = new HttpClient();
                //这里需要改为您自己的服务器            
                _httpClient.Timeout = new TimeSpan(0,0,0,3);
                HttpResponseMessage response = new HttpResponseMessage();
                response = await _httpClient.PostAsync(validateUrl, new StringContent("Hello"));
                //默认超时100s,太长，改为3秒
                //var response = await _options.Backchannel.GetAsync(validateUrl);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                var doc = XDocument.Parse(responseBody);
                var serviceResponse = doc.Element(_ns + "serviceResponse");
                var successNode = serviceResponse?.Element(_ns + "authenticationSuccess");
                var userNode = successNode?.Element(_ns + "user");
                var validatedUserName = userNode?.Value;

                if (string.IsNullOrEmpty(validatedUserName))
                {
                    return null;
                }
                else
                {
                    return Ok(new
                    {
                        validatedUserName
                    });
                }
            }
            catch (Exception ex)
            {
            }
   
            return null;
        }

    }
}