using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class DeliverContractVM
    {
        public string Name { get; set; }
        public string OfficePhone { get; set; }
        public string PersonalPhone { get; set; }
        public string ImgPath { get; set; }
    }

    public class DeliverContractUpdateVM
    {
        public string Name { get; set; }
        public string OfficePhone { get; set; }
        public string PersonalPhone { get; set; }
    }
}
