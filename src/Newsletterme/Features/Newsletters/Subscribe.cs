using FluentValidation;
using GenerateMediator;
using Microsoft.AspNetCore.Identity;
using Newsletterme.Features.Account.Models;
using Newsletterme.Features.Newsletters.Models;
using Newsletterme.Infrastructure.Data;
using System;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [GenerateMediator]
    public static partial class Subscribe
    {
        public sealed partial record Command(
            string CreatorName,
            string Name,
            string Email
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
                v.RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Please enter newsletter creator name.");

                v.RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Please enter name.");

                v.RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Please enter email.");
            }
        }

        public static async Task CommandHandler(
            Command command,
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager
        )
        {
            var newsletterCreator = await userManager.FindByNameAsync(command.CreatorName);
            var newsletterCreatorId = await userManager.GetUserIdAsync(newsletterCreator);

            var newsletterSubscription = new NewsletterSubscription(
                newsletterCreatorId,
                command.Name,
                command.Email,
                DateTime.Now
            );

            context.Add(newsletterSubscription);

            await context.SaveChangesAsync();
        }
    }
}
