using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("admin_management")]
    public class AdminManagementInfo
    {
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Gets or sets Employee No (Pxxxxxxx).
        /// </summary>
        public string EmpNo { get; set; }

        /// <summary>
        /// Gets or sets 0: Normal; 1: Admin.
        /// </summary>
        public int Role { get; set; }

        /// <summary>
        /// Gets or sets Comments.
        /// </summary>
        public string Comments { get; set; }
    }
}
