using Newsletterme.Infrastructure.Models;
using System;

namespace Newsletterme.Features.Newsletters.Models
{
    public record Newsletter(
        Guid UserId,
        string Description
    ) : BaseEntity;
}
