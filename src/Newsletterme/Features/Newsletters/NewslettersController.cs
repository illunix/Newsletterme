using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [Route("[controller]/[action]")]
    public partial class NewslettersController : Controller
    {
        private readonly IMediator _mediator;

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] Add.Command command)
            => Ok(await _mediator.Send(command));

        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody] Subscribe.Command command)
        {
            var commandResult = await _mediator.Send(command);
            if (commandResult.AlreadySubscribeNewsletter)
            {
                return BadRequest("This email already subscribe this newsletter.");
            }

            return Ok();
        }
    }
}
