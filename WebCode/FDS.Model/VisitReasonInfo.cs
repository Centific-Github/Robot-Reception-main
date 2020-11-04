using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    
    [Table("visit_reason")]
    public class VisitReasonInfo
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets .
        /// </summary>
        public string VisitReason { get; set; }
    }
}
