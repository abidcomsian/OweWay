using OweWay.Domain.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Runtime.Remoting.Contexts;

namespace OweWay.Domain.Entities
{
    public class MyDbContext : DbContext
    {
        public MyDbContext() : base("name=MyDbConnectionString") { }
        public DbSet<User> Users { get; set; }
    }

}
