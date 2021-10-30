using GenerateMediator;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newsletterme.Features.Account.Models;
using Newsletterme.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Newsletterme.Features.Dashboard
{
    [GenerateMediator]
    public static partial class Get
    {
        public sealed partial record Query(string UserId);

        public record Dashboard(
            int TotalSubscriptionCount,
            int TodaySubscriptionCount,
            IReadOnlyList<Newsletter> Newsletters
        );

        public record Newsletter(
            Guid Id,
            string Name, 
            int SubscriptionCount
        );

        public static async Task<Dashboard> QueryHandler(
            Query query,
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager
        )
        {
            var user = await userManager.FindByIdAsync(query.UserId);
            if (user is null)
            {
                return null; 
            }

            var totalSubscriptionCount = await context.NewsletterSubscriptions
                .Where(q => q.Newsletter.UserId == user.Id)
                .CountAsync();

            var todaySubscriptionCount = await context.NewsletterSubscriptions
                .Where(
                    q => q.Newsletter.UserId == user.Id && 
                    q.SubscribedAt == DateTime.Today
                )
                .CountAsync();

            var newsletters = await context.Newsletters
                .Where(q => q.UserId == user.Id)
                .OrderByDescending(q => q.NewsletterSubscriptions.Count())
                .Select(q => new Newsletter(
                    q.Id,
                    q.Name,
                    q.NewsletterSubscriptions.Count()
                 ))
                .ToListAsync();


            return new(
                totalSubscriptionCount,
                todaySubscriptionCount,
                newsletters
            );
        }
    }
}
