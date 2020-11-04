using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using FDS.Model;
using FDS.WebApi.Model;

namespace FDS.WebApi.Service
{
    /// <summary>
    /// 自定义此特性用于接口的身份验证
    /// </summary>
    public class AppAuthService : IAppAuthService
    {
        //protected bool IsError = false;

        // private string Auth_Key = "1234";
        //private static HMACSHA1 Sha1Helper = new HMACSHA1(Encoding.UTF8.GetBytes("1234"));

        private static DateTime dtFrom = new DateTime(1970, 1, 1);

        private readonly FDSContext _db;

        public AppAuthService(FDSContext db)
        {
            this._db = db;
        }

        public async void FreshAuthKey()
        {
            var dd = _db.CommonConfigs.SingleOrDefault(c => c.Name == StaticData.ConfigName_AuthKey);
            if (dd != null)
            {
                StaticData.AuthKeyValue = dd.Value;
            }
        }

        public bool CheckAuthorization(IHeaderDictionary Header)
        {
            if (string.IsNullOrEmpty(StaticData.AuthKeyValue))
            {
                FreshAuthKey();
            }


            return true;

            HMACSHA1 Sha1Helper = new HMACSHA1(Encoding.UTF8.GetBytes(StaticData.AuthKeyValue));

            string authToken = Header["AT"];
            string timeStamp = Header["TS"];

            if (!string.IsNullOrEmpty(authToken) && !string.IsNullOrEmpty(timeStamp))
            {
                long timeStampFromClient = 0;
                long timeStampFromServer = GetCurrentTotalSec();
                if (long.TryParse(timeStamp, out timeStampFromClient)
                    && Math.Abs(timeStampFromServer - timeStampFromClient) <= 150000)
                {
                    var signedTs = Sha1Helper.ComputeHash(BitConverter.GetBytes(timeStampFromClient));
                    var authToken1 = Convert.ToBase64String(signedTs);

                    if (authToken == authToken1)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// 得到当前时间戳
        /// </summary>
        /// <returns></returns>
        private static long GetCurrentTotalSec()
        {
            return (long)(DateTime.UtcNow - dtFrom).TotalSeconds;
        }


        //private static string GetCurrentTimeStampString(long ts)
        //{
        //    var signedTs = Sha1Helper.ComputeHash(BitConverter.GetBytes(ts));
        //    return Convert.ToBase64String(signedTs);
        //}

        ///// <summary>
        ///// Encrypt
        ///// </summary>
        ///// <param name="contentBytes"></param>
        ///// <param name="secretKey"></param>
        ///// <returns></returns>
        //private static byte[] Encrypt(byte[] contentBytes, byte[] secretKey)
        //{
        //    byte[] output = new byte[contentBytes.Length];
        //    for (int index = 0; index < contentBytes.Length; index++)
        //    {
        //        output[index] = (byte)(contentBytes[index] ^ secretKey[index % secretKey.Length]);
        //    }

        //    return output;
        //}

    }
}
