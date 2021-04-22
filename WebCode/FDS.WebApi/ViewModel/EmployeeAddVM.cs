using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class EmployeeAddVM
    {
        public string EmpNo { get; set; }

        /// <summary>
        /// Gets or sets Employee Name..
        /// </summary>
        public string EmpName { get; set; }

        /// <summary>
        /// Gets or sets Gender(1:male,2:female,9:others).
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// Gets or sets Job Title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets Office Phone No.
        /// </summary>
        public string OfficePhone { get; set; }

        /// <summary>
        /// Gets or sets Personal Phone.
        /// </summary>
        public string PersonalPhone { get; set; }

        /// <summary>
        /// Gets or sets Department Name.
        /// </summary>
        public string Department { get; set; }

        /// <summary>
        /// Gets or sets Level (1,2,...,5, 9) Level 9 means others..
        /// </summary>
        public string Level { get; set; }

        /// <summary>
        /// Gets or sets Work Place..
        /// </summary>
        public string WorkPlace { get; set; }

        /// <summary>
        /// Gets or sets Face Image path..
        /// </summary>
        public string ImgPath { get; set; }
    }
}
