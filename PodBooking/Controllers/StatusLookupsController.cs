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
    public class StatusLookupsController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public StatusLookupsController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/StatusLookups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusLookup>>> GetStatusLookups()
        {
            return await _context.StatusLookups.ToListAsync();
        }

        // GET: api/StatusLookups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusLookup>> GetStatusLookup(int id)
        {
            var statusLookup = await _context.StatusLookups.FindAsync(id);

            if (statusLookup == null)
            {
                return NotFound();
            }

            return statusLookup;
        }

        // PUT: api/StatusLookups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusLookup(int id, StatusLookup statusLookup)
        {
            if (id != statusLookup.StatusId)
            {
                return BadRequest();
            }

            _context.Entry(statusLookup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusLookupExists(id))
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

        // POST: api/StatusLookups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StatusLookup>> PostStatusLookup(StatusLookup statusLookup)
        {
            _context.StatusLookups.Add(statusLookup);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StatusLookupExists(statusLookup.StatusId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStatusLookup", new { id = statusLookup.StatusId }, statusLookup);
        }

        // DELETE: api/StatusLookups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusLookup(int id)
        {
            var statusLookup = await _context.StatusLookups.FindAsync(id);
            if (statusLookup == null)
            {
                return NotFound();
            }

            _context.StatusLookups.Remove(statusLookup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusLookupExists(int id)
        {
            return _context.StatusLookups.Any(e => e.StatusId == id);
        }
    }
}
