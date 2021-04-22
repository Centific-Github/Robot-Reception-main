using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class EmplyoeeSearchVM
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public string Name { get; set; }
        public string EmpNo { get; set; }
        public string Dept { get; set; }

        public EmplyoeeSearchVM()
        {
            Page = 0;
            Size = 10;
        }
    }
}
