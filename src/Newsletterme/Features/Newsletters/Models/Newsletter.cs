using Newsletterme.Infrastructure.Models;
using System;
using System.Collections.Generic;

namespace Newsletterme.Features.Newsletters.Models
{
    public record Newsletter(
        string UserId,
        string Name,
        string Description
    ) : BaseEntity
    {
        public IReadOnlyList<NewsletterSubscription> NewsletterSubscriptions { get; init; }
    }
}
