using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodBooking.Models;

namespace PodBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPurchasedPackagesController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public UserPurchasedPackagesController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/UserPurchasedPackages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPurchasedPackage>>> GetUserPurchasedPackages()
        {
            return await _context.UserPurchasedPackages.ToListAsync();
        }

        // GET: api/UserPurchasedPackages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserPurchasedPackage>> GetUserPurchasedPackage(int id)
        {
            var userPurchasedPackage = await _context.UserPurchasedPackages.FindAsync(id);

            if (userPurchasedPackage == null)
            {
                return NotFound();
            }

            return userPurchasedPackage;
        }

        // PUT: api/UserPurchasedPackages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserPurchasedPackage(int id, UserPurchasedPackage userPurchasedPackage)
        {
            if (id != userPurchasedPackage.UserPackageId)
            {
                return BadRequest();
            }

            _context.Entry(userPurchasedPackage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPurchasedPackageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserPurchasedPackages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserPurchasedPackage>> PostUserPurchasedPackage(UserPurchasedPackage userPurchasedPackage)
        {
            _context.UserPurchasedPackages.Add(userPurchasedPackage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserPurchasedPackage", new { id = userPurchasedPackage.UserPackageId }, userPurchasedPackage);
        }

        // DELETE: api/UserPurchasedPackages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserPurchasedPackage(int id)
        {
            var userPurchasedPackage = await _context.UserPurchasedPackages.FindAsync(id);
            if (userPurchasedPackage == null)
            {
                return NotFound();
            }

            _context.UserPurchasedPackages.Remove(userPurchasedPackage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserPurchasedPackageExists(int id)
        {
            return _context.UserPurchasedPackages.Any(e => e.UserPackageId == id);
        }
    }
}
