using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class VisitHistoryInputVM
    {
        public string VisitorName { get; set; }
        public string VisitorPhone { get; set; }
        public string VisitReason { get; set; }
        public int VisitStatus { get; set; }
        public string EmpNo { get; set; }
    }
}
