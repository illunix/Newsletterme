using Microsoft.AspNetCore.Identity;

namespace Newsletterme.Features.Account.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Plan { get; set; }
    }
}
