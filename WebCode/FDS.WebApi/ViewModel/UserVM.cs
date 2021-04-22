using FDS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.ViewModel
{
    public class UserVM
    {
        public int Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
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
        public string RoleName { get; set; }

        public EnumUserRole Role { get; set; }

        public static UserVM MapperFromDb(User dbUser)
        {
            if (dbUser == null)
            {
                return null;
            }

            return new UserVM()
            {
                Account = dbUser.Account,
                Comments = dbUser.Comments,
                Id = dbUser.Id,
                Name = dbUser.Name,
                Password = dbUser.Password,
                Role = dbUser.Role,
                RoleName = dbUser.Role.ToString()
            };
        }
    }
}
