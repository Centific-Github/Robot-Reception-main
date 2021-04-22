using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("LogInfo")]
    public class LogInfo
    {
        [Key]
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public EnumLogType LogType { get; set; }
        public EnumLogSide LogSide { get; set; }
        public string Info { get; set; }
        public string Info2 { get; set; }
        public string Info3 { get; set; }
    }
}
