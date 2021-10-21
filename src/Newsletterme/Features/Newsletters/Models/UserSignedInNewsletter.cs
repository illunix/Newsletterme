using Newsletterme.Infrastructure.Models;
using System;

namespace Newsletterme.Features.Newsletters.Models
{
    public record UserSignedInNewsletter(
        Guid UserId,
        Guid NewsletterId,
        string Email,
        string Name
    ) : BaseEntity;
}
