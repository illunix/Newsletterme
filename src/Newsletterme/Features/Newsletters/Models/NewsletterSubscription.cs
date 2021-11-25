using Newsletterme.Infrastructure.Models;
using System;

namespace Newsletterme.Features.Newsletters.Models
{
    public record NewsletterSubscription(
        string NewsletterCreatorId,
        string Name,
        string Email,
        DateTime SubscribedAt
    ) : BaseEntity;
}
