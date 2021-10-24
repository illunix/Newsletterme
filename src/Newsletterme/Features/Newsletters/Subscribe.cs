using FluentValidation;
using GenerateMediator;
using Microsoft.EntityFrameworkCore;
using Newsletterme.Features.Newsletters.Models;
using Newsletterme.Infrastructure.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [GenerateMediator]
    public static partial class Subscribe
    {
        public sealed partial record Command(
            Guid NewsletterId,
            string Email,
            string Name
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
                v.RuleFor(x => x.Email)
                    .EmailAddress().WithMessage("Please enter valid email.")
                    .NotEmpty().WithMessage("Please enter email.");

                v.RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Please enter email.");
            }
        }

        public record CommandResult(
            bool AlreadySubscribeNewsletter = false
        );

        public static async Task<CommandResult> CommandHandler(
            Command command,
            ApplicationDbContext context
        )
        {
            var alreadySubscribeNewsletter = await context.UserSubscribeNewsletters
                .Where(q => q.NewsletterId == command.NewsletterId &&
                    q.Email == command.Email)
                .AnyAsync();

            if (alreadySubscribeNewsletter)
            {
                return new(true);
            }

            var userSignedInNewsletter = new UserSubscribeNewsletter(
                Guid.Empty,
                command.NewsletterId,
                command.Email,
                command.Name
            );

            context.UserSubscribeNewsletters
                .Add(userSignedInNewsletter);

            await context.SaveChangesAsync();

            return new();
        }
    }
}
