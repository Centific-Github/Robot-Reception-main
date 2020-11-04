using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("department")]
    public class DepartmentInfo
    {
        //[Key]
        //public int ID { get; set; }
        /// <summary>
        /// Gets or sets Department.
        /// </summary>
        [Key]
        public string Department { get; set; }
    }
}
