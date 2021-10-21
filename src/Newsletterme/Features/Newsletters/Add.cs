using FluentValidation;
using GenerateMediator;
using Newsletterme.Features.Newsletters.Models;
using Newsletterme.Infrastructure.Data;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [GenerateMediator]
    public static partial class Add
    {
        public sealed partial record Command(
            string Description
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
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
                System.Guid.Empty,
                command.Description
            );

            context.Newsletter
                .Add(newsletter);

            await context.SaveChangesAsync();
        }
    }
}
