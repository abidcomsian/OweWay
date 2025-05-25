using System.Web.Http;
using OweWay.Api.Models; // Make sure this matches your actual model namespace
using System.Web.Http.Cors;

namespace OweWay.Api.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        [HttpPost]
        [Route("register")]
        public IHttpActionResult Register([FromBody] RegisterModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
                return BadRequest("Invalid input.");

            // TODO: Save the user to your database here

            return Ok(new { message = "User registered successfully" });
        }
    }
}
