using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [Route("[controller]/[action]")]
    public partial class NewslettersController : Controller
    {
        private readonly IMediator _mediator;

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Add.Command command)
            => Ok(await _mediator.Send(command));

        [HttpPost]
        public async Task<IActionResult> Join([FromBody] Join.Command command)
            => Ok(await _mediator.Send(command));
    }
}
