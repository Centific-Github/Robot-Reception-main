using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FDS.Model
{
    [Table("Member")]
    public class Member
    {
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// 会员名称
        /// </summary>
        [StringLength(255)]
        public string name { get; set; }

        /// <summary>
        /// 手机号
        /// </summary>
        [StringLength(200)]
        public string phone { get; set; }

        /// <summary>
        /// 预存金额
        /// </summary>
        public decimal money { get; set; }

        /// <summary>
        /// 预存数量
        /// </summary>
        public int number { get; set; }

        /// <summary>
        /// 类别
        /// </summary>
        public int type { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// 发布时间
        /// </summary>
        public DateTime UpdateDate { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        [StringLength(255)]
        public string remark { get; set; }


        /// <summary>
        /// 白酒预存金额
        /// </summary>
        public decimal whiteSpiritMoney { get; set; }

        /// <summary>
        /// 现金
        /// </summary>
        public decimal cashMoney { get; set; }

        /// <summary>
        /// 白酒预存数量
        /// </summary>
        public int whiteSpiritNumber { get; set; }

        /// <summary>
        /// 白酒类别
        /// </summary>
        public int whiteSpiritType { get; set; }
    }

}
