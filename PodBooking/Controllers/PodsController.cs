using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodBooking.Models;
using PodBooking.DTOs;

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
        public async Task<ActionResult<IEnumerable<PodDTO>>> GetPods()
        {
            var pods = await _context.Pods.ToListAsync();

            // Map pods to DTOs including image URL
            var podDtos = pods.Select(pod => new PodDTO
            {
                PodId = pod.PodId,
                Name = pod.Name,
                LocationId = pod.LocationId,
                PodModelId = pod.PodModelId,
                ImgPod = Url.Action(nameof(GetPodImage), new { id = pod.PodId }), // Generate URL for the image
                PricePerHour = pod.PricePerHour,
                Description = pod.Description
            });

            return Ok(podDtos);
        }

        // GET: api/Pods/{id}/image
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetPodImage(int id)
        {
            var pod = await _context.Pods.FindAsync(id);

            if (pod == null || pod.ImgPod == null)
            {
                return NotFound();
            }

            // Return the image data as a file
            return File(pod.ImgPod, "image/jpeg"); // Use "image/jpeg" for JPG images
        }

        // GET: api/Pods/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Pod>> GetPod(int id)
        {
            var pod = await _context.Pods.FindAsync(id);

            if (pod == null)
            {
                return NotFound();
            }

            return pod; // Optionally, return a DTO instead of the model
        }

        // PUT: api/Pods/{id}
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

        // DELETE: api/Pods/{id}
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
