using OweWay.Api.Models;
using OweWay.Domain.Entities;
using System;
using System.Linq;
using System.Web.Http;
using OweWay.Api;

[RoutePrefix("api/auth")]
public class AuthController : ApiController
{
    [HttpPost]
    [Route("register")]
    public IHttpActionResult Register(RegisterModel model)
    {
        using (var db = new MyDbContext())
        {
            if (db.Users.Any(u => u.Email == model.Email))
                return BadRequest("User with this email already exists.");

            var newUser = new User
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password  // In real-world: Hash this!
            };
            db.Users.Add(newUser);
            db.SaveChanges();
        }
        return Ok("Registration successful!");
    }

    [HttpPost]
    [Route("login")]
    public IHttpActionResult Login(LoginModel model)
    {
        using (var db = new MyDbContext())
        {
            var user = db.Users.FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);
            if (user == null)
                return BadRequest("Invalid email or password.");

            return Ok(new { message = "Login successful!", user = user.Name });
        }
    }

    // Fix for the errors:
    [HttpGet]
    [Route("test-connection")]
    public IHttpActionResult TestConnection()
    {
        string result = TestConnectionWithDB.connectionTest();
        System.Diagnostics.Debug.WriteLine(result);
        return Ok(result);
    }
}
