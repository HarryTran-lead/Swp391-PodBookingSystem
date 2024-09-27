using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using SWP.Dto.Account;
using SWP.Interfaces;
using SWP.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SWP.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountRepository(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
        }
        public async Task<string> SignInAsync(SignInAccountDto accountDto)
        {
            var result = await _signInManager.PasswordSignInAsync
                (accountDto.Email, accountDto.Password, false, false);
            if (!result.Succeeded) { 
                return string.Empty;
            }
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, accountDto.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid()
                .ToString())
            };
            var authenKey =new SymmetricSecurityKey( Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(20),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey,
                    SecurityAlgorithms.HmacSha256Signature)
                ); 
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpAccountDto accountDto)
        {
            var user = new AppUser
            {
                FirstName = accountDto.FirstName,
                LastName = accountDto.LastName,
                Email = accountDto.Email,
                UserName = accountDto.Email
            };
            var result = await _userManager.CreateAsync(user,accountDto.Password);
            
            return result;
        }
    }
}
