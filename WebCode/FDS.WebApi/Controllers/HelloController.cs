using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FDS.WebApi.Controllers
{
    public class HelloController : Controller
    {
        private IHttpContextAccessor _accessor;

        public IActionResult Index()
        {
            return View();
        }   
    }
}