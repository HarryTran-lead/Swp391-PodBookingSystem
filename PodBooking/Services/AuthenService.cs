using AutoMapper;
using PodBooking.AutoMapper;
using PodBooking.Config;
using PodBooking.DTO;
using PodBooking.Models;
using PodBooking.Repositories;

namespace PodBooking.Services
{
    public class AuthenService
    {
        private readonly AccountRepository _accRepo;
        private readonly IMapper _mapper;
        private readonly JwtConfiguration _jwtConfig;
        public AuthenService(AccountRepository accountRepository, IMapper mapper, JwtConfiguration jwtConfiguration)
        {
            _accRepo = accountRepository;
            _mapper = mapper;
            _jwtConfig = jwtConfiguration;
        }

        public async Task<BaseResponse<AccountDTO>> SignUp(AccountDTO accEntity)
        {
            var response = new BaseResponse<AccountDTO>();

            var account = await _accRepo.getAccountByUsername(accEntity.Username);
            if(account != null)
            {
                var error = new Error
                {
                    errorCode = 500,
                    message = Enums.Errors.UsernameExisted
                };

                response.Error = error;

                return response;
            }

            account = _mapper.Map<Account>(accEntity);
            account.Role = Enums.Roles.Customer;
            account.Status = Enums.Account.Active;
            await _accRepo.AddAsync(account);

            response.Message = Enums.Successes.SignUpsuccessfull;
            return response;
        }

        public async Task<BaseResponse<AccountDTOClient>> Login(AccountDTO accEntity)
        {
            var response = new BaseResponse<AccountDTOClient>();
            var account = await _accRepo.getAccountByUsernamAndPassword(accEntity.Username, accEntity.Password);
            if (account == null)
            {
                var error = new Error
                {
                    errorCode = 500,
                    message = Enums.Errors.WrongUserNameOrPass
                };

                response.Error = error;

                return response;
            }

            response.Item = _mapper.Map<AccountDTOClient>(account);

            response.Message = Enums.Successes.SignInsuccessfull;
            var Tokens = _jwtConfig.GenerateToken(response.Item);
            response.AccessToken = Tokens.accessToken;
            return response;
        }

    }
}
