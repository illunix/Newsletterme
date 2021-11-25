using GenerateMediator;
using Microsoft.AspNetCore.Identity;
using Newsletterme.Features.Account.Models;
using Newsletterme.Infrastructure.Data;
using System.Threading.Tasks;

namespace Newsletterme.Features.Account
{
    [GenerateMediator]
    public static partial class Get
    {
        public sealed partial record Query(string IdOrUsername);

        public record User(
            string Name,
            string Description
        );

        public static async Task<User> QueryHandler(
            Query query,
            UserManager<ApplicationUser> userManager
        )
        {
            var user = await userManager.FindByIdAsync(query.IdOrUsername);

            if (user is null)
            {
                user = await userManager.FindByNameAsync(query.IdOrUsername);
                if (user is null)
                {
                    return null;
                }
            }

            return new(
                user.UserName,
                user.Description
            );
        }
    }
}
