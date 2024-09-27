using Microsoft.AspNetCore.Identity;
using SWP.Dto.Account;

namespace SWP.Interfaces
{
    public interface IAccountRepository
    {
        Task<IdentityResult> SignUpAsync(SignUpAccountDto accountDto);
        Task<string> SignInAsync(SignInAccountDto accountDto);
    }
}
