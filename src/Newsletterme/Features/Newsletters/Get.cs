using GenerateMediator;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newsletterme.Features.Account.Models;
using Newsletterme.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [GenerateMediator]
    public static partial class Get
    {
        public sealed partial record Query(string UserId);

        public record Newsletter(
            Guid Id,
            string Name,
            int SubscriptionCount
        );

        public static async Task<IReadOnlyList<Newsletter>> QueryHandler(
            Query query,
            ApplicationDbContext context
        )
        {
            var newsletters = await context.Newsletters
                .Where(q => q.UserId == query.UserId)
                .OrderByDescending(q => q.NewsletterSubscriptions.Count())
                .Select(q => new Newsletter(
                    q.Id,
                    q.Name,
                    q.NewsletterSubscriptions.Count()
                 ))
                .ToListAsync();

            return newsletters;
        }
    }
}
