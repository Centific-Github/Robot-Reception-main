using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FDS.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FDS.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Test")]
    public class TestController : Controller
    {
        private readonly ILogger<TestController> log;
        private FDSContext db;
        public TestController(ILogger<TestController> log, FDSContext db)
        {
            this.log = log;
            this.db = db;
        }

        [HttpGet]
        [Route("Test")]
        public async Task<object> Test()
        {
            return "Test";
        }
    }
}