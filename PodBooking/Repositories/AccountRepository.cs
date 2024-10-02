using Microsoft.EntityFrameworkCore;
using PodBooking.Models;

namespace PodBooking.Repositories
{
    public class AccountRepository : BaseRepository<Account>
    {
        public AccountRepository(PodBookingContext context) : base(context)
        {
        }

        public async Task<Account> getAccountByUsername(string? username)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(account => account.Username == username);
            return account;
        }

        public async Task<Account> getAccountByUsernamAndPassword(string? username, string? password)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(account => account.Username == username && account.Password == password);
            return account;
        }
    }
}
