using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    /// <summary>
    /// 用户表
    /// </summary>
    [Table("User")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        [Required, StringLength(255)]
        public string Name { get; set; }

        /// <summary>
        /// Account
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Comments { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets 0: Normal; 1: Admin.
        /// </summary>
        public EnumUserRole Role { get; set; }
    }
}
