using Newsletterme.Infrastructure.Models;
using System;

namespace Newsletterme.Features.Newsletters.Models
{
    public record NewsletterSubscription(
        Guid NewsletterId,
        string Name,
        string Email,
        string Country,
        DateTime SubscribedAt
    ) : BaseEntity
    {
        public Newsletter Newsletter { get; init; }
    }
}
