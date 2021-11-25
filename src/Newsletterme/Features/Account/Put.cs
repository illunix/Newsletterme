using FluentValidation;
using GenerateMediator;
using Microsoft.AspNetCore.Identity;
using Newsletterme.Features.Account.Models;
using System.Threading.Tasks;

namespace Newsletterme.Features.Account
{
    [GenerateMediator]
    public static partial class Put
    {
        public sealed partial record Command(
            string Id,
            string Name,
            string Description
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
                v.RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Please enter username.");

                v.RuleFor(x => x.Description)
                    .NotEmpty().WithMessage("Please enter description.")
                    .MinimumLength(20).WithMessage("Description must have minimum 20 characters.");
            }
        }

        public record CommandResult(
            bool alreadyExist = false
        );

        public static async Task<CommandResult> CommandHandler(
            Command command,
            UserManager<ApplicationUser> userManager
        )
        {
            var user = await userManager.FindByNameAsync(command.Name);
            if (user is not null)
            {
                if (user.Id != command.Id)
                {
                    return new(true);
                }
            }

            user = await userManager.FindByIdAsync(command.Id);
            user.UserName = command.Name;
            user.Description = command.Description;

            await userManager.UpdateAsync(user);

            return new();
        }
    }
}
