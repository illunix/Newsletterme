using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using GenerateMediator;
using Newsletterme.Features.Account.Models;

namespace Newsletterme.Features.Account
{
    [GenerateMediator]
    public static partial class SignUp
    {
        public sealed partial record Command(
            string Email,
            string Password
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
                v.RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Please enter email.")
                    .EmailAddress().WithMessage("Invalid email");

                v.RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Please enter password.");
            }
        }

        public sealed record CommandResult(
           IdentityResult IdentityResult
        );

        public static async Task<CommandResult> CommandHandler(
            Command command,
            UserManager<ApplicationUser> userManager
        )
        {
            var user = new ApplicationUser
            {
                UserName = command.Email,
                Email = command.Email
            };

            var result = await userManager.CreateAsync(user, command.Password);

            return new(result);
        }
    }
}
