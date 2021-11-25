using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Newsletterme.Features.Account
{
    [Route("api/[controller]/[action]")]
    public partial class AccountController : Controller
    {
        private readonly IMediator _mediator;

        [HttpGet]
        [ActionName("")]
        public async Task<IActionResult> Get([FromQuery] Get.Query query)
            => Ok(await _mediator.Send(query));

        [HttpPut]
        [Authorize]
        [ActionName("")]
        public async Task<IActionResult> Put([FromBody] Put.Command command)
        {
            var commandResult = await _mediator.Send(command);
            if (commandResult.alreadyExist)
            {
                ModelState.AddModelError(
                    "name",
                    "User with this name already exist."
                );

                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpPost]
        [ActionName("sign-in")]
        public async Task<IActionResult> SignIn([FromBody] SignIn.Command command)
        {
            var commandResult = await _mediator.Send(command);
            if (!commandResult.ValidCredentials)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                accessToken = commandResult.AccessToken,
                expiresAt = commandResult.ExpiresAt
            });
        }

        [HttpPost]
        [ActionName("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] SignUp.Command command)
        {
            var commandResult = await _mediator.Send(command);
            if (commandResult.IdentityResult.Errors.Any())
            {
                foreach (var error in commandResult.IdentityResult.Errors)
                {
                    ModelState.AddModelError(
                        string.Empty,
                        error.Description
                    );
                }

                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpPost]
        [Authorize]
        [ActionName("change-plan")]
        public async Task<IActionResult> ChangePlan([FromBody] ChangePlan.Command command)
            => Ok(await _mediator.Send(command));
    }
}
