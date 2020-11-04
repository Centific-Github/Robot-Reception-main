using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FDS.WebApi.Service
{
    public interface IAppAuthService
    {
        bool CheckAuthorization(IHeaderDictionary Header);
        void FreshAuthKey();
    }
}
