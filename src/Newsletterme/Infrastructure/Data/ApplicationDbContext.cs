using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newsletterme.Features.Account.Models;
using Newsletterme.Features.Newsletters.Models;

namespace Newsletterme.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Newsletter> Newsletter { get; set; }
        public DbSet<UserSubscribeNewsletter> UserSubscribeNewsletters { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
