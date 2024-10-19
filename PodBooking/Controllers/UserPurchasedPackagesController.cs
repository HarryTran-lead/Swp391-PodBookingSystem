using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodBooking.Models;
using Microsoft.AspNetCore.JsonPatch;

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

        // GET: api/UserPurchasedPackages/byAccountAndStatus
        [HttpGet("byAccountAndStatus")]
        public async Task<ActionResult<IEnumerable<UserPurchasedPackage>>> GetUserPurchasedPackagesByAccountIdAndStatus([FromQuery] int accountId, [FromQuery] bool status)
        {
            var userPurchasedPackages = await _context.UserPurchasedPackages
                .Where(up => up.AccountId == accountId && up.Status == status) // Ensure AccountId and Status are properties of UserPurchasedPackage
                .ToListAsync();

            if (userPurchasedPackages == null || !userPurchasedPackages.Any())
            {
                return NotFound();
            }

            return Ok(userPurchasedPackages);
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
[HttpPost]
public async Task<ActionResult<UserPurchasedPackage>> PostUserPurchasedPackage(UserPurchasedPackage userPurchasedPackage)
{
    try
    {
        // Check if PurchaseDate is not null, then add 7 hours
        if (userPurchasedPackage.PurchaseDate.HasValue)
        {
            userPurchasedPackage.PurchaseDate = userPurchasedPackage.PurchaseDate.Value.AddHours(7);
        }

        // Check if ExpiryDate is not null, then add 7 hours
        if (userPurchasedPackage.ExpiryDate.HasValue)
        {
            userPurchasedPackage.ExpiryDate = userPurchasedPackage.ExpiryDate.Value.AddHours(7);
        }

        // Log the incoming data for debugging
        Console.WriteLine("Incoming UserPurchasedPackage:", userPurchasedPackage);

        _context.UserPurchasedPackages.Add(userPurchasedPackage);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUserPurchasedPackage", new { id = userPurchasedPackage.UserPackageId }, userPurchasedPackage);
    }
    catch (DbUpdateException dbEx)
    {
        // Log the error details
        Console.WriteLine("Database update error: " + dbEx.Message);
        return StatusCode(500, "Internal server error. Please check the database.");
    }
    catch (Exception ex)
    {
        // Log the error details
        Console.WriteLine("Error: " + ex.Message);
        return StatusCode(500, "Internal server error.");
    }
}


        // GET: api/UserPurchasedPackages/byPackage/{packageId}
        [HttpGet("byPackage/{packageId}")]
        public async Task<ActionResult<UserPurchasedPackage>> GetUserPurchasedPackageByPackageId(int packageId)
        {
            var userPurchasedPackage = await _context.UserPurchasedPackages
                .FirstOrDefaultAsync(up => up.PackageId == packageId); // Ensure PackageID is a property of UserPurchasedPackage

            if (userPurchasedPackage == null)
            {
                return NotFound();
            }

            return userPurchasedPackage;
        }

        // Continue with existing methods...
        // PATCH: api/UserPurchasedPackages/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUserPurchasedPackage(int id, [FromBody] JsonPatchDocument<UserPurchasedPackage> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var userPurchasedPackage = await _context.UserPurchasedPackages.FindAsync(id);
            if (userPurchasedPackage == null)
            {
                return NotFound();
            }

            patchDoc.ApplyTo(userPurchasedPackage); // Remove the ModelState argument

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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
