using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PodBooking.DTO;
using PodBooking.Services;

namespace PodBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenController : ControllerBase
    {
        private readonly AuthenService _authSv;
        public AuthenController(AuthenService authenService)
        {
            _authSv = authenService;
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] AccountDTO data)
        {
            var response = await _authSv.Login(data);

            return Ok(response);
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] AccountDTO data)
        {
            var response = await _authSv.SignUp(data);

            return Ok(response);
        }
    }
}
