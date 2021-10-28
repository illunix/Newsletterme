using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newsletterme.Features.Account.Models;
using GenerateMediator;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Newsletterme.Features.Account
{
    [GenerateMediator]
    public static partial class SignIn
    {
        public sealed partial record Command(
            string EmailOrUsername,
            string Password,
            bool RememberMe
        )
        {
            public static void AddValidation(AbstractValidator<Command> v)
            {
                v.RuleFor(x => x.EmailOrUsername)
                    .NotEmpty().WithMessage("Please enter email or username.");

                v.RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Please enter password.");
            }
        }

        public sealed record CommandResult(
            string AccessToken,
            long ExpiresAt,
            bool ValidCredentials = true
        );

        public static async Task<CommandResult> CommandHandler(
            Command command,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration
        )
        {
            var user = await userManager.FindByEmailAsync(command.EmailOrUsername);
            if (user is null)
            {
                user = await userManager.FindByNameAsync(command.EmailOrUsername);
            }

            var validCredentials = await userManager.CheckPasswordAsync(
                user,
                command.Password
            );
            if (!validCredentials)
            {
                return new(string.Empty, 0, false);
            }

            var claims = new List<Claim>
            {
                new Claim(
                    JwtRegisteredClaimNames.Sub,
                    user.Id
                ),
                new Claim(
                    JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString()
                )
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("jwt:secret")));
            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var expires = DateTime.UtcNow.AddDays(command.RememberMe ? 7 : 1);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: "",
                audience: "",
                expires: expires,
                claims: claims,
                signingCredentials: creds
            );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

            return new(
                accessToken,
                new DateTimeOffset(expires).ToUnixTimeSeconds()
            );
        }
    }
}
