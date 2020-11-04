using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.Model
{
    public class ResponseResult
    {
        public int errcode { get; set; }
        public string errmsg { get; set; }
        public string errdescription { get; set; }
        public object data { get; set; }

        public static ResponseResult Ok(object data = null, string msg = null)
        {
            return new ResponseResult { errcode = 0, data = data, errmsg = msg };
        }

        public static ResponseResult Fail(int errcode = -1, string msg = null, string description = null)
        {
            return new ResponseResult { errcode = errcode, errmsg = msg, errdescription = description };
        }
    }
}
