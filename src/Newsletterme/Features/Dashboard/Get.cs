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
            int TodaySubscriptionCount
        );

        public record Newsletter(
            Guid Id,
            string Name, 
            int SubscriptionCount
        );

        public static async Task<Dashboard> QueryHandler(
            Query query,
            ApplicationDbContext context
        )
        {
            /*
            var totalSubscriptionCount = await context.NewsletterSubscriptions
                .Where(q => q.Newsletter.UserId == query.UserId)
                .CountAsync();

            var todaySubscriptionCount = await context.NewsletterSubscriptions
                .Where(
                    q => q.Newsletter.UserId == query.UserId && 
                    q.SubscribedAt == DateTime.Today
                )
                .CountAsync();
            */

            return new(
                0,
                0
            );
        }
    }
}
