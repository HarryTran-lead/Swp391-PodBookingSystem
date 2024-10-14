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
    public class ServicePackagesController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public ServicePackagesController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/ServicePackages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServicePackage>>> GetServicePackages()
        {
            return await _context.ServicePackages.ToListAsync();
        }

        // GET: api/ServicePackages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServicePackage>> GetServicePackage(int id)
        {
            var servicePackage = await _context.ServicePackages.FindAsync(id);

            if (servicePackage == null)
            {
                return NotFound();
            }

            return servicePackage;
        }

        // PUT: api/ServicePackages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServicePackage(int id, ServicePackage servicePackage)
        {
            if (id != servicePackage.Id)
            {
                return BadRequest();
            }

            _context.Entry(servicePackage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServicePackageExists(id))
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

        // POST: api/ServicePackages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ServicePackage>> PostServicePackage(ServicePackage servicePackage)
        {
            _context.ServicePackages.Add(servicePackage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServicePackage", new { id = servicePackage.Id }, servicePackage);
        }

        // DELETE: api/ServicePackages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicePackage(int id)
        {
            var servicePackage = await _context.ServicePackages.FindAsync(id);
            if (servicePackage == null)
            {
                return NotFound();
            }

            _context.ServicePackages.Remove(servicePackage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServicePackageExists(int id)
        {
            return _context.ServicePackages.Any(e => e.Id == id);
        }
    }
}
