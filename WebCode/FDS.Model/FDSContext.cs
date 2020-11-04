using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FDS.Model
{
    public class FDSContext : DbContext
    {
        private readonly string connectionString;
        public FDSContext(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public FDSContext(DbContextOptions<FDSContext> options) : base(options)
        {

        }

        /// <summary>
        /// log日志
        /// </summary>
        public DbSet<LogInfo> LogInfos { get; set; }

        /// <summary>
        /// 通用配置
        /// </summary>
        public DbSet<CommonConfig> CommonConfigs { get; set; }

        /// <summary>
        /// 用户
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// 字典表
        /// </summary>
        public DbSet<Dictionary> Dictionaries { get; set; }


        /// <summary>
        /// 会员记录
        /// </summary>
        public DbSet<Member> Members { get; set; }

        /// <summary>
        /// 消费记录
        /// </summary>
        public DbSet<Record> Records { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<AdminManagementInfo> AdminManagementInfos { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<DeliveryContactInfo> DeliveryContactInfos { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<DepartmentInfo> DepartmentInfos { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<EmployeeInfo> EmployeeInfos { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<VisitHistoryInfo> VisitHistoryInfos { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public DbSet<VisitReasonInfo> VisitReasonInfos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
