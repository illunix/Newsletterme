using GenerateMediator;
using Microsoft.AspNetCore.Identity;
using Newsletterme.Features.Account.Models;
using System.Threading.Tasks;

namespace Newsletterme.Features.Account
{
    [GenerateMediator]
    public static partial class ChangePlan
    {
        public sealed partial record Command(
            string UserId,
            string Plan
        );

        public static async Task CommandHandler(
            Command command,
            UserManager<ApplicationUser> userManager
        )
        {
            var user = await userManager.FindByIdAsync(command.UserId);
            if (user is null)
            {
                return;
            }

            user.Plan = command.Plan;

            await userManager.UpdateAsync(user);
        }
    }
}
