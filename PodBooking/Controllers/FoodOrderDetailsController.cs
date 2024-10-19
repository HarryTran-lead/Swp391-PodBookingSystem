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

        // POST: api/FoodOrderDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FoodOrderDetail>> PostFoodOrderDetail(FoodOrderDetail foodOrderDetail)
        {
            _context.FoodOrderDetails.Add(foodOrderDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FoodOrderDetailExists(foodOrderDetail.BookingId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFoodOrderDetail", new { id = foodOrderDetail.BookingId }, foodOrderDetail);
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
