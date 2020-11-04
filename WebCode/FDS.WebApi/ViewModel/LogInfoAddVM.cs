using FDS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class LogInfoAddVM
    {
        public EnumLogType LogType { get; set; }
        public string Info { get; set; }
    }
}
