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
    public class FoodOrderDetailsController : ControllerBase
    {
        private readonly PodBookingContext _context;

        public FoodOrderDetailsController(PodBookingContext context)
        {
            _context = context;
        }

        // GET: api/FoodOrderDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodOrderDetail>>> GetFoodOrderDetails()
        {
            return await _context.FoodOrderDetails.ToListAsync();
        }

        // GET: api/FoodOrderDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodOrderDetail>> GetFoodOrderDetail(int id)
        {
            var foodOrderDetail = await _context.FoodOrderDetails.FindAsync(id);

            if (foodOrderDetail == null)
            {
                return NotFound();
            }

            return foodOrderDetail;
        }

        // New GET method to get food order details by booking ID
        [HttpGet("booking/{bookingId}")]
        public async Task<ActionResult<IEnumerable<FoodOrderDetail>>> GetFoodOrderDetailsByBookingId(int bookingId)
        {
            var foodOrderDetails = await _context.FoodOrderDetails
                .Where(f => f.BookingId == bookingId)
                .ToListAsync();

            if (!foodOrderDetails.Any())
            {
                return NotFound($"No food order details found for Booking ID {bookingId}.");
            }

            return Ok(foodOrderDetails);
        }

        // PUT: api/FoodOrderDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodOrderDetail(int id, FoodOrderDetail foodOrderDetail)
        {
            if (id != foodOrderDetail.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(foodOrderDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FoodOrderDetailExists(id))
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

        [HttpPost]
        public async Task<IActionResult> PostFoodOrderDetails(List<FoodOrderDetailDTO> foodOrderDetailsDto)
        {
            if (foodOrderDetailsDto == null || !foodOrderDetailsDto.Any())
            {
                return BadRequest("No food order details provided.");
            }

            var foodOrderDetails = new List<FoodOrderDetail>();

            foreach (var detail in foodOrderDetailsDto)
            {
                // Validate Booking ID
                var bookingExists = await _context.Bookings.AnyAsync(b => b.BookingId == detail.BookingId);
                if (!bookingExists)
                {
                    return BadRequest($"Invalid Booking ID {detail.BookingId}.");
                }

                // Create a new FoodOrderDetail for each FoodId
                foreach (var foodId in detail.FoodIds)
                {
                    // Validate Food ID
                    var foodItemExists = await _context.FoodItems.AnyAsync(f => f.FoodId == foodId);
                    if (!foodItemExists)
                    {
                        return BadRequest($"Invalid Food ID {foodId}.");
                    }

                    var foodOrderEntry = new FoodOrderDetail
                    {
                        BookingId = detail.BookingId,
                        FoodId = foodId,
                        Quantity = detail.Quantity,
                        Price = detail.Price
                    };

                    foodOrderDetails.Add(foodOrderEntry);
                }
            }

            // Add all details to the context
            _context.FoodOrderDetails.AddRange(foodOrderDetails);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, "An error occurred while saving the food order details.");
            }

            return Ok("Food order details saved successfully.");
        }

        // DELETE: api/FoodOrderDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodOrderDetail(int id)
        {
            var foodOrderDetail = await _context.FoodOrderDetails.FindAsync(id);
            if (foodOrderDetail == null)
            {
                return NotFound();
            }

            _context.FoodOrderDetails.Remove(foodOrderDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FoodOrderDetailExists(int id)
        {
            return _context.FoodOrderDetails.Any(e => e.BookingId == id);
        }
    }
}
