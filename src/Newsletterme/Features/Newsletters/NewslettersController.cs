using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Newsletterme.Features.Newsletters
{
    [Route("api/[controller]")]
    [Authorize]
    public partial class NewslettersController : Controller
    {
        private readonly IMediator _mediator;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Get.Query query)
            => Ok(await _mediator.Send(query));

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Post.Command command)
            => Ok(await _mediator.Send(command));

        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody] Subscribe.Command command)
            => Ok(await _mediator.Send(command));
    }
}
