using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("Record")]
    public class Record
    {
        [Key]
        public int id { get; set; }
        public int memberId { get; set; }
        [StringLength(255)]
        public string money { get; set; }
        public DateTime CreateDate { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        [StringLength(500)]
        public string Description { get; set; }


        /// <summary>
        /// 酒类别
        /// </summary>
        public int type { get; set; }
    }
}
