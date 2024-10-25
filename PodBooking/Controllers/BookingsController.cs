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
    public class BookingsController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public BookingsController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            await UpdateBookingStatuses(); // Update statuses before returning bookings
            return await _context.Bookings.ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            await UpdateBookingStatuses(); // Update statuses before retrieving a specific booking
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // GET: api/Bookings/AvailableTimeSlots/{podId}?date={bookingDate}
        [HttpGet("AvailableTimeSlots/{podId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAvailableTimeSlots(int podId, [FromQuery] DateTime bookingDate)
        {
            var startOfDay = bookingDate.Date; // 00:00:00
            var endOfDay = bookingDate.Date.AddDays(1); // 24:00:00

            var bookings = await _context.Bookings
                .Where(b => b.PodId == podId
                            && b.StartTime >= startOfDay
                            && b.EndTime <= endOfDay
                            && (b.StatusId == 2 || b.StatusId == 4)) // Check statusId
                .ToListAsync();

            return Ok(bookings);
        }

        // PUT: api/Bookings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            // Adjusting time zone for StartTime and EndTime
            if (booking.StartTime.HasValue)
            {
                booking.StartTime = booking.StartTime.Value.AddHours(+7);
            }
            if (booking.EndTime.HasValue)
            {
                booking.EndTime = booking.EndTime.Value.AddHours(+7);
            }

            // Check for overlapping bookings
            var overlaps = _context.Bookings
                .Any(b => b.PodId == booking.PodId &&
                          b.StartTime < booking.EndTime &&
                          b.EndTime > booking.StartTime &&
                          (b.StatusId == 2 || b.StatusId == 4));

            if (overlaps)
            {
                return BadRequest("The selected time slot is already booked.");
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.BookingId == id);
        }

        // This method checks for bookings that need their status updated to 5 (Finish)
        private async Task UpdateBookingStatuses()
        {
            var currentTime = DateTime.UtcNow; // Use UTC for consistency
            var bookingsToUpdate = await _context.Bookings
                  .Where(b => b.EndTime < currentTime && b.StatusId != 5 && b.StatusId != 3) // Check for past bookings
                .ToListAsync();

            foreach (var booking in bookingsToUpdate)
            {
                booking.StatusId = 5; // Set status to 'Finish'
            }

            await _context.SaveChangesAsync(); // Save changes to the database
        }
    }
}
