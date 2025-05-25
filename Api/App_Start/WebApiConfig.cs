using System.Web.Http;
using System.Web.Http.Cors;

namespace OweWay.Api
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //change by diyar
           //var cors = new EnableCorsAttribute("*", "*", "*");
           // config.EnableCors(cors);
            ////
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
