using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("Dictionary")]
    public class Dictionary
    {
        [Key]
        public int ID { get; set; }
        /// <summary>
        /// 类别
        /// </summary>
        [StringLength(255)]
        public string Category { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        [StringLength(255)]
        public string Name { get; set; }
        /// <summary>
        /// 值
        /// </summary>
        [StringLength(255)]
        public string Value { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        [StringLength(255)]
        public string Description { get; set; }
        /// <summary>
        /// 是否启用
        /// </summary>
        public int IsEnabled { get; set; }

    }
}
