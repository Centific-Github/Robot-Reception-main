using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    /// <summary>
    /// 
    /// </summary>
    [Table("CommonConfig")]
    public class CommonConfig
    {
        [Key]
        public string Name { get; set; }
        public string Value { get; set; }
        public string Comments { get; set; }
        public bool IsSystem { get; set; }
    }
}
