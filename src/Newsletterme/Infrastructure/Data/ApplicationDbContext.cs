using Microsoft.EntityFrameworkCore;
using Newsletterme.Features.Newsletters.Models;

namespace Newsletterme.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Newsletter> Newsletter { get; set; }
        public DbSet<UserSignedInNewsletter> UserSignedInNewsletters { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
