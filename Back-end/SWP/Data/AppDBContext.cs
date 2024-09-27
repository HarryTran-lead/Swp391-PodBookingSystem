using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SWP.Model;

namespace SWP.Data
{
    public class AppDBContext : IdentityDbContext<AppUser>
    {
        public AppDBContext(DbContextOptions<AppDBContext> options): base(options)
        {
            
        }

        #region Data Set
        public DbSet<Location> Locations { get; set; }
        public DbSet<PodModel> PodModels { get; set; }
        public DbSet<Pod> Pods { get; set; }
        #endregion

    }
}
