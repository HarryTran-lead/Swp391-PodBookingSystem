using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using PodBooking.Models;

namespace PodBooking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public DashboardController(PodBookingContext context)
        {
            _context = context;
        }

        // Method to get summary data
        [HttpGet("summary")]
        public IActionResult GetSummary()
        {
            try
            {
                var totalBookings = _context.Bookings.Count();
                var totalRevenue = _context.Bookings.Sum(b => b.Total ?? 0); // Handle nullable Total

                // Handling nullable Status
                var activeUsers = _context.Accounts.Count(a => a.Status.HasValue && a.Status.Value);

                return Ok(new
                {
                    TotalBookings = totalBookings,
                    TotalRevenue = totalRevenue,
                    ActiveUsers = activeUsers
                });
            }
            catch (Exception ex)
            {
                // Log exception here if needed
                return StatusCode(500, "Internal server error");
            }
        }

        // Method to get revenue by date
        [HttpGet("revenue-by-date")]
        public IActionResult GetRevenueByDate()
        {
            try
            {
                var revenueData = _context.Bookings
     .Where(b => b.CreatedAt.HasValue)
     .GroupBy(b => b.CreatedAt.Value.Date)
     .Select(g => new
     {
         Date = g.Key,
         TotalRevenue = g.Sum(b => b.Total ?? 0)
     })
     .AsEnumerable()
     .Select(x => new
     {
         Date = x.Date.ToString("yyyy-MM-dd"),
         x.TotalRevenue
     })
     .OrderBy(x => x.Date)
     .ToList();

                return Ok(revenueData);
            }
            catch (Exception ex)
            {
                // Log exception here if needed, oke r nha, oke anh
                return StatusCode(500, "Internal server error" + ex.Message);
            }
        }

        // Method to get bookings by date with revenue and total count
        [HttpGet("bookings-by-date")]
        public IActionResult GetBookingsByDate()
        {
            try
            {
                var bookingsByDate = _context.Bookings
                    .Where(b => b.CreatedAt.HasValue) // Filter out null CreatedAt
                    .GroupBy(b => b.CreatedAt.Value.Date) // Use .Value to access Date
                    .Select(group => new
                    {
                        Date = group.Key.ToString("yyyy-MM-dd"), // Format date for frontend
                        TotalRevenue = group.Sum(b => b.Total ?? 0),
                        TotalBookings = group.Count() // Count total bookings for each date
                    })
                    .OrderBy(x => x.Date) // Order by date
                    .ToList();

                return Ok(bookingsByDate);
            }
            catch (Exception ex)
            {
                // Log exception here if needed
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
