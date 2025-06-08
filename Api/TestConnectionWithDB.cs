using OweWay.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace OweWay.Api
{
    public class TestConnectionWithDB
    {
        public static string connectionTest() {
            try
            {
                using (var db = new MyDbContext())
                {
                    var count = db.Users.Count();
                    return "Connection successful! Users count: " + count;
                }
            }
            catch (Exception ex)
            {
                return "Connection failed: " + ex.Message;
            }
        }
    }
}