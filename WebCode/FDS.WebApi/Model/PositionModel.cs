using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.Model
{
    public class PositionModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public int industryType { get; set; }
        public string Nature { get; set; }
        public string Place { get; set; }
        public int Number { get; set; }
        public string CompanyNature { get; set; }
        public string Salary { get; set; }
        public string Content { get; set; }
        public string Ask { get; set; }
        public string WorkingHours { get; set; }
        public int IsRelease { get; set; }
        public DateTime Created { get; set; }
        public DateTime ReleaseDate { get; set; }

    }
}
