using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("delivery_contact")]
    public class DeliveryContactInfo
    {
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Gets or sets Employee No (ex, Pxxxxxxx).
        /// </summary>
        public string EmpNo { get; set; }

        /// <summary>
        /// Gets or sets Employee Name.
        /// </summary>
        public string EmpName { get; set; }

        /// <summary>
        /// Gets or sets Office Phone No.
        /// </summary>
        public string OfficePhone { get; set; }

        /// <summary>
        /// Gets or sets Personal Phone No.
        /// </summary>
        public string PersonalPhone { get; set; }

        /// <summary>
        /// Gets or sets Face Image path.
        /// </summary>
        public string ImgPath { get; set; }

        /// <summary>
        /// Gets or sets Employee Address.
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime CreateDate { get; set; }
    }
}
