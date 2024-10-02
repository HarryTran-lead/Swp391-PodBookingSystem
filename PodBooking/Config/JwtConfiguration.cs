using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PodBooking.DTO;
using PodBooking.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PodBooking.Config
{
    public class JwtConfiguration
    {

        private readonly AppSettings _appSettings;

        public JwtConfiguration(IOptionsMonitor<AppSettings>
            optionsMonitor)
        {
            _appSettings = optionsMonitor.CurrentValue;
        }

        public (string accessToken, string refreshToken) GenerateToken(AccountDTOClient user)
        {
            /*try
            {*/
                var jwtTokenHandler = new JwtSecurityTokenHandler();

                var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

                var tokenDescriptiion = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserName", user.Name),
                    new Claim("Id", user.Id.ToString()),

                    //roles

                    /*new Claim("TokenId", Guid.NewGuid().ToString())*/
                }),
                    Expires = DateTime.UtcNow.AddMinutes(15),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature)
                };

                var token = jwtTokenHandler.CreateToken(tokenDescriptiion);
                var accessToken = jwtTokenHandler.WriteToken(token);
                //var refreshToken = GenerateRefreshToken();

                //luu vao database
                /*var refreshTokenEntity = new RefreshToken
                {
                    Id = Guid.NewGuid(),
                    JwtId = token.Id,
                    Token = refreshToken,
                    IsUsed = false,
                    IsRevoked = false,
                    IssuedAt = DateTime.UtcNow,
                    ExpiredAt = DateTime.UtcNow.AddMinutes(1),
                    UserId = user.Id,
                };

                _context.refreshTokens.Add(refreshTokenEntity);
                _context.SaveChanges();*/

                return (accessToken, null);
            /*}
            catch (Exception ex)
            {
                return (null, null);
            }*/


        }
    }
}
