using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class UserUpdateVM
    {
        public int Id { get; set; }
        public int Role { get; set; }
        public string Comments { get; set; }
        public string Account { get; set; }
    }
}
