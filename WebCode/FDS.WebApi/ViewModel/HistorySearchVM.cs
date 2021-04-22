using FDS.WebApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class HistorySearchVM
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public string VisitName { get; set; }
        public string EmployeeName { get; set; }
        public CheckInType CheckInType { get; set; }

        public HistorySearchVM()
        {
            Page = 0;
            Size = 10;
        }
    }
}
