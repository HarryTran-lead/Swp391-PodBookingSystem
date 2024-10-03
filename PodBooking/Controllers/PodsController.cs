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
    public class PodsController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public PodsController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/Pods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pod>>> GetPods()
        {
            return await _context.Pods.ToListAsync();
        }

        // GET: api/Pods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pod>> GetPod(int id)
        {
            var pod = await _context.Pods.FindAsync(id);

            if (pod == null)
            {
                return NotFound();
            }

            return pod;
        }

        // PUT: api/Pods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPod(int id, Pod pod)
        {
            if (id != pod.PodId)
            {
                return BadRequest();
            }

            _context.Entry(pod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PodExists(id))
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

        // POST: api/Pods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pod>> PostPod(Pod pod)
        {
            _context.Pods.Add(pod);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PodExists(pod.PodId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPod", new { id = pod.PodId }, pod);
        }

        // DELETE: api/Pods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePod(int id)
        {
            var pod = await _context.Pods.FindAsync(id);
            if (pod == null)
            {
                return NotFound();
            }

            _context.Pods.Remove(pod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PodExists(int id)
        {
            return _context.Pods.Any(e => e.PodId == id);
        }
    }
}
