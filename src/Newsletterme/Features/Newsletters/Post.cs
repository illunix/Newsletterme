using FluentValidation;
using GenerateMediator;
using Newsletterme.Features.Newsletters.Models;
using Newsletterme.Infrastructure.Data;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [GenerateMediator]
    public static partial class Post
    {
        public sealed partial record Command(
            string UserId,
            string Name,
            string Description
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
                v.RuleFor(x => x.UserId)
                    .NotEmpty().WithMessage("Please enter user id.");

                v.RuleFor(x => x.Name)
                    .NotEmpty().WithMessage("Please enter name.");

                v.RuleFor(x => x.Description)
                    .NotEmpty().WithMessage("Please enter description.");
            }
        }

        public static async Task CommandHandler(
            Command command,
            ApplicationDbContext context
        )
        {
            var newsletter = new Newsletter(
                command.UserId,
                command.Name,
                command.Description
            );

            context.Add(newsletter);

            await context.SaveChangesAsync();
        }
    }
}
