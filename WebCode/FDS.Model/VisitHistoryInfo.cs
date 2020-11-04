using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("visit_history")]
    public class VisitHistoryInfo
    {
        //[Key]
        //public int ID { get; set; }

        [Key]
        /// <summary>
        /// Gets or sets Log id..
        /// </summary>
        public string LogId { get; set; }

        /// <summary>
        /// Gets or sets Visitor Name..
        /// </summary>
        public string VisitorName { get; set; }

        /// <summary>
        /// Gets or sets Visitor Phone.
        /// </summary>
        public string VisitorPhone { get; set; }

        /// <summary>
        /// Gets or sets Visit Reason.
        /// </summary>
        public string VisitReason { get; set; }

        /// <summary>
        /// Gets or sets VisitStatus(1:Check in;2:Click sb.3,Call sb..
        /// </summary>
        public int VisitStatus { get; set; }

        /// <summary>
        /// Gets or sets Contanct Employee No.
        /// </summary>
        public string ContanctEmpNo { get; set; }

        /// <summary>
        /// Gets or sets Contanct Employee Name.
        /// </summary>
        public string ContanctEmpName { get; set; }

        /// <summary>
        /// Gets or sets Contanct Employee Department.
        /// </summary>
        public string ContanctEmpDept { get; set; }

        /// <summary>
        /// Gets or sets Update time.
        /// </summary>
        public DateTime UpdateTime { get; set; }
    }
}
