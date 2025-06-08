using OweWay.Domain.Entities;
using System;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace OweWay.Api
{
    public class OweWayApi : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);            
            UnityConfig.RegisterComponents();
    

        }
    }
}
