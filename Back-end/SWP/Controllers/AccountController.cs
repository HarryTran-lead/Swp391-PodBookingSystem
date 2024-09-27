using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWP.Dto.Account;
using SWP.Interfaces;

namespace SWP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepo;

        public AccountController(IAccountRepository accountRepo)
        {
            _accountRepo = accountRepo;
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpAccountDto account)
        {
            var result = await _accountRepo.SignUpAsync(account);
            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return StatusCode(500);
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInAccountDto account)
        {
            var result = await _accountRepo.SignInAsync(account);
            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }
            return Ok(result);
        }
    }
}
