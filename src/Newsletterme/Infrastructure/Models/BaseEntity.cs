using System;

namespace Newsletterme.Infrastructure.Models
{
    public record BaseEntity
    {
        public Guid Id { get; init; }
    }
}
